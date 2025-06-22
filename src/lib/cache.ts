/**
 * UFC-Predicts Caching Service
 * 
 * A comprehensive Redis-based caching layer for improved performance and reduced API calls.
 * Uses Upstash Redis for serverless compatibility and provides fallbacks for offline development.
 */

import { Redis } from '@upstash/redis';

// Environment variables
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const CACHE_ENABLED = process.env.ENABLE_CACHE !== 'false';
const DEFAULT_TTL = 3600; // 1 hour in seconds

// Cache namespaces to prevent key collisions
export enum CacheNamespace {
  FIGHTER = 'fighter',
  FIGHTERS = 'fighters',
  EVENT = 'event',
  EVENTS = 'events',
  FIGHT = 'fight',
  FIGHTS = 'fights',
  RANKING = 'ranking',
  RANKINGS = 'rankings',
  PREDICTION = 'prediction',
  NEWS = 'news',
  USER = 'user',
}

// Initialize Redis client if credentials are available
let redisClient: Redis | null = null;

if (REDIS_URL && REDIS_TOKEN && CACHE_ENABLED) {
  try {
    redisClient = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    console.log('Redis client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Redis client:', error);
    redisClient = null;
  }
} else {
  console.warn(
    'Redis client not initialized: missing credentials or cache disabled'
  );
}

/**
 * In-memory cache for fallback when Redis is unavailable
 * Limited size, simple LRU eviction
 */
class MemoryCache {
  private cache: Map<string, { value: any; expires: number }>;
  private maxSize: number;

  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    
    const now = Date.now();
    if (item.expires < now) {
      this.delete(key);
      return null;
    }
    
    // Move to end of Map to implement LRU
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }

  set(key: string, value: any, ttl: number): void {
    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl * 1000,
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  async keys(pattern: string): Promise<string[]> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return Array.from(this.cache.keys()).filter(key => regex.test(key));
  }
}

// Initialize memory cache for fallback
const memoryCache = new MemoryCache(500); // Limit to 500 items

/**
 * Formats a cache key with namespace and optional parameters
 */
export function formatCacheKey(
  namespace: CacheNamespace,
  id?: string | number,
  params?: Record<string, any>
): string {
  let key = `ufc:${namespace}`;
  
  if (id) {
    key += `:${id}`;
  }
  
  if (params && Object.keys(params).length > 0) {
    // Sort keys for consistent cache keys regardless of object property order
    const sortedParams = Object.keys(params).sort().reduce(
      (result, key) => {
        if (params[key] !== undefined && params[key] !== null) {
          result[key] = params[key];
        }
        return result;
      },
      {} as Record<string, any>
    );
    
    const paramsString = Object.entries(sortedParams)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    
    if (paramsString) {
      key += `:${paramsString}`;
    }
  }
  
  return key;
}

/**
 * Gets a value from cache
 * @param key Cache key
 * @returns Cached value or null if not found
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    if (redisClient) {
      const value = await redisClient.get<T>(key);
      return value;
    }
    
    // Fallback to memory cache
    return memoryCache.get(key);
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    // Fallback to memory cache on Redis error
    return memoryCache.get(key);
  }
}

/**
 * Sets a value in cache with TTL
 * @param key Cache key
 * @param value Value to cache
 * @param ttl Time to live in seconds (default: 1 hour)
 */
export async function setCache(
  key: string,
  value: any,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  try {
    // Always set in memory cache as fallback
    memoryCache.set(key, value, ttl);
    
    if (redisClient) {
      await redisClient.setex(key, ttl, value);
    }
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
    // Already set in memory cache, so no additional fallback needed
  }
}

/**
 * Deletes a value from cache
 * @param key Cache key
 */
export async function deleteCache(key: string): Promise<void> {
  try {
    // Always delete from memory cache
    memoryCache.delete(key);
    
    if (redisClient) {
      await redisClient.del(key);
    }
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
  }
}

/**
 * Invalidates all cache entries matching a pattern
 * @param pattern Pattern to match (e.g., "ufc:fighters:*")
 */
export async function invalidateCache(pattern: string): Promise<void> {
  try {
    if (redisClient) {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await Promise.all(keys.map(key => redisClient!.del(key)));
        console.log(`Invalidated ${keys.length} cache keys matching ${pattern}`);
      }
    }
    
    // Also invalidate in memory cache
    const memKeys = await memoryCache.keys(pattern);
    memKeys.forEach(key => memoryCache.delete(key));
    
  } catch (error) {
    console.error(`Cache invalidation error for pattern ${pattern}:`, error);
  }
}

/**
 * Invalidates cache by namespace
 * @param namespace Cache namespace to invalidate
 */
export async function invalidateNamespace(namespace: CacheNamespace): Promise<void> {
  await invalidateCache(`ufc:${namespace}:*`);
}

/**
 * Warms up cache with data that will be frequently accessed
 * @param namespace Cache namespace
 * @param id Optional specific ID to warm
 * @param fetcher Function that returns data to cache
 * @param ttl Optional TTL override
 */
export async function warmCache<T>(
  namespace: CacheNamespace,
  id: string | null,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const key = formatCacheKey(namespace, id || undefined);
  
  try {
    const data = await fetcher();
    await setCache(key, data, ttl);
    return data;
  } catch (error) {
    console.error(`Cache warming error for ${key}:`, error);
    throw error; // Rethrow to handle at caller level
  }
}

/**
 * Gets data with caching
 * Tries cache first, falls back to fetcher function and updates cache
 * 
 * @param namespace Cache namespace
 * @param id Optional specific ID
 * @param params Optional parameters for the key
 * @param fetcher Function that returns data if not in cache
 * @param ttl Optional TTL override
 */
export async function getCached<T>(
  namespace: CacheNamespace,
  id: string | null | undefined,
  params: Record<string, any> | null,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const key = formatCacheKey(namespace, id || undefined, params || undefined);
  
  try {
    // Try to get from cache first
    const cached = await getCache<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    // Not in cache, fetch fresh data
    const data = await fetcher();
    
    // Store in cache for next time
    await setCache(key, data, ttl);
    
    return data;
  } catch (error) {
    console.error(`getCached error for ${key}:`, error);
    
    // If cache fails but fetcher might work, try direct fetch
    try {
      return await fetcher();
    } catch (fetchError) {
      console.error(`Fetcher also failed for ${key}:`, fetchError);
      throw fetchError; // Rethrow the fetcher error
    }
  }
}

/**
 * Clears all cache (use with caution)
 */
export async function clearCache(): Promise<void> {
  try {
    if (redisClient) {
      // In production, we'd use SCAN instead of KEYS for large datasets
      const keys = await redisClient.keys('ufc:*');
      if (keys.length > 0) {
        await Promise.all(keys.map(key => redisClient!.del(key)));
        console.log(`Cleared ${keys.length} cache keys`);
      }
    }
    
    // Clear memory cache
    memoryCache.clear();
  } catch (error) {
    console.error('Cache clear error:', error);
  }
}

/**
 * Checks if cache is healthy and working
 * @returns True if cache is working, false otherwise
 */
export async function healthCheck(): Promise<boolean> {
  if (!redisClient) return false;
  
  try {
    const testKey = 'ufc:health:check';
    await redisClient.setex(testKey, 60, 'OK');
    const result = await redisClient.get(testKey);
    return result === 'OK';
  } catch (error) {
    console.error('Cache health check failed:', error);
    return false;
  }
}

export default {
  getCache,
  setCache,
  deleteCache,
  invalidateCache,
  invalidateNamespace,
  warmCache,
  getCached,
  clearCache,
  formatCacheKey,
  healthCheck,
  CacheNamespace,
};
