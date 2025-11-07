/**
 * @fileoverview TanStack Query Options for WS-Dottie
 *
 * This module provides TanStack Query configuration utilities for WS-Dottie,
 * including cache strategies optimized for different types of transportation
 * data. It defines four core cache strategies that cover all transportation
 * API use cases.
 */

/**
 * Cache strategy configurations for different data update frequencies
 *
 * These strategies define how frequently data should be refreshed based on
 * nature of the transportation data. Each strategy includes appropriate
 * stale time, garbage collection time, refetch intervals, and retry settings.
 *
 * The four core strategies cover all transportation API use cases:
 * - REALTIME: For real-time data (5-second updates) - vessel locations, traffic flow
 * - FREQUENT: For frequently updated data (5-minute updates) - alerts, weather
 * - MODERATE: For moderately updated data (hourly updates) - mountain passes, travel times
 * - STATIC: For rarely changing data (daily updates) - terminals, schedules, fares
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
