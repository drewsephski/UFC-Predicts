/**
 * UFC-Predicts Data Transformation Utilities
 * 
 * This module provides type definitions and transformation functions for converting
 * external API responses to our internal domain models. It handles null safety,
 * data validation, and consistent formatting across the application.
 */

import { calculateAge } from '@/functions/date-helpers';
import type { Fighter, Fight, Event, Prediction, CareerStats } from '@/types/mma';

// =====================================================================
// API Response Types (External data sources)
// =====================================================================

/**
 * API Career Stats from external sources (SportsData.io, UFC.com, etc.)
 */
export interface ApiCareerStats {
  FighterId?: number;
  SigStrikesLandedPerMinute?: number | null;
  SigStrikeAccuracy?: number | null;
  TakedownAverage?: number | null;
  SubmissionAverage?: number | null;
  KnockoutPercentage?: number | null;
  TechnicalKnockoutPercentage?: number | null;
  DecisionPercentage?: number | null;
  CareerSapm?: number | null; 
  TakedownDefense?: number | null;
  StrikingDefense?: number | null;
}

/**
 * API Fighter data from external sources
 */
export interface ApiFighter {
  FighterId?: number;
  FirstName?: string | null;
  LastName?: string | null;
  Nickname?: string | null;
  WeightClass?: string | null;
  BirthDate?: string | null;
  Height?: number | null;
  Weight?: number | null;
  Reach?: number | null;
  Wins?: number | null;
  Losses?: number | null;
  Draws?: number | null;
  NoContests?: number | null;
  TechnicalKnockouts?: number | null;
  TechnicalKnockoutLosses?: number | null;
  Submissions?: number | null;
  SubmissionLosses?: number | null;
  TitleWins?: number | null;
  TitleLosses?: number | null;
  TitleDraws?: number | null;
  CareerStats?: ApiCareerStats | null;
  image_url?: string | null;
  Ranking?: number | null;
  Country?: string | null;
  Stance?: string | null;
}

/**
 * API Fight result data
 */
export interface ApiFightResult {
  winnerId?: string;
  method?: string;
  round?: number;
  time?: string;
}

/**
 * API Fight data from external sources
 */
export interface ApiFight {
  id: string;
  eventId: string;
  redCornerId: string;
  blueCornerId: string;
  weightClass: string;
  isMainEvent: boolean;
  isTitleFight: boolean;
  rounds: number;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: ApiFightResult | null;
  redCorner?: ApiFighter | null;
  blueCorner?: ApiFighter | null;
}

/**
 * API Event data from external sources
 */
export interface ApiEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string | null;
  poster?: string;
  mainCard: ApiFight[];
  prelimCard: ApiFight[];
}

/**
 * API Prediction data from external sources
 */
export interface ApiPrediction {
  id: string;
  userId: string;
  fightId: string;
  predictedWinnerId: string;
  method: string;
  round?: number;
  confidence: number;
  notes?: string;
  isCorrect?: boolean;
  createdAt: string;
  updatedAt: string;
  fighter?: ApiFighter | null;
}

// =====================================================================
// Transformation Functions
// =====================================================================

/**
 * Transforms API career stats to domain model
 * @param stats API career stats
 * @returns Domain model career stats or null if input is null/undefined
 */
export const transformCareerStats = (stats: ApiCareerStats | null | undefined): CareerStats | null => {
  if (!stats) return null;
  
  return {
    FighterId: stats.FighterId,
    sigStrikesLandedPerMinute: stats.SigStrikesLandedPerMinute ?? null,
    sigStrikeAccuracy: stats.SigStrikeAccuracy ?? null,
    takedownAverage: stats.TakedownAverage ?? null,
    submissionAverage: stats.SubmissionAverage ?? null,
    knockoutPercentage: stats.KnockoutPercentage ?? null,
    technicalKnockoutPercentage: stats.TechnicalKnockoutPercentage ?? null,
    decisionPercentage: stats.DecisionPercentage ?? null,
    careerSapm: stats.CareerSapm ?? null,
    takedownDefense: stats.TakedownDefense ?? null,
    strikingDefense: stats.StrikingDefense ?? null,
  };
};

/**
 * Transforms API fighter data to domain model
 * @param fighter API fighter data
 * @returns Domain model fighter or null if input is null/undefined
 */
export const transformFighter = (fighter: ApiFighter | null | undefined): Fighter | null => {
  if (!fighter) return null;

  const wins = fighter.Wins ?? 0;
  const losses = fighter.Losses ?? 0;
  const draws = fighter.Draws ?? 0;

  return {
    id: fighter.FighterId?.toString() || '',
    name: fighter.FirstName && fighter.LastName
      ? `${fighter.FirstName} ${fighter.LastName}`.trim()
      : fighter.FirstName || fighter.LastName || 'Unknown Fighter',
    nickname: fighter.Nickname ?? null,
    division: fighter.WeightClass ?? 'Unknown',
    ranking: fighter.Ranking ?? null,
    isChampion: (fighter.TitleWins ?? 0) > 0,
    country: fighter.Country ?? null,
    birthDate: fighter.BirthDate ?? null,
    age: fighter.BirthDate ? calculateAge(fighter.BirthDate) : null,
    height: fighter.Height?.toString() ?? null,
    weight: fighter.Weight?.toString() ?? null,
    reach: fighter.Reach?.toString() ?? null,
    stance: fighter.Stance ?? null,
    wins,
    losses,
    draws,
    noContests: fighter.NoContests ?? null,
    technicalKnockouts: fighter.TechnicalKnockouts ?? null,
    technicalKnockoutLosses: fighter.TechnicalKnockoutLosses ?? null,
    submissions: fighter.Submissions ?? null,
    submissionLosses: fighter.SubmissionLosses ?? null,
    titleWins: fighter.TitleWins ?? null,
    titleLosses: fighter.TitleLosses ?? null,
    titleDraws: fighter.TitleDraws ?? null,
    record: `${wins}-${losses}-${draws}`,
    careerStats: transformCareerStats(fighter.CareerStats),
    imageUrl: fighter.image_url ?? null,
  };
};

/**
 * Transforms API fight data to domain model
 * @param fight API fight data
 * @returns Domain model fight or null if input is null/undefined
 */
export const transformFight = (fight: ApiFight | null | undefined): Fight | null => {
  if (!fight) return null;
  
  const redCorner = transformFighter(fight.redCorner);
  const blueCorner = transformFighter(fight.blueCorner);
  
  return {
    id: fight.id,
    eventName: '', // This needs to be populated from the event context
    date: fight.date,
    redCornerId: fight.redCornerId,
    blueCornerId: fight.blueCornerId,
    redCornerName: redCorner?.name || 'Unknown Fighter',
    blueCornerName: blueCorner?.name || 'Unknown Fighter',
    weightClass: fight.weightClass,
    isTitleFight: fight.isTitleFight,
    result: fight.result ? {
      winnerId: fight.result.winnerId || null,
      method: fight.result.method || null,
      round: fight.result.round || null,
      time: fight.result.time || null,
    } : null,
  };
};

/**
 * Transforms API event data to domain model
 * @param event API event data
 * @returns Domain model event or null if input is null/undefined
 */
export const transformEvent = (event: ApiEvent | null | undefined): Event | null => {
  if (!event) return null;
  
  const mainCard = event.mainCard
    .map(fight => {
      const transformedFight = transformFight(fight);
      if (transformedFight) {
        transformedFight.eventName = event.name;
      }
      return transformedFight;
    })
    .filter((fight): fight is Fight => fight !== null);
  
  const prelimCard = event.prelimCard
    .map(fight => {
      const transformedFight = transformFight(fight);
      if (transformedFight) {
        transformedFight.eventName = event.name;
      }
      return transformedFight;
    })
    .filter((fight): fight is Fight => fight !== null);
  
  return {
    id: event.id,
    name: event.name,
    date: event.date,
    location: event.location,
    venue: event.venue,
    poster: event.poster,
    mainCard,
    prelimCard,
  };
};

/**
 * Transforms API prediction data to domain model
 * @param prediction API prediction data
 * @returns Domain model prediction or null if input is null/undefined
 */
export const transformPrediction = (prediction: ApiPrediction | null | undefined): Prediction | null => {
  if (!prediction) return null;
  
  return {
    id: prediction.id,
    userId: prediction.userId,
    fightId: prediction.fightId,
    predictedWinnerId: prediction.predictedWinnerId,
    method: prediction.method,
    round: prediction.round,
    confidence: prediction.confidence,
    notes: prediction.notes,
    isCorrect: prediction.isCorrect,
    createdAt: prediction.createdAt,
    updatedAt: prediction.updatedAt,
    fighter: transformFighter(prediction.fighter),
  };
};

// =====================================================================
// Utility Functions
// =====================================================================

/**
 * Safely formats a date string to a human-readable format
 * @param dateString ISO date string
 * @param format Format to use (default: 'MMM d, yyyy')
 * @returns Formatted date string or empty string if invalid
 */
export const formatDate = (dateString: string | null | undefined, format = 'MMM d, yyyy'): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    // Simple formatter - in a real app, use date-fns or similar
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Validates if a fighter object has all required fields
 * @param fighter Fighter object to validate
 * @returns True if valid, false otherwise
 */
export const isValidFighter = (fighter: Fighter | null | undefined): boolean => {
  if (!fighter) return false;
  
  return (
    typeof fighter.id === 'string' && 
    fighter.id.trim() !== '' &&
    typeof fighter.name === 'string' && 
    fighter.name.trim() !== '' &&
    typeof fighter.division === 'string' && 
    fighter.division.trim() !== ''
  );
};

/**
 * Validates if a fight object has all required fields
 * @param fight Fight object to validate
 * @returns True if valid, false otherwise
 */
export const isValidFight = (fight: Fight | null | undefined): boolean => {
  if (!fight) return false;
  
  return (
    typeof fight.id === 'string' && 
    fight.id.trim() !== '' &&
    typeof fight.redCornerId === 'string' && 
    fight.redCornerId.trim() !== '' &&
    typeof fight.blueCornerId === 'string' && 
    fight.blueCornerId.trim() !== ''
  );
};

/**
 * Safely access nested properties in API responses
 * @param obj Object to access
 * @param path Path to property (e.g., 'a.b.c')
 * @param defaultValue Default value if path doesn't exist
 * @returns Property value or default
 */
export function getNestedValue<T>(obj: any, path: string, defaultValue: T): T {
  try {
    const result = path.split('.').reduce((o, p) => (o && o[p] !== undefined) ? o[p] : undefined, obj);
    return (result === undefined) ? defaultValue : result;
  } catch (error) {
    return defaultValue;
  }
}

/**
 * Converts a string to title case (e.g., "john doe" -> "John Doe")
 * @param str String to convert
 * @returns Title cased string or empty string if input is null/undefined
 */
export const toTitleCase = (str: string | null | undefined): string => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
