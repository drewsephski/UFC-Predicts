import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import type { Fighter, CareerStats } from '@/types/mma';
import { calculateAge } from '@/functions/date-helpers';

// Helper function to map API fighter data (PascalCase) to frontend Fighter type (camelCase)
// In ufc-context.tsx, update the mapFighterData function:

const mapFighterData = (apiFighter: ApiFighter | null | undefined): Fighter | null => {
  if (!apiFighter) {
    return null;
  }

  const wins = apiFighter.Wins ?? 0;
  const losses = apiFighter.Losses ?? 0;
  const draws = apiFighter.Draws ?? 0;

  return {
    id: apiFighter.FighterId?.toString() || '',
    name: apiFighter.FirstName && apiFighter.LastName
      ? `${apiFighter.FirstName} ${apiFighter.LastName}`.trim()
      : apiFighter.FirstName || apiFighter.LastName || 'Unknown Fighter',
    nickname: apiFighter.Nickname ?? null,
    division: apiFighter.WeightClass ?? 'Unknown',
    ranking: apiFighter.Ranking ?? null,
    isChampion: (apiFighter.TitleWins ?? 0) > 0,
    country: apiFighter.Country ?? null,
    birthDate: apiFighter.BirthDate ?? null,
    age: apiFighter.BirthDate ? calculateAge(apiFighter.BirthDate) : null,
    // Convert numbers to strings for these fields
    height: apiFighter.Height?.toString() ?? null,
    weight: apiFighter.Weight?.toString() ?? null,
    reach: apiFighter.Reach?.toString() ?? null,
    wins: wins,
    losses: losses,
    draws: draws,
    noContests: apiFighter.NoContests ?? null,
    technicalKnockouts: apiFighter.TechnicalKnockouts ?? null,
    technicalKnockoutLosses: apiFighter.TechnicalKnockoutLosses ?? null,
    submissions: apiFighter.Submissions ?? null,
    submissionLosses: apiFighter.SubmissionLosses ?? null,
    titleWins: apiFighter.TitleWins ?? null,
    titleLosses: apiFighter.TitleLosses ?? null,
    titleDraws: apiFighter.TitleDraws ?? null,
    record: `${wins}-${losses}-${draws}`,
    careerStats: apiFighter.CareerStats ? {
      FighterId: apiFighter.CareerStats.FighterId,
      sigStrikesLandedPerMinute: apiFighter.CareerStats.SigStrikesLandedPerMinute ?? null,
      sigStrikeAccuracy: apiFighter.CareerStats.SigStrikeAccuracy ?? null,
      takedownAverage: apiFighter.CareerStats.TakedownAverage ?? null,
      submissionAverage: apiFighter.CareerStats.SubmissionAverage ?? null, // Changed from SubmissionPercentage
      knockoutPercentage: apiFighter.CareerStats.KnockoutPercentage ?? null,
      technicalKnockoutPercentage: apiFighter.CareerStats.TechnicalKnockoutPercentage ?? null,
      decisionPercentage: apiFighter.CareerStats.DecisionPercentage ?? null,
      careerSapm: apiFighter.CareerStats.CareerSapm ?? null,
      takedownDefense: apiFighter.CareerStats.TakedownDefense ?? null,
      strikingDefense: apiFighter.CareerStats.StrikingDefense ?? null,
    } : null,
    imageUrl: apiFighter.image_url ?? null,
  };
};
// Define API response types based on assumed PascalCase from Prisma/API
interface ApiCareerStats {
  FighterId?: number;
  SigStrikesLandedPerMinute?: number | null;
  SigStrikeAccuracy?: number | null;
  TakedownAverage?: number | null;
  SubmissionAverage?: number | null;
  KnockoutPercentage?: number | null;
  TechnicalKnockoutPercentage?: number | null;
  DecisionPercentage?: number | null;
  CareerSapm?: number | null; // Add Strikes Absorbed Per Minute
  TakedownDefense?: number | null; // Add Takedown Defense Percentage
  StrikingDefense?: number | null; // Add Striking Defense Percentage
  // Add any other career stat fields you might need from the API
}

interface ApiFighter {
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
  CareerStats?: ApiCareerStats | null; // Reference ApiCareerStats
  image_url?: string | null;
  Ranking?: number | null; // Assuming a Ranking property
  Country?: string | null; // Assuming a Country property
}

interface ApiFight {
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
  result?: {
    winnerId?: string;
    method?: string;
    round?: number;
    time?: string;
  } | null; // Allow null for result
  redCorner?: ApiFighter | null; // Nested API fighter, allow null
  blueCorner?: ApiFighter | null; // Nested API fighter, allow null
}

interface ApiEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  venue: string | null;
  poster?: string;
  mainCard: ApiFight[]; // Array of API fights
  prelimCard: ApiFight[]; // Array of API fights
}

interface ApiPrediction {
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
  fighter?: ApiFighter | null; // Nested API fighter, allow null
}

// Types (Frontend)
export interface Venue {
  id: string;
  name: string;
  city: string;
  state?: string;
  country: string;
}

export interface Fight {
  id: string;
  eventId: string;
  redCornerId: string;
  blueCornerId: string;
  weightClass: string;
  isMainEvent: boolean;
  isTitleFight: boolean;
  rounds: number;
  date: string; // ISO date string
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: {
    winnerId?: string;
    method?: string;
    round?: number;
    time?: string;
  } | null; // Allow null for result
  redCorner?: Fighter | null; // Allow null
  blueCorner?: Fighter | null; // Allow null
}

export interface Event {
  id: string;
  name: string;
  date: string; // ISO date string
  location: string;
  venue: string | null;
  poster?: string;
  mainCard: Fight[];
  prelimCard: Fight[];
}

export interface Prediction {
  id: string;
  userId: string;
  fightId: string;
  predictedWinnerId: string;
  method: string;
  round?: number;
  confidence: number;
  notes?: string;
  isCorrect?: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  fighter?: Fighter | null; // Allow null
}

interface UFCContextType {
  // Fighters
  fighters: Fighter[];
  featuredFighters: Fighter[];
  championsByDivision: Record<string, Fighter | null>;
  loadingFighters: boolean;
  errorFighters: string | null;

  // Events
  upcomingEvents: Event[];
  pastEvents: Event[];
  loadingEvents: boolean;
  errorEvents: string | null;

  // Fights
  upcomingFights: Fight[];
  loadingFights: boolean;
  errorFights: string | null;

  // Predictions
  userPredictions: Prediction[];
  loadingPredictions: boolean;
  errorPredictions: string | null;

  // Actions
  refreshFighters: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  refreshFights: () => Promise<void>;
  refreshPredictions: () => Promise<void>;
  makePrediction: (prediction: Omit<Prediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Prediction | null>;
}

const UFCContext = createContext<UFCContextType | undefined>(undefined);

export const useUFC = () => {
  const context = useContext(UFCContext);
  if (context === undefined) {
    throw new Error('useUFC must be used within a UFCProvider');
  }
  return context;
};

export const UFCProvider = ({ children }: { children: ReactNode }) => {
  // Fighters state
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [featuredFighters, setFeaturedFighters] = useState<Fighter[]>([]);
  const [championsByDivision, setChampionsByDivision] = useState<Record<string, Fighter | null>>({});
  const [loadingFighters, setLoadingFighters] = useState(true);
  const [errorFighters, setErrorFighters] = useState<string | null>(null);

  // Events state
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);

  // Fights state
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [loadingFights, setLoadingFights] = useState(true);
  const [errorFights, setErrorFights] = useState<string | null>(null);

  // Predictions state
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);
  const [loadingPredictions, setLoadingPredictions] = useState(true);
  const [errorPredictions, setErrorPredictions] = useState<string | null>(null);

  // Fetch fighters
  const fetchFighters = useCallback(async () => {
    setLoadingFighters(true);
    setErrorFighters(null);

    try {
      const response = await fetch('/api/fighters');
      if (!response.ok) throw new Error('Failed to fetch fighters');

      const data: ApiFighter[] = await response.json();

      // Map the incoming data to the Fighter type, filtering out any null results from mapping
      const mappedFighters = data.map(mapFighterData).filter((fighter): fighter is Fighter => fighter !== null);

      setFighters(mappedFighters);

      // Set featured fighters (champions and top ranked)
      // Now using the mapped fighter data with camelCase properties
      const champions = mappedFighters.filter(fighter => (fighter.titleWins ?? 0) > 0);
      // Since ranking might not be consistently available, take top 10 by default if not enough champions
      const topFeatured = mappedFighters
        .filter(fighter => (fighter.titleWins ?? 0) === 0) // Exclude champions already added
        .sort((a, b) => (a.ranking ?? Number.POSITIVE_INFINITY) - (b.ranking ?? Number.POSITIVE_INFINITY)) // Sort by ranking if available
        .slice(0, 10 - champions.length); // Take remaining slots up to 10

      setFeaturedFighters([...champions, ...topFeatured]);

      // Organize champions by division
      const champsByDiv: Record<string, Fighter | null> = {};
      for (const fighter of champions) {
        if (fighter.division) {
          champsByDiv[fighter.division] = fighter;
        }
      }
      setChampionsByDivision(champsByDiv);
    } catch (error) {
      setErrorFighters(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoadingFighters(false);
    }
  }, []);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    setErrorEvents(null);

    try {
      // Fetch upcoming events
      const upcomingResponse = await fetch('/api/events?upcoming=true');
      if (!upcomingResponse.ok) throw new Error('Failed to fetch upcoming events');
      const upcomingData: ApiEvent[] = await upcomingResponse.json();

      // Map fighter data within fights in upcoming events
      const mappedUpcomingEvents = upcomingData.map(event => ({
        ...event,
        mainCard: event.mainCard.map((fight: ApiFight) => ({
          ...fight,
          redCorner: mapFighterData(fight.redCorner), // Use mapFighterData, handles null
          blueCorner: mapFighterData(fight.blueCorner), // Use mapFighterData, handles null
        })),
        prelimCard: event.prelimCard.map((fight: ApiFight) => ({
          ...fight,
          redCorner: mapFighterData(fight.redCorner), // Use mapFighterData, handles null
          blueCorner: mapFighterData(fight.blueCorner), // Use mapFighterData, handles null
        })),
      }));

      setUpcomingEvents(mappedUpcomingEvents);

      // Fetch past events
      const pastResponse = await fetch('/api/events?past=true');
      if (!pastResponse.ok) throw new Error('Failed to fetch past events');
      const pastData: ApiEvent[] = await pastResponse.json();

      // Map fighter data within fights in past events
      const mappedPastEvents = pastData.map(event => ({
        ...event,
        mainCard: event.mainCard.map((fight: ApiFight) => ({
          ...fight,
          redCorner: mapFighterData(fight.redCorner), // Use mapFighterData, handles null
          blueCorner: mapFighterData(fight.blueCorner), // Use mapFighterData, handles null
        })),
        prelimCard: event.prelimCard.map((fight: ApiFight) => ({
          ...fight,
          redCorner: mapFighterData(fight.redCorner), // Use mapFighterData, handles null
          blueCorner: mapFighterData(fight.blueCorner), // Use mapFighterData, handles null
        })),
      }));

      setPastEvents(mappedPastEvents);
    } catch (error) {
      setErrorEvents(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // Fetch fights (specifically upcoming fights for the context state)
  const fetchFights = useCallback(async () => {
    setLoadingFights(true);
    setErrorFights(null);

    try {
      const response = await fetch('/api/fights?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch fights');

      const data: ApiFight[] = await response.json();

      // Map fighter data within upcoming fights
      const mappedUpcomingFights = data.map(fight => ({
        ...fight,
        redCorner: mapFighterData(fight.redCorner), // Use mapFighterData, handles null
        blueCorner: mapFighterData(fight.blueCorner), // Use mapFighterData, handles null
      }));

      setUpcomingFights(mappedUpcomingFights);
    } catch (error) {
      setErrorFights(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoadingFights(false);
    }
  }, []);

  // Fetch predictions
  const fetchPredictions = useCallback(async () => {
    setLoadingPredictions(true);
    setErrorPredictions(null);

    try {
      const response = await fetch('/api/predictions');
      if (!response.ok) throw new Error('Failed to fetch predictions');

      const data: ApiPrediction[] = await response.json();

      // Map fighter data within predictions
      const mappedPredictions = data.map(prediction => ({
        ...prediction,
        fighter: mapFighterData(prediction.fighter), // Use mapFighterData, handles null
        // Ensure dates are correctly formatted if needed elsewhere
        createdAt: new Date(prediction.createdAt).toISOString(),
        updatedAt: new Date(prediction.updatedAt).toISOString(),
      }));

      setUserPredictions(mappedPredictions);
    } catch (error) {
      setErrorPredictions(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoadingPredictions(false);
    }
  }, []);

  // Make a prediction
  const makePrediction = useCallback(async (prediction: Omit<Prediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prediction),
      });

      if (!response.ok) throw new Error('Failed to create prediction');

      const newPrediction: ApiPrediction = await response.json();

      // Map the returned prediction data, including the potentially nested fighter
      const mappedPrediction: Prediction = {
        ...newPrediction,
        fighter: mapFighterData(newPrediction.fighter), // Use mapFighterData, handles null
        createdAt: new Date(newPrediction.createdAt).toISOString(),
        updatedAt: new Date(newPrediction.updatedAt).toISOString(),
      };

      setUserPredictions(prev => [mappedPrediction, ...prev]);
      return mappedPrediction;
    } catch (error) {
      setErrorPredictions(error instanceof Error ? error.message : 'An error occurred');
      return null;
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    fetchFighters();
    fetchEvents();
    fetchFights();
    fetchPredictions();
  }, [fetchFighters, fetchEvents, fetchFights, fetchPredictions]);

  return (
    <UFCContext.Provider value={{
      fighters,
      featuredFighters,
      championsByDivision,
      loadingFighters,
      errorFighters,
      upcomingEvents,
      pastEvents,
      loadingEvents,
      errorEvents,
      upcomingFights,
      loadingFights,
      errorFights,
      userPredictions,
      loadingPredictions,
      errorPredictions,
      refreshFighters: fetchFighters,
      refreshEvents: fetchEvents,
      refreshFights: fetchFights,
      refreshPredictions: fetchPredictions,
      makePrediction,
    }}>
      {children}
    </UFCContext.Provider>
  );
};
