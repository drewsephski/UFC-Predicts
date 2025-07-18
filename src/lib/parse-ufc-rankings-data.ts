/**
 * UFC Rankings Data Parser
 * 
 * A utility for parsing UFC rankings data from the text content of UFC.com/rankings.
 * This module extracts fighter data, rankings, and division information from the provided text.
 */

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
  isNewlyRanked?: boolean;
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
function parseRankChange(changeText?: string): { change: number | null, isNewlyRanked: boolean } {
  if (!changeText) return { change: null, isNewlyRanked: false };
  
  // Check for "NR" (Newly Ranked)
  if (changeText.trim() === "NR") {
    return { change: null, isNewlyRanked: true };
  }
  
  // Parse rank increase/decrease
  const match = changeText.match(/increased by (\d+)|decreased by (\d+)/i);
  if (!match) return { change: null, isNewlyRanked: false };
  
  const increase = match[1];
  const decrease = match[2];
  
  if (increase) return { change: parseInt(increase, 10), isNewlyRanked: false };
  if (decrease) return { change: -parseInt(decrease, 10), isNewlyRanked: false };
  
  return { change: null, isNewlyRanked: false };
}

/**
 * Extracts the last updated date from the rankings text
 */
function extractLastUpdated(text: string): string {
  const dateMatch = text.match(/Last\s+updated:\s+([^N]+)/i);
  if (dateMatch && dateMatch[1]) {
    const dateText = dateMatch[1].trim();
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
 * Extracts a profile URL from a line of text containing a fighter link
 */
function extractProfileUrl(line: string): string {
  const urlMatch = line.match(/\(https:\/\/www\.ufc\.com\/athlete\/([^)]+)\)/);
  if (urlMatch && urlMatch[0]) {
    // Remove parentheses from the matched URL
    return urlMatch[0].replace(/[()]/g, '');
  }
  return '';
}

/**
 * Parses a table row from the rankings text
 */
function parseRankingRow(line: string, division: string): RankedFighter | null {
  // Match the pattern: rank | fighter name (URL) | rank change
  const rowMatch = line.match(/^\|\s*(\d+)\s*\|\s*\[(.*?)\]\((.*?)\)\s*\|\s*(.*?)\s*\|$/);
  if (!rowMatch) return null;
  
  const [_, rankStr, name, url, changeText] = rowMatch;
  const rank = parseInt(rankStr, 10);
  if (isNaN(rank)) return null;
  
  // Process profile URL
  const profileUrl = url.startsWith('/') ? `https://www.ufc.com${url}` : url;
  
  // Process rank change
  const { change: rankChange, isNewlyRanked } = parseRankChange(changeText);
  
  // Extract name components
  const nameComponents = extractNameComponents(name);
  
  return {
    id: createFighterId(name),
    name,
    firstName: nameComponents.firstName,
    lastName: nameComponents.lastName,
    nickname: nameComponents.nickname,
    profileUrl,
    division: normalizeDivisionName(division),
    isChampion: false,
    rank,
    rankChange,
    isNewlyRanked
  };
}

/**
 * Parses a champion section from the rankings text
 */
function parseChampion(text: string, division: string): RankedFighter | null {
  // Look for the champion section pattern
  const championMatch = text.match(/#{6}\s+Champion\s*\n\s*!\[(.*?)\]\((.*?)\)/);
  if (!championMatch) return null;
  
  // Extract name and image URL
  const [_, name, imageUrl] = championMatch;
  
  // Find the profile URL in nearby lines
  const profileUrlMatch = text.match(/\[.*?\]\((https:\/\/www\.ufc\.com\/athlete\/[^)]+)\)/);
  const profileUrl = profileUrlMatch ? profileUrlMatch[1] : '';
  
  if (!name || !profileUrl) return null;
  
  // Extract name components
  const nameComponents = extractNameComponents(name);
  
  return {
    id: createFighterId(name),
    name,
    firstName: nameComponents.firstName,
    lastName: nameComponents.lastName,
    nickname: nameComponents.nickname,
    profileUrl,
    imageUrl,
    division: normalizeDivisionName(division),
    isChampion: true,
    rank: 0
  };
}

/**
 * Extracts a division section from the rankings text
 */
function extractDivisionSection(text: string, divisionHeader: string): string {
  const divisionRegex = new RegExp(`#{4}\\s+${divisionHeader}\\s*\\n([\\s\\S]*?)(?=#{4}|$)`, 'i');
  const match = text.match(divisionRegex);
  return match ? match[1] : '';
}

// =====================================================================
// Core Parsing Functions
// =====================================================================

/**
 * Parses a division's rankings from the text content
 */
function parseDivisionRankings(text: string, divisionName: string): { champion?: RankedFighter, fighters: RankedFighter[] } {
  const normalizedDivision = normalizeDivisionName(divisionName);
  const divisionSection = extractDivisionSection(text, divisionName);
  
  if (!divisionSection) {
    return { fighters: [] };
  }
  
  // Parse champion if this is a weight division (not p4p)
  let champion: RankedFighter | undefined;
  if (!divisionName.includes('Pound-for-Pound')) {
    champion = parseChampion(divisionSection, normalizedDivision);
  }
  
  // Parse ranked fighters
  const fighters: RankedFighter[] = [];
  const lines = divisionSection.split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('|') && line.includes('|')) {
      const fighter = parseRankingRow(line, normalizedDivision);
      if (fighter) {
        fighters.push(fighter);
      }
    }
  }
  
  return { champion, fighters };
}

/**
 * Main function to parse UFC rankings from text content
 */
export function parseUFCRankingsText(content: string): UFCRankings {
  const rankings: UFCRankings = {
    lastUpdated: extractLastUpdated(content),
    divisions: {},
    pound4pound: {
      mens: [],
      womens: []
    }
  };

  // Parse Men's Pound-for-Pound
  const mensP4P = parseDivisionRankings(content, "Men's Pound-for-Pound Top Rank");
  rankings.pound4pound.mens = mensP4P.fighters;

  // Parse Women's Pound-for-Pound
  const womensP4P = parseDivisionRankings(content, "Women's Pound-for-Pound Top Rank");
  rankings.pound4pound.womens = womensP4P.fighters;

  // Parse weight divisions
  const weightDivisions = [
    "Flyweight",
    "Bantamweight",
    "Featherweight",
    "Lightweight",
    "Welterweight",
    "Middleweight",
    "Light Heavyweight",
    "Heavyweight",
    "Women's Strawweight",
    "Women's Flyweight",
    "Women's Bantamweight"
  ];

  for (const division of weightDivisions) {
    const { champion, fighters } = parseDivisionRankings(content, division);
    const normalizedDivision = normalizeDivisionName(division);
    
    if (champion || fighters.length > 0) {
      rankings.divisions[normalizedDivision] = {
        name: normalizedDivision,
        champion,
        fighters
      };
    }
  }
  
  return rankings;
}

// =====================================================================
// Public API Functions
// =====================================================================

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
 * Parse the provided UFC rankings page text and generate the fighters database
 * @param pageText The raw text content from UFC.com/rankings
 * @returns Structured UFC rankings data
 */
export function parseUFCRankingsPage(pageText: string): UFCRankings {
  return parseUFCRankingsText(pageText);
}

/**
 * Default export for the module
 */
export default {
  parseUFCRankingsText,
  parseUFCRankingsPage,
  getAllFighters,
  getFightersByDivision,
  getFighterById,
  getAllDivisions,
  rankingsToJSON
};
