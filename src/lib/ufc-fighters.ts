/**
 * UFC Fighters Utility
 * 
 * A comprehensive utility module that provides easy access to UFC fighters data
 * throughout the application. This is the main interface for components to access
 * fighter data, with support for both client-side and server-side usage.
 */

import { cache } from 'react';
import fightersDb, {
  RankedFighter,
  UFCRankings,
  getAllFighters as getDbAllFighters,
  getFightersByDivision as getDbFightersByDivision,
  getFighterById as getDbFighterById,
  getFighterByName as getDbFighterByName,
  getAllDivisions as getDbAllDivisions,
  getAllChampions as getDbAllChampions,
  searchFighters as dbSearchFighters
} from '@/data/ufc-fighters-db';

// Re-export types for use throughout the application
export type { RankedFighter, UFCRankings };

// Additional types
export interface PoundForPoundRankings {
  mens: RankedFighter[];
  womens: RankedFighter[];
  lastUpdated: string;
}

export interface FightersResponse {
  fighters: RankedFighter[];
  count: number;
  lastUpdated: string;
}

export interface DivisionResponse {
  division: string;
  fighters: RankedFighter[];
  lastUpdated: string;
}

export interface ApiInfo {
  title: string;
  description: string;
  lastUpdated: string;
}

// Cache duration in milliseconds (10 minutes)
const CACHE_DURATION = 10 * 60 * 1000;

// Client-side cache
let clientCache: {
  allFighters?: { data: RankedFighter[], timestamp: number };
  fightersByDivision: Record<string, { data: RankedFighter[], timestamp: number }>;
  fightersById: Record<string, { data: RankedFighter | null, timestamp: number }>;
  searchResults: Record<string, { data: RankedFighter[], timestamp: number }>;
  champions?: { data: RankedFighter[], timestamp: number };
  p4pRankings?: { data: PoundForPoundRankings, timestamp: number };
  divisions?: { data: string[], timestamp: number };
} = {
  fightersByDivision: {},
  fightersById: {},
  searchResults: {}
};

// Helper function to check if cache is valid
function isCacheValid<T>(cache?: { data: T, timestamp: number }): cache is { data: T, timestamp: number } {
  if (!cache) return false;
  return (Date.now() - cache.timestamp) < CACHE_DURATION;
}

// =====================================================================
// Server-Side Functions (React Server Components)
// =====================================================================

/**
 * Gets all fighters (server-side with React cache)
 */
export const getAllFighters = cache((): RankedFighter[] => {
  return getDbAllFighters();
});

/**
 * Gets fighters by division (server-side with React cache)
 */
export const getFightersByDivision = cache((division: string): RankedFighter[] => {
  return getDbFightersByDivision(division);
});

/**
 * Gets a fighter by ID (server-side with React cache)
 */
export const getFighterById = cache((id: string): RankedFighter | undefined => {
  return getDbFighterById(id);
});

/**
 * Gets a fighter by name (server-side with React cache)
 */
export const getFighterByName = cache((name: string): RankedFighter | undefined => {
  return getDbFighterByName(name);
});

/**
 * Searches fighters by name (server-side with React cache)
 */
export const searchFighters = cache((query: string): RankedFighter[] => {
  return dbSearchFighters(query);
});

/**
 * Gets all champions (server-side with React cache)
 */
export const getAllChampions = cache((): RankedFighter[] => {
  return getDbAllChampions();
});

/**
 * Gets pound-for-pound rankings (server-side with React cache)
 */
export const getPoundForPoundRankings = cache((): PoundForPoundRankings => {
  return {
    mens: fightersDb.rankings.pound4pound.mens,
    womens: fightersDb.rankings.pound4pound.womens,
    lastUpdated: fightersDb.lastUpdated
  };
});

/**
 * Gets all available divisions (server-side with React cache)
 */
export const getAvailableDivisions = cache((): string[] => {
  return getDbAllDivisions();
});

/**
 * Gets the last updated date of the rankings (server-side with React cache)
 */
export const getLastUpdated = cache((): string => {
  return fightersDb.lastUpdated;
});

// =====================================================================
// Client-Side Functions (for use in event handlers, hooks, etc.)
// =====================================================================

/**
 * Gets all fighters (client-side with cache)
 */
export async function fetchAllFighters(): Promise<RankedFighter[]> {
  // Check client cache first
  if (isCacheValid(clientCache.allFighters)) {
    return clientCache.allFighters.data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch('/api/ufc-rankings?all=true');
    if (!response.ok) throw new Error('Failed to fetch fighters');
    
    const data: FightersResponse = await response.json();
    
    // Update cache
    clientCache.allFighters = {
      data: data.fighters,
      timestamp: Date.now()
    };
    
    return data.fighters;
  } catch (error) {
    console.error('Error fetching fighters:', error);
    
    // Fallback to static data if API fails
    const fighters = getDbAllFighters();
    clientCache.allFighters = {
      data: fighters,
      timestamp: Date.now()
    };
    
    return fighters;
  }
}

/**
 * Gets fighters by division (client-side with cache)
 */
export async function fetchFightersByDivision(division: string): Promise<RankedFighter[]> {
  // Check client cache first
  if (isCacheValid(clientCache.fightersByDivision[division])) {
    return clientCache.fightersByDivision[division].data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch(`/api/ufc-rankings?division=${encodeURIComponent(division)}`);
    if (!response.ok) throw new Error(`Failed to fetch fighters for division: ${division}`);
    
    const data: DivisionResponse = await response.json();
    
    // Update cache
    clientCache.fightersByDivision[division] = {
      data: data.fighters,
      timestamp: Date.now()
    };
    
    return data.fighters;
  } catch (error) {
    console.error(`Error fetching fighters for division ${division}:`, error);
    
    // Fallback to static data if API fails
    const fighters = getDbFightersByDivision(division);
    clientCache.fightersByDivision[division] = {
      data: fighters,
      timestamp: Date.now()
    };
    
    return fighters;
  }
}

/**
 * Gets a fighter by ID (client-side with cache)
 */
export async function fetchFighterById(id: string): Promise<RankedFighter | null> {
  // Check client cache first
  if (isCacheValid(clientCache.fightersById[id])) {
    return clientCache.fightersById[id].data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch(`/api/ufc-rankings?id=${encodeURIComponent(id)}`);
    if (response.status === 404) {
      // Cache the 404 to avoid repeated requests for non-existent fighters
      clientCache.fightersById[id] = {
        data: null,
        timestamp: Date.now()
      };
      return null;
    }
    
    if (!response.ok) throw new Error(`Failed to fetch fighter: ${id}`);
    
    const fighter: RankedFighter = await response.json();
    
    // Update cache
    clientCache.fightersById[id] = {
      data: fighter,
      timestamp: Date.now()
    };
    
    return fighter;
  } catch (error) {
    console.error(`Error fetching fighter ${id}:`, error);
    
    // Fallback to static data if API fails
    const fighter = getDbFighterById(id);
    clientCache.fightersById[id] = {
      data: fighter || null,
      timestamp: Date.now()
    };
    
    return fighter || null;
  }
}

/**
 * Searches fighters by name (client-side with cache)
 */
export async function fetchSearchFighters(query: string): Promise<RankedFighter[]> {
  // Normalize query for caching
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];
  
  // Check client cache first
  if (isCacheValid(clientCache.searchResults[normalizedQuery])) {
    return clientCache.searchResults[normalizedQuery].data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch(`/api/ufc-rankings?search=${encodeURIComponent(normalizedQuery)}`);
    if (!response.ok) throw new Error(`Failed to search fighters: ${normalizedQuery}`);
    
    const fighters: RankedFighter[] = await response.json();
    
    // Update cache
    clientCache.searchResults[normalizedQuery] = {
      data: fighters,
      timestamp: Date.now()
    };
    
    return fighters;
  } catch (error) {
    console.error(`Error searching fighters for "${normalizedQuery}":`, error);
    
    // Fallback to static data if API fails
    const fighters = dbSearchFighters(normalizedQuery);
    clientCache.searchResults[normalizedQuery] = {
      data: fighters,
      timestamp: Date.now()
    };
    
    return fighters;
  }
}

/**
 * Gets all champions (client-side with cache)
 */
export async function fetchAllChampions(): Promise<RankedFighter[]> {
  // Check client cache first
  if (isCacheValid(clientCache.champions)) {
    return clientCache.champions.data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch('/api/ufc-rankings?champions=true');
    if (!response.ok) throw new Error('Failed to fetch champions');
    
    const champions: RankedFighter[] = await response.json();
    
    // Update cache
    clientCache.champions = {
      data: champions,
      timestamp: Date.now()
    };
    
    return champions;
  } catch (error) {
    console.error('Error fetching champions:', error);
    
    // Fallback to static data if API fails
    const champions = getDbAllChampions();
    clientCache.champions = {
      data: champions,
      timestamp: Date.now()
    };
    
    return champions;
  }
}

/**
 * Gets pound-for-pound rankings (client-side with cache)
 */
export async function fetchPoundForPoundRankings(): Promise<PoundForPoundRankings> {
  // Check client cache first
  if (isCacheValid(clientCache.p4pRankings)) {
    return clientCache.p4pRankings.data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch('/api/ufc-rankings?p4p=all');
    if (!response.ok) throw new Error('Failed to fetch pound-for-pound rankings');
    
    const rankings: PoundForPoundRankings = await response.json();
    
    // Update cache
    clientCache.p4pRankings = {
      data: rankings,
      timestamp: Date.now()
    };
    
    return rankings;
  } catch (error) {
    console.error('Error fetching pound-for-pound rankings:', error);
    
    // Fallback to static data if API fails
    const rankings: PoundForPoundRankings = {
      mens: fightersDb.rankings.pound4pound.mens,
      womens: fightersDb.rankings.pound4pound.womens,
      lastUpdated: fightersDb.lastUpdated
    };
    
    clientCache.p4pRankings = {
      data: rankings,
      timestamp: Date.now()
    };
    
    return rankings;
  }
}

/**
 * Gets all available divisions (client-side with cache)
 */
export async function fetchAvailableDivisions(): Promise<string[]> {
  // Check client cache first
  if (isCacheValid(clientCache.divisions)) {
    return clientCache.divisions.data;
  }
  
  try {
    // In client components, fetch from API
    const response = await fetch('/api/ufc-rankings');
    if (!response.ok) throw new Error('Failed to fetch divisions');
    
    const data = await response.json();
    const divisions: string[] = data.availableDivisions || [];
    
    // Update cache
    clientCache.divisions = {
      data: divisions,
      timestamp: Date.now()
    };
    
    return divisions;
  } catch (error) {
    console.error('Error fetching divisions:', error);
    
    // Fallback to static data if API fails
    const divisions = getDbAllDivisions();
    clientCache.divisions = {
      data: divisions,
      timestamp: Date.now()
    };
    
    return divisions;
  }
}

/**
 * Clears the client-side cache
 */
export function clearFightersCache(): void {
  clientCache = {
    fightersByDivision: {},
    fightersById: {},
    searchResults: {}
  };
}

/**
 * Utility to check if a fighter is a champion
 */
export function isChampion(fighter: RankedFighter): boolean {
  return fighter.isChampion;
}

/**
 * Utility to check if a fighter is ranked in pound-for-pound
 */
export function isInPoundForPound(fighter: RankedFighter): boolean {
  return fighter.division.includes('Pound-for-Pound');
}

/**
 * Utility to get the weight class from a division name
 */
export function getWeightClassFromDivision(division: string): string {
  // Remove "Women's" prefix if present
  return division.replace(/^Women's\s+/, '');
}

/**
 * Default export with all functions
 */
export default {
  // Server-side functions
  getAllFighters,
  getFightersByDivision,
  getFighterById,
  getFighterByName,
  searchFighters,
  getAllChampions,
  getPoundForPoundRankings,
  getAvailableDivisions,
  getLastUpdated,
  
  // Client-side functions
  fetchAllFighters,
  fetchFightersByDivision,
  fetchFighterById,
  fetchSearchFighters,
  fetchAllChampions,
  fetchPoundForPoundRankings,
  fetchAvailableDivisions,
  clearFightersCache,
  
  // Utility functions
  isChampion,
  isInPoundForPound,
  getWeightClassFromDivision
};
