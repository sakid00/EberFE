'use client';
import { useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface NavigationCacheOptions {
  cacheTime?: number; // Cache time in milliseconds
}

export const useNavigationCache = <T>(
  key: string, 
  options: NavigationCacheOptions = {}
) => {
  const { cacheTime = 5 * 60 * 1000 } = options; // Default 5 minutes
  const cache = useRef<Map<string, CacheEntry<T>>>(new Map());

  const get = (cacheKey: string): T | null => {
    const entry = cache.current.get(`${key}_${cacheKey}`);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > cacheTime;
    if (isExpired) {
      cache.current.delete(`${key}_${cacheKey}`);
      return null;
    }

    return entry.data;
  };

  const set = (cacheKey: string, data: T): void => {
    cache.current.set(`${key}_${cacheKey}`, {
      data,
      timestamp: Date.now(),
    });
  };

  const clear = (cacheKey?: string): void => {
    if (cacheKey) {
      cache.current.delete(`${key}_${cacheKey}`);
    } else {
      // Clear all entries for this key
      const keysToDelete = Array.from(cache.current.keys()).filter(k => 
        k.startsWith(`${key}_`)
      );
      keysToDelete.forEach(k => cache.current.delete(k));
    }
  };

  const has = (cacheKey: string): boolean => {
    return get(cacheKey) !== null;
  };

  return {
    get,
    set,
    clear,
    has,
  };
};

// Navigation-specific cache for common data
export const useNavigationDataCache = () => {
  const companyCache = useNavigationCache<unknown[]>('companies');
  const productCache = useNavigationCache<unknown[]>('products');
  const careerCache = useNavigationCache<unknown[]>('careers');
  const activityCache = useNavigationCache<unknown[]>('activities');

  return {
    companies: companyCache,
    products: productCache,
    careers: careerCache,
    activities: activityCache,
  };
};
