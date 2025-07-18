/**
 * UFC Rankings Parser
 * 
 * A utility for parsing UFC rankings from the official UFC.com/rankings page.
 * This module provides functions to extract fighter data, rankings, and division information
 * from either live UFC.com data or from provided text content.
 */

import * as cheerio from 'cheerio';

// =====================================================================
// Types
// =====================================================================

/**
 * Represents a UFC fighter with ranking information
 */
export interface RankedFighter {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  profileUrl: string;
  imageUrl?: string;
  division: string;
  isChampion: boolean;
  rank: number;
  rankChange?: number | null;
}

/**
 * Represents a complete set of UFC rankings
 */
export interface UFCRankings {
  lastUpdated: string;
  divisions: {
    [division: string]: {
      name: string;
      champion?: RankedFighter;
      fighters: RankedFighter[];
    }
  };
  pound4pound: {
    mens: RankedFighter[];
    womens: RankedFighter[];
  };
}

// =====================================================================
// Constants
// =====================================================================

const UFC_RANKINGS_URL = 'https://www.ufc.com/rankings';

const DIVISION_NAMES = {
  "Flyweight": "Flyweight",
  "Bantamweight": "Bantamweight",
  "Featherweight": "Featherweight",
  "Lightweight": "Lightweight",
  "Welterweight": "Welterweight",
  "Middleweight": "Middleweight",
  "Light Heavyweight": "Light Heavyweight",
  "Heavyweight": "Heavyweight",
  "Women's Strawweight": "Women's Strawweight",
  "Women's Flyweight": "Women's Flyweight",
  "Women's Bantamweight": "Women's Bantamweight",
  "Men's Pound-for-Pound Top Rank": "Men's Pound-for-Pound",
  "Women's Pound-for-Pound Top Rank": "Women's Pound-for-Pound"
};

// =====================================================================
// Helper Functions
// =====================================================================

/**
 * Creates a unique ID from a fighter's name
 */
function createFighterId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Normalizes a division name for consistency
 */
function normalizeDivisionName(division: string): string {
  const normalized = division.trim();
  return DIVISION_NAMES[normalized] || normalized;
}

/**
 * Extracts first name, last name, and nickname from a fighter's full name
 */
function extractNameComponents(fullName: string): { firstName: string, lastName: string, nickname?: string } {
  // Handle nickname in parentheses, e.g., "Jon (Bones) Jones"
  const nicknameMatch = fullName.match(/^(.*?)\s+\((.*?)\)\s+(.*)$/);
  if (nicknameMatch) {
    const [_, firstName, nickname, lastName] = nicknameMatch;
    return { firstName, lastName, nickname };
  }

  // Simple case: split on last space
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: '' };
  }
  
  const lastName = nameParts.pop() || '';
  const firstName = nameParts.join(' ');
  
  return { firstName, lastName };
}

/**
 * Parses a rank change string to extract numeric change
 */
function parseRankChange(changeText?: string): number | null {
  if (!changeText) return null;
  
  const match = changeText.match(/increased by (\d+)|decreased by (\d+)/i);
  if (!match) return null;
  
  const increase = match[1];
  const decrease = match[2];
  
  if (increase) return parseInt(increase, 10);
  if (decrease) return -parseInt(decrease, 10);
  
  return null;
}

// =====================================================================
// Core Parsing Functions
// =====================================================================

/**
 * Parses a table of ranked fighters from HTML/text content
 */
function parseRankingsTable($: cheerio.CheerioAPI, tableSelector: string): RankedFighter[] {
  const fighters: RankedFighter[] = [];
  const rows = $(tableSelector).find('tr');
  
  rows.each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 2) return; // Skip header rows
    
    const rankText = $(cells[0]).text().trim();
    const rank = parseInt(rankText, 10);
    if (isNaN(rank)) return; // Skip invalid rows
    
    const nameCell = $(cells[1]);
    const nameLink = nameCell.find('a');
    const name = nameLink.text().trim();
    const profileUrl = nameLink.attr('href') || '';
    const fullProfileUrl = profileUrl.startsWith('/') 
      ? `https://www.ufc.com${profileUrl}` 
      : profileUrl;
    
    // Look for rank change text in the third cell if it exists
    let rankChange: number | null = null;
    if (cells.length > 2) {
      const changeText = $(cells[2]).text().trim();
      rankChange = parseRankChange(changeText);
    }
    
    // Extract division from context (will be set later)
    const division = '';
    
    // Create fighter object
    if (name) {
      const nameComponents = extractNameComponents(name);
      fighters.push({
        id: createFighterId(name),
        name,
        firstName: nameComponents.firstName,
        lastName: nameComponents.lastName,
        nickname: nameComponents.nickname,
        profileUrl: fullProfileUrl,
        imageUrl: undefined, // Will try to extract from champion sections
        division,
        isChampion: false,
        rank,
        rankChange
      });
    }
  });
  
  return fighters;
}

/**
 * Parses champion information from HTML/text content
 */
function parseChampion($: cheerio.CheerioAPI, championSelector: string): RankedFighter | undefined {
  const championElement = $(championSelector);
  if (championElement.length === 0) return undefined;
  
  const nameLink = championElement.find('a');
  const name = nameLink.text().trim();
  if (!name) return undefined;
  
  const profileUrl = nameLink.attr('href') || '';
  const fullProfileUrl = profileUrl.startsWith('/') 
    ? `https://www.ufc.com${profileUrl}` 
    : profileUrl;
  
  const imageUrl = championElement.find('img').attr('src') || undefined;
  const nameComponents = extractNameComponents(name);
  
  return {
    id: createFighterId(name),
    name,
    firstName: nameComponents.firstName,
    lastName: nameComponents.lastName,
    nickname: nameComponents.nickname,
    profileUrl: fullProfileUrl,
    imageUrl,
    division: '', // Will be set later
    isChampion: true,
    rank: 0, // Champions are rank 0
    rankChange: null
  };
}

/**
 * Extracts the last updated date from the rankings page
 */
function extractLastUpdated($: cheerio.CheerioAPI): string {
  const dateText = $('body').text().match(/Last\s+updated:\s+([^N]+)/i)?.[1]?.trim();
  if (dateText) {
    try {
      const date = new Date(dateText);
      return date.toISOString();
    } catch (e) {
      // If parsing fails, return the raw text
      return dateText;
    }
  }
  return new Date().toISOString();
}

/**
 * Main function to parse UFC rankings from HTML/text content
 */
export function parseUFCRankings(content: string): UFCRankings {
  const $ = cheerio.load(content);
  const rankings: UFCRankings = {
    lastUpdated: extractLastUpdated($),
    divisions: {},
    pound4pound: {
      mens: [],
      womens: []
    }
  };

  // Find all division sections
  $('.view-grouping').each((_, element) => {
    const divisionHeader = $(element).find('.view-grouping-header h4').text().trim();
    const normalizedDivision = normalizeDivisionName(divisionHeader);
    
    // Skip if we couldn't identify the division
    if (!normalizedDivision) return;
    
    // Check if this is a pound-for-pound ranking
    const isPoundForPound = normalizedDivision.includes('Pound-for-Pound');
    const isWomens = normalizedDivision.includes('Women');
    
    // Parse the champion if this is a weight division (not p4p)
    let champion: RankedFighter | undefined;
    if (!isPoundForPound) {
      champion = parseChampion($(element), '.champion-fighter');
      if (champion) {
        champion.division = normalizedDivision;
      }
    }
    
    // Parse the ranked fighters
    const fighters = parseRankingsTable($(element), 'table');
    fighters.forEach(fighter => {
      fighter.division = normalizedDivision;
    });
    
    // Add to the appropriate section
    if (isPoundForPound) {
      if (isWomens) {
        rankings.pound4pound.womens = fighters;
      } else {
        rankings.pound4pound.mens = fighters;
      }
    } else {
      rankings.divisions[normalizedDivision] = {
        name: normalizedDivision,
        champion,
        fighters
      };
    }
  });
  
  return rankings;
}

// =====================================================================
// Public API Functions
// =====================================================================

/**
 * Fetches and parses UFC rankings from the live UFC.com website
 */
export async function fetchUFCRankings(): Promise<UFCRankings> {
  try {
    const response = await fetch(UFC_RANKINGS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch UFC rankings: ${response.status}`);
    }
    
    const html = await response.text();
    return parseUFCRankings(html);
  } catch (error) {
    console.error('Error fetching UFC rankings:', error);
    throw error;
  }
}

/**
 * Gets all fighters from the rankings data
 */
export function getAllFighters(rankings: UFCRankings): RankedFighter[] {
  const allFighters: RankedFighter[] = [
    ...rankings.pound4pound.mens,
    ...rankings.pound4pound.womens
  ];
  
  // Add champions and ranked fighters from each division
  Object.values(rankings.divisions).forEach(division => {
    if (division.champion) {
      allFighters.push(division.champion);
    }
    allFighters.push(...division.fighters);
  });
  
  return allFighters;
}

/**
 * Gets fighters by division
 */
export function getFightersByDivision(rankings: UFCRankings, division: string): RankedFighter[] {
  const normalizedDivision = normalizeDivisionName(division);
  
  // Handle pound-for-pound divisions
  if (normalizedDivision === "Men's Pound-for-Pound") {
    return rankings.pound4pound.mens;
  }
  if (normalizedDivision === "Women's Pound-for-Pound") {
    return rankings.pound4pound.womens;
  }
  
  // Handle weight divisions
  const divisionData = rankings.divisions[normalizedDivision];
  if (!divisionData) return [];
  
  const fighters = [...divisionData.fighters];
  if (divisionData.champion) {
    fighters.unshift(divisionData.champion);
  }
  
  return fighters;
}

/**
 * Gets a fighter by ID
 */
export function getFighterById(rankings: UFCRankings, id: string): RankedFighter | undefined {
  const allFighters = getAllFighters(rankings);
  return allFighters.find(fighter => fighter.id === id);
}

/**
 * Gets all available divisions
 */
export function getAllDivisions(rankings: UFCRankings): string[] {
  return Object.keys(rankings.divisions);
}

/**
 * Converts rankings to a simple JSON structure
 */
export function rankingsToJSON(rankings: UFCRankings): string {
  return JSON.stringify(rankings, null, 2);
}

/**
 * Default export for the module
 */
export default {
  parseUFCRankings,
  fetchUFCRankings,
  getAllFighters,
  getFightersByDivision,
  getFighterById,
  getAllDivisions,
  rankingsToJSON
};
