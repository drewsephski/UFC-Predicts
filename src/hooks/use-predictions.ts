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

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/predictions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
      
      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPredictions();
  }, []);
  
  const addPrediction = async (predictionData: {
    fighterId: string;
    prediction: string;
    confidence: number;
    notes?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(predictionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add prediction');
      }
      
      await fetchPredictions();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deletePrediction = async (predictionId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/predictions?id=${predictionId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete prediction');
      }
      
      await fetchPredictions();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    predictions,
    isLoading,
    error,
    addPrediction,
    deletePrediction,
    refreshPredictions: fetchPredictions
  };
};
