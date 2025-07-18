"use client";

import { useState, useEffect } from 'react';
import { RankedFighter } from '@/lib/ufc-fighters';

// Cache for storing fetched data to improve performance
const cache: {
  allFighters?: { data: RankedFighter[], timestamp: number };
  byDivision: Record<string, { data: RankedFighter[], timestamp: number }>;
  byId: Record<string, { data: RankedFighter | null, timestamp: number }>;
  champions?: { data: RankedFighter[], timestamp: number };
  searchResults: Record<string, { data: RankedFighter[], timestamp: number }>;
} = {
  byDivision: {},
  byId: {},
  searchResults: {}
};

// Cache expiration time (10 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000;

// Helper to check if cache is valid
const isCacheValid = <T>(cacheItem?: { data: T, timestamp: number }): boolean => {
  if (!cacheItem) return false;
  return (Date.now() - cacheItem.timestamp) < CACHE_EXPIRATION;
};

interface UseFightersOptions {
  division?: string;
  id?: string;
  search?: string;
  champions?: boolean;
  p4p?: 'mens' | 'womens' | 'all';
  skipCache?: boolean;
}

export const useFighters = (options?: UseFightersOptions) => {
  const [fighters, setFighters] = useState<RankedFighter[]>([]);
  const [fighter, setFighter] = useState<RankedFighter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFighters = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Check if we can use cached data
        if (!options?.skipCache) {
          // Single fighter by ID
          if (options?.id && isCacheValid(cache.byId[options.id])) {
            const cachedFighter = cache.byId[options.id].data;
            setFighter(cachedFighter);
            setFighters(cachedFighter ? [cachedFighter] : []);
            setIsLoading(false);
            return;
          }
          
          // Fighters by division
          if (options?.division && isCacheValid(cache.byDivision[options.division])) {
            const cachedFighters = cache.byDivision[options.division].data;
            setFighters(cachedFighters);
            setFighter(null);
            setIsLoading(false);
            return;
          }
          
          // Champions
          if (options?.champions && isCacheValid(cache.champions)) {
            setFighters(cache.champions!.data);
            setFighter(null);
            setIsLoading(false);
            return;
          }
          
          // Search results
          if (options?.search && isCacheValid(cache.searchResults[options.search])) {
            setFighters(cache.searchResults[options.search].data);
            setFighter(null);
            setIsLoading(false);
            return;
          }
          
          // All fighters
          if (!options?.id && !options?.division && !options?.search && 
              !options?.champions && !options?.p4p && isCacheValid(cache.allFighters)) {
            setFighters(cache.allFighters!.data);
            setFighter(null);
            setIsLoading(false);
            return;
          }
        }
        
        // Build the API URL with query parameters
        const queryParams = new URLSearchParams();
        
        if (options?.division) {
          queryParams.set('division', options.division);
        }
        
        if (options?.id) {
          queryParams.set('id', options.id);
        }
        
        if (options?.search) {
          queryParams.set('search', options.search);
        }
        
        if (options?.champions) {
          queryParams.set('champions', 'true');
        }
        
        if (options?.p4p) {
          queryParams.set('p4p', options.p4p);
        }
        
        if (!options?.id && !options?.division && !options?.search && 
            !options?.champions && !options?.p4p) {
          queryParams.set('all', 'true');
        }
        
        const url = `/api/ufc-rankings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch fighters: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        if (options?.id) {
          // Single fighter response
          setFighter(data);
          setFighters([data]);
          
          // Update cache
          cache.byId[options.id] = {
            data,
            timestamp: Date.now()
          };
        } else if (options?.division) {
          // Division response with fighters array
          const divisionFighters = data.fighters || [];
          setFighters(divisionFighters);
          setFighter(null);
          
          // Update cache
          cache.byDivision[options.division] = {
            data: divisionFighters,
            timestamp: Date.now()
          };
        } else if (options?.search) {
          // Search results are returned directly as an array
          setFighters(Array.isArray(data) ? data : []);
          setFighter(null);
          
          // Update cache
          cache.searchResults[options.search] = {
            data: Array.isArray(data) ? data : [],
            timestamp: Date.now()
          };
        } else if (options?.champions) {
          // Champions are returned directly as an array
          setFighters(Array.isArray(data) ? data : []);
          setFighter(null);
          
          // Update cache
          cache.champions = {
            data: Array.isArray(data) ? data : [],
            timestamp: Date.now()
          };
        } else if (options?.p4p) {
          // P4P rankings might have mens and womens properties
          const p4pFighters = [];
          if (data.mens) p4pFighters.push(...data.mens);
          if (data.womens) p4pFighters.push(...data.womens);
          setFighters(p4pFighters);
          setFighter(null);
        } else {
          // All fighters response with fighters array
          const allFighters = data.fighters || [];
          setFighters(allFighters);
          setFighter(null);
          
          // Update cache
          cache.allFighters = {
            data: allFighters,
            timestamp: Date.now()
          };
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setFighters([]);
        setFighter(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFighters();
  }, [
    options?.division,
    options?.id,
    options?.search,
    options?.champions,
    options?.p4p,
    options?.skipCache
  ]);
  
  return {
    fighters,
    fighter,
    isLoading,
    error,
    clearCache: () => {
      // Helper function to clear specific cache or all cache
      if (options?.id) {
        delete cache.byId[options.id];
      } else if (options?.division) {
        delete cache.byDivision[options.division];
      } else if (options?.search) {
        delete cache.searchResults[options.search];
      } else if (options?.champions) {
        delete cache.champions;
      } else {
        // Clear all cache
        cache.allFighters = undefined;
        cache.byDivision = {};
        cache.byId = {};
        cache.champions = undefined;
        cache.searchResults = {};
      }
    }
  };
};

// Keeping this for backwards compatibility
export const useAddFighter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // This function is deprecated as we're now using a static database
  const addFighter = async (fighterData: any) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      setError("Adding fighters is no longer supported. The UFC fighters database is now read-only.");
      return null;
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

// Clear all cache (useful for when rankings are updated)
export const clearFightersCache = () => {
  cache.allFighters = undefined;
  cache.byDivision = {};
  cache.byId = {};
  cache.champions = undefined;
  cache.searchResults = {};
};
