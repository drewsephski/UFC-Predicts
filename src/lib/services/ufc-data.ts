/**
 * UFC Data Service
 * 
 * A comprehensive service for fetching, caching, and transforming UFC data from multiple sources:
 * - SportsData.io API (primary source when configured)
 * - UFC.com web scraping (rankings, fighter profiles)
 * - RapidAPI UFC Data (fallback for live events)
 * - Local mock data (ultimate fallback)
 * 
 * Features:
 * - Automatic caching with configurable TTLs
 * - Rate limiting to prevent API abuse
 * - Retry logic for transient failures
 * - Consistent data transformation
 * - Error handling with graceful fallbacks
 */

import * as cheerio from 'cheerio';
import { 
  transformFighter, 
  transformFight, 
  transformEvent,
  transformCareerStats,
  type ApiFighter,
  type ApiFight,
  type ApiEvent
} from '@/lib/transform';
import { 
  getCached, 
  setCache, 
  invalidateNamespace, 
  CacheNamespace,
  formatCacheKey
} from '@/lib/cache';
import type { Fighter, Fight, Event } from '@/types/mma';

// =====================================================================
// Configuration
// =====================================================================

const CONFIG = {
  // API Keys and endpoints
  SPORTSDATA_API_KEY: process.env.SPORTSDATA_API_KEY || '',
  SPORTSDATA_BASE_URL: 'https://api.sportsdata.io/v3/mma/stats/json',
  RAPIDAPI_KEY: process.env.RAPIDAPI_KEY || '',
  RAPIDAPI_UFC_HOST: 'ufc-data.p.rapidapi.com',
  
  // URLs for web scraping
  UFC_RANKINGS_URL: 'https://www.ufc.com/rankings',
  UFC_EVENTS_URL: 'https://www.ufc.com/events',
  UFC_NEWS_URL: 'https://www.ufc.com/news',
  
  // Cache TTLs (in seconds)
  CACHE_TTL: {
    FIGHTER: 86400,        // 24 hours
    FIGHTERS_LIST: 3600,   // 1 hour
    EVENT: 3600,           // 1 hour
    EVENTS_LIST: 1800,     // 30 minutes
    FIGHT: 3600,           // 1 hour
    RANKINGS: 3600,        // 1 hour
    NEWS: 1800,            // 30 minutes
    LIVE_DATA: 60,         // 1 minute
  },
  
  // Rate limiting (requests per minute)
  RATE_LIMITS: {
    SPORTSDATA: 60,        // 60 requests per minute
    RAPIDAPI: 10,          // 10 requests per minute
    UFC_SCRAPING: 5,       // 5 requests per minute
  },
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,    // Start with 1 second
  
  // Feature flags
  USE_MOCK_DATA: process.env.USE_MOCK_DATA === 'true',
  ENABLE_WEB_SCRAPING: process.env.DISABLE_WEB_SCRAPING !== 'true',
  PREFER_CACHED_DATA: process.env.PREFER_CACHED_DATA === 'true',
};

// Mock data (used as fallback)
import { mockFighters, mockUpcomingFights } from '@/lib/api/ufc';

// =====================================================================
// Rate Limiting Implementation
// =====================================================================

class RateLimiter {
  private timestamps: number[] = [];
  private limit: number;
  private windowMs: number;

  constructor(requestsPerMinute: number) {
    this.limit = requestsPerMinute;
    this.windowMs = 60 * 1000; // 1 minute window
  }

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    
    // Remove timestamps outside the current window
    this.timestamps = this.timestamps.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    if (this.timestamps.length >= this.limit) {
      // We've hit the rate limit, calculate delay needed
      const oldestTimestamp = this.timestamps[0];
      const timeToWait = this.windowMs - (now - oldestTimestamp);
      
      if (timeToWait > 0) {
        console.log(`Rate limit hit, waiting ${timeToWait}ms before next request`);
        await new Promise(resolve => setTimeout(resolve, timeToWait));
      }
    }
    
    // Add current timestamp and proceed
    this.timestamps.push(Date.now());
  }
}

// Initialize rate limiters
const sportsDataLimiter = new RateLimiter(CONFIG.RATE_LIMITS.SPORTSDATA);
const rapidApiLimiter = new RateLimiter(CONFIG.RATE_LIMITS.RAPIDAPI);
const ufcScrapingLimiter = new RateLimiter(CONFIG.RATE_LIMITS.UFC_SCRAPING);

// =====================================================================
// Helper Functions
// =====================================================================

/**
 * Performs a fetch with retry logic for transient failures
 */
async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  retries = CONFIG.MAX_RETRIES
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    // Only retry on server errors (5xx) or specific recoverable errors
    if (response.status >= 500 && retries > 0) {
      const retryDelay = CONFIG.RETRY_DELAY_MS * (CONFIG.MAX_RETRIES - retries + 1);
      console.log(`Retrying ${url} in ${retryDelay}ms, ${retries} retries left`);
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    return response;
  } catch (error) {
    // Retry on network errors
    if (retries > 0) {
      const retryDelay = CONFIG.RETRY_DELAY_MS * (CONFIG.MAX_RETRIES - retries + 1);
      console.log(`Network error, retrying ${url} in ${retryDelay}ms, ${retries} retries left`);
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    throw error;
  }
}

/**
 * Handles errors and provides fallback data
 */
function handleError<T>(
  error: unknown, 
  source: string, 
  fallbackData: T | null = null
): T | null {
  console.error(`Error in UFC data service (${source}):`, error);
  return fallbackData;
}

// =====================================================================
// SportsData.io API Integration
// =====================================================================

/**
 * Fetches data from SportsData.io API
 */
async function fetchFromSportsData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!CONFIG.SPORTSDATA_API_KEY) {
    console.warn('SportsData API key not configured');
    return null;
  }
  
  try {
    await sportsDataLimiter.waitIfNeeded();
    
    const queryParams = new URLSearchParams({
      ...params,
      key: CONFIG.SPORTSDATA_API_KEY,
    });
    
    const url = `${CONFIG.SPORTSDATA_BASE_URL}/${endpoint}?${queryParams}`;
    const response = await fetchWithRetry(url);
    
    if (!response.ok) {
      throw new Error(`SportsData API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    return handleError<T>(error, 'SportsData.io', null);
  }
}

/**
 * Fetches fighters from SportsData.io
 */
async function fetchSportsDataFighters(params: { division?: string, id?: string } = {}): Promise<ApiFighter[] | null> {
  const endpoint = 'Fighters';
  return fetchFromSportsData<ApiFighter[]>(endpoint, params as Record<string, string>);
}

/**
 * Fetches events from SportsData.io
 */
async function fetchSportsDataEvents(params: { upcoming?: boolean } = {}): Promise<ApiEvent[] | null> {
  const endpoint = params.upcoming ? 'UpcomingEvents' : 'CompletedEvents';
  return fetchFromSportsData<ApiEvent[]>(endpoint);
}

// =====================================================================
// UFC.com Web Scraping
// =====================================================================

/**
 * Scrapes fighter rankings from UFC.com
 */
async function scrapeUfcRankings(): Promise<Record<string, Fighter[]>> {
  if (!CONFIG.ENABLE_WEB_SCRAPING) {
    return {};
  }
  
  try {
    await ufcScrapingLimiter.waitIfNeeded();
    
    const response = await fetchWithRetry(CONFIG.UFC_RANKINGS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch UFC rankings: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const rankings: Record<string, Fighter[]> = {};
    
    // Process each ranking category
    $('.view-grouping').each((_, element) => {
      const categoryTitle = $(element).find('.view-grouping-header h4').text().trim();
      const division = normalizeDivisionName(categoryTitle);
      
      if (!division) return;
      
      const fighters: Fighter[] = [];
      
      // Process champion
      const championElement = $(element).find('.champion-fighter');
      if (championElement.length) {
        const name = championElement.find('.views-row-champion .title-text').text().trim();
        const imageUrl = championElement.find('img').attr('src') || null;
        
        if (name) {
          fighters.push({
            id: createIdFromName(name),
            name,
            division,
            isChampion: true,
            ranking: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            imageUrl,
          });
        }
      }
      
      // Process ranked fighters
      $(element).find('.views-row').each((index, fighterElement) => {
        const rankText = $(fighterElement).find('.rank-number').text().trim();
        const ranking = parseInt(rankText, 10) || (index + 1);
        const name = $(fighterElement).find('.views-field-title').text().trim();
        const imageUrl = $(fighterElement).find('img').attr('src') || null;
        
        if (name) {
          fighters.push({
            id: createIdFromName(name),
            name,
            division,
            isChampion: false,
            ranking,
            wins: 0,
            losses: 0,
            draws: 0,
            imageUrl,
          });
        }
      });
      
      if (fighters.length > 0) {
        rankings[division] = fighters;
      }
    });
    
    return rankings;
  } catch (error) {
    return handleError<Record<string, Fighter[]>>(error, 'UFC.com rankings scraping', {});
  }
}

/**
 * Scrapes upcoming events from UFC.com
 */
async function scrapeUfcEvents(): Promise<Event[]> {
  if (!CONFIG.ENABLE_WEB_SCRAPING) {
    return [];
  }
  
  try {
    await ufcScrapingLimiter.waitIfNeeded();
    
    const response = await fetchWithRetry(CONFIG.UFC_EVENTS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch UFC events: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const events: Event[] = [];
    
    $('.event-info-card').each((_, element) => {
      const name = $(element).find('.c-event-info__headline').text().trim();
      const dateText = $(element).find('.c-event-info__date').text().trim();
      const date = parseEventDate(dateText);
      const location = $(element).find('.field--name-venue').text().trim();
      const poster = $(element).find('.c-event-info__image img').attr('src') || undefined;
      const id = $(element).find('.c-event-info__headline a').attr('href')?.split('/').pop() || 
                 createIdFromName(name);
      
      if (name && date) {
        events.push({
          id,
          name,
          date: date.toISOString(),
          location,
          venue: null,
          poster,
          mainCard: [],
          prelimCard: [],
        });
      }
    });
    
    return events;
  } catch (error) {
    return handleError<Event[]>(error, 'UFC.com events scraping', []);
  }
}

/**
 * Scrapes UFC news articles
 */
async function scrapeUfcNews(limit = 10): Promise<any[]> {
  if (!CONFIG.ENABLE_WEB_SCRAPING) {
    return [];
  }
  
  try {
    await ufcScrapingLimiter.waitIfNeeded();
    
    const response = await fetchWithRetry(CONFIG.UFC_NEWS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch UFC news: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const articles: any[] = [];
    
    $('.view-content .news-teaser').each((index, element) => {
      if (index >= limit) return;
      
      const title = $(element).find('.news-teaser__title').text().trim();
      const excerpt = $(element).find('.news-teaser__content').text().trim();
      const url = $(element).find('a').attr('href') || '';
      const imageUrl = $(element).find('img').attr('src') || null;
      const dateText = $(element).find('.news-teaser__date').text().trim();
      const date = parseNewsDate(dateText);
      
      if (title) {
        articles.push({
          id: createIdFromName(title),
          title,
          excerpt,
          url: url.startsWith('/') ? `https://www.ufc.com${url}` : url,
          imageUrl,
          publishedAt: date?.toISOString() || new Date().toISOString(),
        });
      }
    });
    
    return articles;
  } catch (error) {
    return handleError<any[]>(error, 'UFC.com news scraping', []);
  }
}

// =====================================================================
// RapidAPI UFC Data Integration
// =====================================================================

/**
 * Fetches data from RapidAPI UFC Data
 */
async function fetchFromRapidApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!CONFIG.RAPIDAPI_KEY) {
    console.warn('RapidAPI key not configured');
    return null;
  }
  
  try {
    await rapidApiLimiter.waitIfNeeded();
    
    const queryString = new URLSearchParams(params).toString();
    const url = `https://${CONFIG.RAPIDAPI_UFC_HOST}/${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetchWithRetry(url, {
      headers: {
        'X-RapidAPI-Key': CONFIG.RAPIDAPI_KEY,
        'X-RapidAPI-Host': CONFIG.RAPIDAPI_UFC_HOST,
      },
    });
    
    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    return handleError<T>(error, 'RapidAPI', null);
  }
}

/**
 * Fetches live fight data from RapidAPI
 */
async function fetchLiveFightData(fightId?: string): Promise<any | null> {
  const endpoint = 'live';
  const params: Record<string, string> = {};
  
  if (fightId) {
    params.fightId = fightId;
  }
  
  return fetchFromRapidApi<any>(endpoint, params);
}

// =====================================================================
// Utility Functions
// =====================================================================

/**
 * Creates an ID from a name (for scraped data without IDs)
 */
function createIdFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Normalizes division names for consistency
 */
function normalizeDivisionName(division: string): string {
  const normalized = division
    .replace(/^Men's\s+/i, '')
    .replace(/^Women's\s+/i, "Women's ")
    .trim();
  
  // Map common variations to standard names
  const divisionMap: Record<string, string> = {
    'Pound-for-Pound': 'Pound-for-Pound',
    'P4P': 'Pound-for-Pound',
    'Flyweight': 'Flyweight',
    'Bantamweight': 'Bantamweight',
    'Featherweight': 'Featherweight',
    'Lightweight': 'Lightweight',
    'Welterweight': 'Welterweight',
    'Middleweight': 'Middleweight',
    'Light Heavyweight': 'Light Heavyweight',
    'Heavyweight': 'Heavyweight',
    "Women's Strawweight": "Women's Strawweight",
    "Women's Flyweight": "Women's Flyweight",
    "Women's Bantamweight": "Women's Bantamweight",
    "Women's Featherweight": "Women's Featherweight",
  };
  
  return divisionMap[normalized] || normalized;
}

/**
 * Parses event date from UFC.com format
 */
function parseEventDate(dateText: string): Date | null {
  try {
    // Handle various date formats from UFC.com
    const cleaned = dateText.trim().replace(/\s+/g, ' ');
    return new Date(cleaned);
  } catch (error) {
    console.error('Error parsing event date:', error);
    return null;
  }
}

/**
 * Parses news date from UFC.com format
 */
function parseNewsDate(dateText: string): Date | null {
  try {
    // Handle various date formats from UFC.com
    const cleaned = dateText.trim().replace(/\s+/g, ' ');
    return new Date(cleaned);
  } catch (error) {
    console.error('Error parsing news date:', error);
    return null;
  }
}

// =====================================================================
// Public API
// =====================================================================

/**
 * Gets a list of all fighters
 */
export async function getAllFighters(options: { 
  division?: string, 
  forceRefresh?: boolean,
  useCache?: boolean 
} = {}): Promise<Fighter[]> {
  const { division, forceRefresh = false, useCache = true } = options;
  
  // Cache key based on filters
  const cacheParams = division ? { division } : undefined;
  const cacheKey = formatCacheKey(CacheNamespace.FIGHTERS, undefined, cacheParams);
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Fighter[]>(
      CacheNamespace.FIGHTERS,
      undefined,
      cacheParams,
      async () => {
        // Fetch data if not in cache
        return fetchFightersFromAllSources(division);
      },
      CONFIG.CACHE_TTL.FIGHTERS_LIST
    );
    
    return cached || [];
  }
  
  // Force refresh
  const fighters = await fetchFightersFromAllSources(division);
  
  // Update cache
  if (useCache) {
    await setCache(cacheKey, fighters, CONFIG.CACHE_TTL.FIGHTERS_LIST);
  }
  
  return fighters;
}

/**
 * Gets a specific fighter by ID
 */
export async function getFighterById(id: string, options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<Fighter | null> {
  const { forceRefresh = false, useCache = true } = options;
  
  if (!id) return null;
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Fighter | null>(
      CacheNamespace.FIGHTER,
      id,
      null,
      async () => {
        // Fetch data if not in cache
        return fetchFighterFromAllSources(id);
      },
      CONFIG.CACHE_TTL.FIGHTER
    );
    
    return cached;
  }
  
  // Force refresh
  const fighter = await fetchFighterFromAllSources(id);
  
  // Update cache
  if (useCache && fighter) {
    await setCache(
      formatCacheKey(CacheNamespace.FIGHTER, id),
      fighter,
      CONFIG.CACHE_TTL.FIGHTER
    );
  }
  
  return fighter;
}

/**
 * Gets upcoming events
 */
export async function getUpcomingEvents(options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<Event[]> {
  const { forceRefresh = false, useCache = true } = options;
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Event[]>(
      CacheNamespace.EVENTS,
      'upcoming',
      null,
      async () => {
        // Fetch data if not in cache
        return fetchEventsFromAllSources(true);
      },
      CONFIG.CACHE_TTL.EVENTS_LIST
    );
    
    return cached || [];
  }
  
  // Force refresh
  const events = await fetchEventsFromAllSources(true);
  
  // Update cache
  if (useCache) {
    await setCache(
      formatCacheKey(CacheNamespace.EVENTS, 'upcoming'),
      events,
      CONFIG.CACHE_TTL.EVENTS_LIST
    );
  }
  
  return events;
}

/**
 * Gets past events
 */
export async function getPastEvents(options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<Event[]> {
  const { forceRefresh = false, useCache = true } = options;
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Event[]>(
      CacheNamespace.EVENTS,
      'past',
      null,
      async () => {
        // Fetch data if not in cache
        return fetchEventsFromAllSources(false);
      },
      CONFIG.CACHE_TTL.EVENTS_LIST
    );
    
    return cached || [];
  }
  
  // Force refresh
  const events = await fetchEventsFromAllSources(false);
  
  // Update cache
  if (useCache) {
    await setCache(
      formatCacheKey(CacheNamespace.EVENTS, 'past'),
      events,
      CONFIG.CACHE_TTL.EVENTS_LIST
    );
  }
  
  return events;
}

/**
 * Gets a specific event by ID
 */
export async function getEventById(id: string, options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<Event | null> {
  const { forceRefresh = false, useCache = true } = options;
  
  if (!id) return null;
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Event | null>(
      CacheNamespace.EVENT,
      id,
      null,
      async () => {
        // Fetch data if not in cache
        return fetchEventFromAllSources(id);
      },
      CONFIG.CACHE_TTL.EVENT
    );
    
    return cached;
  }
  
  // Force refresh
  const event = await fetchEventFromAllSources(id);
  
  // Update cache
  if (useCache && event) {
    await setCache(
      formatCacheKey(CacheNamespace.EVENT, id),
      event,
      CONFIG.CACHE_TTL.EVENT
    );
  }
  
  return event;
}

/**
 * Gets fighter rankings by division
 */
export async function getRankings(options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<Record<string, Fighter[]>> {
  const { forceRefresh = false, useCache = true } = options;
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<Record<string, Fighter[]>>(
      CacheNamespace.RANKINGS,
      undefined,
      null,
      async () => {
        // Fetch data if not in cache
        return scrapeUfcRankings();
      },
      CONFIG.CACHE_TTL.RANKINGS
    );
    
    return cached || {};
  }
  
  // Force refresh
  const rankings = await scrapeUfcRankings();
  
  // Update cache
  if (useCache) {
    await setCache(
      formatCacheKey(CacheNamespace.RANKINGS),
      rankings,
      CONFIG.CACHE_TTL.RANKINGS
    );
  }
  
  return rankings;
}

/**
 * Gets UFC news articles
 */
export async function getNews(limit = 10, options: {
  forceRefresh?: boolean,
  useCache?: boolean
} = {}): Promise<any[]> {
  const { forceRefresh = false, useCache = true } = options;
  
  const cacheParams = { limit: limit.toString() };
  
  // Return cached data if available and not forcing refresh
  if (!forceRefresh && useCache) {
    const cached = await getCached<any[]>(
      CacheNamespace.NEWS,
      undefined,
      cacheParams,
      async () => {
        // Fetch data if not in cache
        return scrapeUfcNews(limit);
      },
      CONFIG.CACHE_TTL.NEWS
    );
    
    return cached || [];
  }
  
  // Force refresh
  const news = await scrapeUfcNews(limit);
  
  // Update cache
  if (useCache) {
    await setCache(
      formatCacheKey(CacheNamespace.NEWS, undefined, cacheParams),
      news,
      CONFIG.CACHE_TTL.NEWS
    );
  }
  
  return news;
}

/**
 * Gets live fight data
 */
export async function getLiveFightData(fightId?: string): Promise<any | null> {
  // Live data has a very short TTL, so we'll use a special approach
  const cacheKey = formatCacheKey(
    CacheNamespace.FIGHT, 
    fightId ? `live:${fightId}` : 'live'
  );
  
  try {
    // Try cache first for very recent data
    const cached = await getCache<any>(cacheKey);
    
    // If we have fresh data in cache, return it
    if (cached) {
      return cached;
    }
    
    // Otherwise fetch fresh data
    const liveData = await fetchLiveFightData(fightId);
    
    // Cache for a short time
    if (liveData) {
      await setCache(cacheKey, liveData, CONFIG.CACHE_TTL.LIVE_DATA);
    }
    
    return liveData;
  } catch (error) {
    return handleError<any>(error, 'Live fight data', null);
  }
}

/**
 * Refreshes all cached data
 */
export async function refreshAllData(): Promise<void> {
  try {
    // Fetch fresh data for each category
    const [fighters, upcomingEvents, pastEvents, rankings, news] = await Promise.all([
      fetchFightersFromAllSources(),
      fetchEventsFromAllSources(true),
      fetchEventsFromAllSources(false),
      scrapeUfcRankings(),
      scrapeUfcNews(),
    ]);
    
    // Update caches
    await Promise.all([
      setCache(formatCacheKey(CacheNamespace.FIGHTERS), fighters, CONFIG.CACHE_TTL.FIGHTERS_LIST),
      setCache(formatCacheKey(CacheNamespace.EVENTS, 'upcoming'), upcomingEvents, CONFIG.CACHE_TTL.EVENTS_LIST),
      setCache(formatCacheKey(CacheNamespace.EVENTS, 'past'), pastEvents, CONFIG.CACHE_TTL.EVENTS_LIST),
      setCache(formatCacheKey(CacheNamespace.RANKINGS), rankings, CONFIG.CACHE_TTL.RANKINGS),
      setCache(formatCacheKey(CacheNamespace.NEWS), news, CONFIG.CACHE_TTL.NEWS),
    ]);
    
    console.log('All UFC data refreshed successfully');
  } catch (error) {
    console.error('Error refreshing UFC data:', error);
  }
}

// =====================================================================
// Internal Implementation Details
// =====================================================================

/**
 * Fetches fighters from all available sources
 */
async function fetchFightersFromAllSources(division?: string): Promise<Fighter[]> {
  // Try SportsData.io first
  const params: Record<string, string> = {};
  if (division) {
    params.division = division;
  }
  
  const sportsDataFighters = await fetchSportsDataFighters(params);
  
  if (sportsDataFighters && sportsDataFighters.length > 0) {
    return sportsDataFighters
      .map(fighter => transformFighter(fighter))
      .filter((fighter): fighter is Fighter => fighter !== null);
  }
  
  // If SportsData fails or returns empty, try scraping rankings for partial data
  if (CONFIG.ENABLE_WEB_SCRAPING) {
    const rankings = await scrapeUfcRankings();
    
    if (Object.keys(rankings).length > 0) {
      let rankedFighters: Fighter[] = [];
      
      if (division) {
        // Get fighters from specific division
        rankedFighters = rankings[division] || [];
      } else {
        // Get all fighters from all divisions
        for (const divFighters of Object.values(rankings)) {
          rankedFighters = [...rankedFighters, ...divFighters];
        }
      }
      
      if (rankedFighters.length > 0) {
        return rankedFighters;
      }
    }
  }
  
  // Last resort: use mock data
  if (CONFIG.USE_MOCK_DATA) {
    let filteredMockFighters = [...mockFighters];
    
    if (division) {
      filteredMockFighters = filteredMockFighters.filter(
        fighter => fighter.division === division
      );
    }
    
    return filteredMockFighters;
  }
  
  // If all else fails, return empty array
  return [];
}

/**
 * Fetches a specific fighter from all available sources
 */
async function fetchFighterFromAllSources(id: string): Promise<Fighter | null> {
  if (!id) return null;
  
  // Try SportsData.io first
  const sportsDataFighters = await fetchSportsDataFighters({ id });
  
  if (sportsDataFighters && sportsDataFighters.length > 0) {
    return transformFighter(sportsDataFighters[0]);
  }
  
  // If SportsData fails, try to find in rankings
  if (CONFIG.ENABLE_WEB_SCRAPING) {
    const rankings = await scrapeUfcRankings();
    
    for (const divFighters of Object.values(rankings)) {
      const fighter = divFighters.find(f => f.id === id);
      if (fighter) {
        return fighter;
      }
    }
  }
  
  // Last resort: check mock data
  if (CONFIG.USE_MOCK_DATA) {
    return mockFighters.find(fighter => fighter.id === id) || null;
  }
  
  return null;
}

/**
 * Fetches events from all available sources
 */
async function fetchEventsFromAllSources(upcoming = true): Promise<Event[]> {
  // Try SportsData.io first
  const sportsDataEvents = await fetchSportsDataEvents({ upcoming });
  
  if (sportsDataEvents && sportsDataEvents.length > 0) {
    return sportsDataEvents
      .map(event => transformEvent(event))
      .filter((event): event is Event => event !== null);
  }
  
  // If SportsData fails or returns empty, try scraping UFC.com
  if (CONFIG.ENABLE_WEB_SCRAPING) {
    const scrapedEvents = await scrapeUfcEvents();
    
    if (scrapedEvents.length > 0) {
      const now = new Date();
      
      if (upcoming) {
        // Filter for upcoming events
        return scrapedEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= now;
        });
      } else {
        // Filter for past events
        return scrapedEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate < now;
        });
      }
    }
  }
  
  // Last resort: use mock data
  if (CONFIG.USE_MOCK_DATA) {
    // Mock data doesn't differentiate between upcoming/past
    // For this example, we'll just return the mock fights with event info
    const mockEvents: Event[] = [];
    
    // Group fights by event
    const eventMap = new Map<string, Fight[]>();
    
    for (const fight of mockUpcomingFights) {
      const eventName = fight.eventName;
      if (!eventMap.has(eventName)) {
        eventMap.set(eventName, []);
      }
      eventMap.get(eventName)!.push(fight);
    }
    
    // Create events from grouped fights
    for (const [eventName, fights] of eventMap.entries()) {
      const firstFight = fights[0];
      const event: Event = {
        id: createIdFromName(eventName),
        name: eventName,
        date: firstFight.date,
        location: 'Unknown Location',
        venue: null,
        mainCard: fights.filter(f => f.isTitleFight),
        prelimCard: fights.filter(f => !f.isTitleFight),
      };
      mockEvents.push(event);
    }
    
    return mockEvents;
  }
  
  // If all else fails, return empty array
  return [];
}

/**
 * Fetches a specific event from all available sources
 */
async function fetchEventFromAllSources(id: string): Promise<Event | null> {
  if (!id) return null;
  
  // Try getting from all events
  const allEvents = [
    ...(await fetchEventsFromAllSources(true)),
    ...(await fetchEventsFromAllSources(false)),
  ];
  
  return allEvents.find(event => event.id === id) || null;
}

// Export the service
export default {
  getAllFighters,
  getFighterById,
  getUpcomingEvents,
  getPastEvents,
  getEventById,
  getRankings,
  getNews,
  getLiveFightData,
  refreshAllData,
};
