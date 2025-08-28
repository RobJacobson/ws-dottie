/**
 * WSF API Caching Configuration
 *
 * Defines caching strategies for different types of data based on update frequency.
 * Optimized for ferry operations in Puget Sound with potentially spotty internet connections.
 *
 * This module provides pre-configured TanStack Query options for various data update patterns,
 * from real-time updates (every few seconds) to static data (weekly/monthly updates).
 *
 * Each strategy is carefully tuned for:
 * - Network reliability in marine environments
 * - WSF API latency characteristics (1000ms+ typical)
 * - Cache invalidation through cache flush monitoring
 * - Optimal user experience with minimal unnecessary requests
 */

// Time constants for consistent configuration
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/**
 * Pre-configured TanStack Query options for different data update frequencies
 *
 * Each strategy is optimized for specific use cases and network conditions
 * commonly encountered in ferry operations and transportation APIs.
 */
export const tanstackRefetchOptions = {
  /**
   * Real-time data updates (every few seconds to minutes)
   * Examples: Vessel locations, terminal sailing space, wait times, highway alerts
   */
  FIVE_SEC_POLLING: {
    // Data is considered stale after 5 seconds (same as refetch interval)
    staleTime: 5 * SECOND,
    // Keep in cache for 2 minutes
    gcTime: 1 * HOUR,
    // Refetch every 5 seconds when component is active
    refetchInterval: 5 * SECOND,
    // Refetch when component mounts and when window regains focus
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // Retry once with 2-second delay (fits within 5s interval)
    retry: 1,
    retryDelay: 2 * SECOND,
  },

  /**
   * Near-realtime updates (every minute)
   * Examples: moderate real-time data (vessel locations, terminal sailing space,
   * wait times, highway alerts)
   */
  ONE_MIN_POLLING: {
    // Data is considered stale after 5 minutes
    staleTime: 1 * MINUTE,
    // Keep in cache for 10 minutes
    gcTime: 1 * HOUR,
    // Refetch every 1 minute to check for updates
    refetchInterval: 1 * MINUTE,
    // Refetch when component mounts and when window regains focus
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // Retry up to 3 times with exponential backoff (5s, 10s, 20s)
    retry: 3,
    retryDelay: (attemptIndex: number) => 5 * SECOND * 2 ** attemptIndex,
  },

  /**
   * Moderate updates (every hour)
   * Examples: Schedules, fares, weather forecasts, traffic patterns
   *
   * Hybrid approach: 6-hour refetch + cache flush monitoring
   * - 6-hour refetch interval as backup for cache flush monitoring
   * - Cache flush monitoring provides immediate invalidation when data changes
   * - Balanced approach for data that changes occasionally
   * - Optimized for moderate-frequency data with automatic change detection
   */
  ONE_HOUR_POLLING: {
    // Data is considered stale after 6 hours
    staleTime: 6 * HOUR,
    // Keep in cache for 1 day
    gcTime: 1 * DAY,
    // 6-hour refetch interval as backup to cache flush monitoring
    refetchInterval: 6 * HOUR,
    // Refetch when component mounts and when window regains focus
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // Retry up to 5 times with exponential backoff (1m, 2m, 4m, 8m, 16m)
    retry: 5,
    retryDelay: (attemptIndex: number) => 1 * MINUTE * 2 ** attemptIndex,
  },

  /**
   * Infrequent updates (every day)
   * Examples: Schedule changes, fare updates, daily reports, mostly-static data

   */
  ONE_DAY_POLLING: {
    // Data is considered stale after 1 day
    staleTime: 1 * DAY,
    // Keep in cache for 2 days
    gcTime: 2 * DAY,
    // Refetch every 1 day to check for updates
    refetchInterval: 1 * DAY,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Retry up to 5 times with exponential backoff (1m, 2m, 4m, 8m, 10m)
    retry: 5,
    retryDelay: (attemptIndex: number) => 1 * MINUTE * 2 ** attemptIndex,
  },
} as const;
