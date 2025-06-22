'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { Fighter, Fight, Event, Prediction } from '@/types/mma';
import { getAllFighters, getFighterById, getUpcomingEvents, getPastEvents, getRankings } from '@/lib/services/ufc-data';

// Define the fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
};

// Context type definition
interface UFCContextType {
  // Fighters
  fighters: Fighter[];
  featuredFighters: Fighter[];
  championsByDivision: Record<string, Fighter | null>;
  loadingFighters: boolean;
  errorFighters: Error | null;

  // Events
  upcomingEvents: Event[];
  pastEvents: Event[];
  loadingEvents: boolean;
  errorEvents: Error | null;

  // Fights
  upcomingFights: Fight[];
  loadingFights: boolean;
  errorFights: Error | null;

  // Predictions
  userPredictions: Prediction[];
  loadingPredictions: boolean;
  errorPredictions: Error | null;

  // Actions
  refreshFighters: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  refreshFights: () => Promise<void>;
  refreshPredictions: () => Promise<void>;
  makePrediction: (prediction: Omit<Prediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Prediction | null>;
}

// Create context with undefined default value
const UFCContext = createContext<UFCContextType | undefined>(undefined);

// Custom hook to use the UFC context
export const useUFC = () => {
  const context = useContext(UFCContext);
  if (context === undefined) {
    throw new Error('useUFC must be used within a UFCProvider');
  }
  return context;
};

// UFC Provider component
export const UFCProvider = ({ children }: { children: ReactNode }) => {
  // Fighters data fetching with SWR
  const {
    data: fighters = [],
    error: errorFighters,
    isLoading: loadingFighters,
    mutate: mutateFighters
  } = useSWR<Fighter[]>('/api/fighters', fetcher);

  // Upcoming events data fetching with SWR
  const {
    data: upcomingEvents = [],
    error: errorUpcomingEvents,
    isLoading: loadingUpcomingEvents,
    mutate: mutateUpcomingEvents
  } = useSWR<Event[]>('/api/events?upcoming=true', fetcher);

  // Past events data fetching with SWR
  const {
    data: pastEvents = [],
    error: errorPastEvents,
    isLoading: loadingPastEvents,
    mutate: mutatePastEvents
  } = useSWR<Event[]>('/api/events?past=true', fetcher);

  // Upcoming fights data fetching with SWR
  const {
    data: upcomingFights = [],
    error: errorFights,
    isLoading: loadingFights,
    mutate: mutateFights
  } = useSWR<Fight[]>('/api/fights?upcoming=true', fetcher);

  // User predictions data fetching with SWR
  const {
    data: userPredictions = [],
    error: errorPredictions,
    isLoading: loadingPredictions,
    mutate: mutatePredictions
  } = useSWR<Prediction[]>('/api/predictions', fetcher);

  // Derive featured fighters and champions from fighters data
  const featuredFighters = React.useMemo(() => {
    // Get champions
    const champions = fighters.filter(fighter => fighter.isChampion);
    
    // Get top ranked fighters (not champions) to fill remaining spots
    const topRanked = fighters
      .filter(fighter => !fighter.isChampion)
      .sort((a, b) => (a.ranking ?? Number.POSITIVE_INFINITY) - (b.ranking ?? Number.POSITIVE_INFINITY))
      .slice(0, 10 - champions.length);
    
    return [...champions, ...topRanked];
  }, [fighters]);

  // Organize champions by division
  const championsByDivision = React.useMemo(() => {
    const champsByDiv: Record<string, Fighter | null> = {};
    
    for (const fighter of fighters) {
      if (fighter.isChampion && fighter.division) {
        champsByDiv[fighter.division] = fighter;
      }
    }
    
    return champsByDiv;
  }, [fighters]);

  // Refresh functions that trigger SWR revalidation
  const refreshFighters = async () => {
    await mutateFighters();
  };

  const refreshEvents = async () => {
    await Promise.all([
      mutateUpcomingEvents(),
      mutatePastEvents()
    ]);
  };

  const refreshFights = async () => {
    await mutateFights();
  };

  const refreshPredictions = async () => {
    await mutatePredictions();
  };

  // Make a prediction
  const makePrediction = async (prediction: Omit<Prediction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prediction),
      });

      if (!response.ok) throw new Error('Failed to create prediction');

      const newPrediction: Prediction = await response.json();
      
      // Update predictions cache with the new prediction
      await mutatePredictions(prevPredictions => 
        prevPredictions ? [newPrediction, ...prevPredictions] : [newPrediction]
      );
      
      return newPrediction;
    } catch (error) {
      console.error('Error making prediction:', error);
      return null;
    }
  };

  // Combine loading and error states for events
  const loadingEvents = loadingUpcomingEvents || loadingPastEvents;
  const errorEvents = errorUpcomingEvents || errorPastEvents;

  // Provide the context value
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
      refreshFighters,
      refreshEvents,
      refreshFights,
      refreshPredictions,
      makePrediction,
    }}>
      {children}
    </UFCContext.Provider>
  );
};

// Export additional hooks for specific data needs
export const useFighters = () => {
  const { fighters, loadingFighters, errorFighters, refreshFighters } = useUFC();
  return { fighters, loading: loadingFighters, error: errorFighters, refresh: refreshFighters };
};

export const useEvents = () => {
  const { upcomingEvents, pastEvents, loadingEvents, errorEvents, refreshEvents } = useUFC();
  return { 
    upcomingEvents, 
    pastEvents, 
    loading: loadingEvents, 
    error: errorEvents, 
    refresh: refreshEvents 
  };
};

export const useFights = () => {
  const { upcomingFights, loadingFights, errorFights, refreshFights } = useUFC();
  return { 
    upcomingFights, 
    loading: loadingFights, 
    error: errorFights, 
    refresh: refreshFights 
  };
};

export const usePredictions = () => {
  const { userPredictions, loadingPredictions, errorPredictions, refreshPredictions, makePrediction } = useUFC();
  return { 
    predictions: userPredictions, 
    loading: loadingPredictions, 
    error: errorPredictions, 
    refresh: refreshPredictions,
    makePrediction 
  };
};

export const useChampions = () => {
  const { championsByDivision, loadingFighters, errorFighters } = useUFC();
  return { 
    champions: championsByDivision, 
    loading: loadingFighters, 
    error: errorFighters 
  };
};
