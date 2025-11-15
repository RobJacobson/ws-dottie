/**
 * @fileoverview Cache Strategy Definitions
 *
 * Centralized cache strategy configurations for different data update frequencies.
 */

/**
 * Cache strategy configurations for different data update frequencies
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

/**
 * Cache strategies for different data update frequencies
 *
 * These strategies define how frequently data should be refreshed based on
 * the nature of the transportation data. Each strategy includes appropriate
 * stale time, garbage collection time, and refetch intervals.
 */
export type CacheStrategy =
  | "REALTIME" // Real-time data (5-second updates) - traffic conditions, alerts
  | "FREQUENT" // Frequently updated data (5-minute updates) - schedules, delays
  | "MODERATE" // Moderately updated data (hourly updates) - weather, conditions
  | "STATIC"; // Static data (daily updates) - terminals, vessels, routes
