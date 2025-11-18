/**
 * @fileoverview Cache Strategy Configurations
 *
 * Cache strategy configurations for different data update frequencies.
 * These are used by React Query hooks to determine caching behavior.
 */

export const cacheStrategies = {
  REALTIME: {
    staleTime: 5 * 1000, // 5 seconds
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 5 * 1000, // 5 seconds
    retry: 2,
    retryDelay: 5 * 1000, // 5 seconds
  },
  FREQUENT: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 5 * 1000, // 5 seconds
  },
  MODERATE: {
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    refetchInterval: 60 * 60 * 1000, // 1 hour
    retry: 3,
    retryDelay: 60 * 1000, // 1 minute
  },
  STATIC: {
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    gcTime: 2 * 24 * 60 * 60 * 1000, // 2 days
    refetchInterval: 24 * 60 * 60 * 1000, // 1 day
    retry: 2,
    retryDelay: 5 * 1000, // 5 seconds
  },
} as const;
