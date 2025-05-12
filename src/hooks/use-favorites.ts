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
}

interface Favorite {
  id: string;
  fighterId: string;
  userId: string;
  createdAt: string;
  fighter: Fighter;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/favorites');
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFavorites();
  }, []);
  
  const addFavorite = async (fighterId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fighterId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add favorite');
      }
      
      await fetchFavorites();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeFavorite = async (favoriteId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/favorites?id=${favoriteId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove favorite');
      }
      
      await fetchFavorites();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite
  };
};
