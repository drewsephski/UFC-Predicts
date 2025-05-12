"use client";

import { useState, useEffect } from 'react';

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  record: string;
  imageUrl?: string;
  isChampion: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location?: string;
  venue?: string;
}

interface Fight {
  id: string;
  eventId: string;
  redCornerId: string;
  blueCornerId: string;
  weightClass: string;
  rounds: number;
  isMainEvent: boolean;
  isTitleFight: boolean;
  status: string;
  result?: string;
  winMethod?: string;
  winRound?: number;
  winTime?: string;
  event?: Event;
  redCorner: Fighter;
  blueCorner: Fighter;
  createdAt: string;
  updatedAt: string;
}

interface UseFightsOptions {
  id?: string;
  eventId?: string;
  upcoming?: boolean;
  completed?: boolean;
}

/**
 * Custom hook for fetching UFC fight data
 * 
 * @param options - Options for filtering fights
 * @returns Object containing fights data and loading/error states
 */
export const useFights = (options: UseFightsOptions = {}) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [fight, setFight] = useState<Fight | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFights = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let url = '/api/fights';
        const params = new URLSearchParams();
        
        if (options.id) {
          params.append('id', options.id);
        }
        
        if (options.eventId) {
          params.append('eventId', options.eventId);
        }
        
        if (options.upcoming) {
          params.append('upcoming', 'true');
        }
        
        if (options.completed) {
          params.append('completed', 'true');
        }
        
        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch fights');
        }
        
        const data = await response.json();
        
        if (options.id) {
          setFight(data);
        } else {
          setFights(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFights();
  }, [options.id, options.eventId, options.upcoming, options.completed]);
  
  return {
    fights,
    fight,
    isLoading,
    error
  };
};

/**
 * Custom hook for creating fight predictions
 * 
 * @returns Object containing prediction functions and loading/error states
 */
export const useFightPrediction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  interface PredictionData {
    fightId: string;
    fighterId: string;
    method?: string;
    round?: number;
    confidence?: number;
    notes?: string;
  }
  
  const createPrediction = async (data: PredictionData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/fight-picks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create prediction');
      }
      
      setSuccess(true);
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    createPrediction,
    isLoading,
    error,
    success
  };
};
