import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';

// Types
export interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  division: string;
  record: string;
  country?: string;
  age?: number;
  height?: string;
  weight?: string;
  reach?: string;
  stance?: string;
  isChampion: boolean;
  imageUrl?: string;
  wins: number;
  losses: number;
  draws: number;
  knockouts: number;
  submissions: number;
  ranking?: number;
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
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: {
    winnerId?: string;
    method?: string;
    round?: number;
    time?: string;
  };
  redCorner?: Fighter;
  blueCorner?: Fighter;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  venueId?: string;
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
  createdAt: string;
  updatedAt: string;
  fighter?: Fighter;
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
      
      const data = await response.json();
      setFighters(data);
      
      // Set featured fighters (champions and top ranked)
      const champions = data.filter((fighter: Fighter) => fighter.isChampion);
      const topRanked = data
        .filter((fighter: Fighter) => !fighter.isChampion && fighter.ranking && fighter.ranking <= 5)
        .sort((a: Fighter, b: Fighter) => (a.ranking || 99) - (b.ranking || 99))
        .slice(0, 10);
      
      setFeaturedFighters([...champions, ...topRanked]);
      
      // Organize champions by division
      const champsByDiv: Record<string, Fighter | null> = {};
      for (const fighter of data) {
        if (fighter.isChampion) {
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
      const upcomingData = await upcomingResponse.json();
      setUpcomingEvents(upcomingData);
      
      // Fetch past events
      const pastResponse = await fetch('/api/events?past=true');
      if (!pastResponse.ok) throw new Error('Failed to fetch past events');
      const pastData = await pastResponse.json();
      setPastEvents(pastData);
    } catch (error) {
      setErrorEvents(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // Fetch fights
  const fetchFights = useCallback(async () => {
    setLoadingFights(true);
    setErrorFights(null);
    
    try {
      const response = await fetch('/api/fights?upcoming=true');
      if (!response.ok) throw new Error('Failed to fetch fights');
      
      const data = await response.json();
      setUpcomingFights(data);
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
      
      const data = await response.json();
      setUserPredictions(data);
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
      
      const newPrediction = await response.json();
      setUserPredictions(prev => [newPrediction, ...prev]);
      return newPrediction;
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

  const value = {
    // Fighters
    fighters,
    featuredFighters,
    championsByDivision,
    loadingFighters,
    errorFighters,
    
    // Events
    upcomingEvents,
    pastEvents,
    loadingEvents,
    errorEvents,
    
    // Fights
    upcomingFights,
    loadingFights,
    errorFights,
    
    // Predictions
    userPredictions,
    loadingPredictions,
    errorPredictions,
    
    // Actions
    refreshFighters: fetchFighters,
    refreshEvents: fetchEvents,
    refreshFights: fetchFights,
    refreshPredictions: fetchPredictions,
    makePrediction,
  };

  return <UFCContext.Provider value={value}>{children}</UFCContext.Provider>;
};
