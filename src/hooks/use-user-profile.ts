"use client";

import { useState, useEffect } from 'react';

interface Fighter {
  id: string;
  name: string;
  nickname?: string;
  division: string;
  record: string;
  country?: string;
  isChampion: boolean;
  imageUrl?: string;
}

interface Prediction {
  id: string;
  fighterId: string;
  userId: string;
  prediction: string;
  confidence: number;
  notes?: string;
  isCorrect?: boolean;
  createdAt: string;
  updatedAt: string;
  fighter: Fighter;
}

interface Favorite {
  id: string;
  fighterId: string;
  userId: string;
  createdAt: string;
  fighter: Fighter;
}

interface UserStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
}

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  predictions: Prediction[];
  favorites: Favorite[];
  stats: UserStats;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/user');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  const updateProfile = async (data: { name?: string; avatar?: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      await fetchProfile();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refreshProfile: fetchProfile
  };
};
