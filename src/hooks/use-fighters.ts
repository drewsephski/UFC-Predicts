"use client";

import { useState, useEffect } from 'react';

interface Fighter {
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
  createdAt: string;
  updatedAt: string;
}

interface UseFightersOptions {
  division?: string;
  id?: string;
}

export const useFighters = (options?: UseFightersOptions) => {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFighters = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let url = '/api/fighters';
        
        if (options?.division) {
          url += `?division=${encodeURIComponent(options.division)}`;
        } else if (options?.id) {
          url += `?id=${encodeURIComponent(options.id)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch fighters');
        }
        
        const data = await response.json();
        
        if (options?.id) {
          setFighter(data);
        } else {
          setFighters(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFighters();
  }, [options?.division, options?.id]);
  
  return {
    fighters,
    fighter,
    isLoading,
    error
  };
};

export const useAddFighter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const addFighter = async (fighterData: Omit<Fighter, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/fighters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fighterData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add fighter');
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
    addFighter,
    isLoading,
    error,
    success
  };
};
