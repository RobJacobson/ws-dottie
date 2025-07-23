// WSF API Caching Configuration
// Defines caching strategies for different types of data based on update frequency
// Optimized for ferry operations in Puget Sound with potentially spotty internet connections

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const tanstackQueryOptions = {
  /**
   * Real-time data updates (every few seconds to minutes)
   * Examples: Vessel locations, terminal sailing space, wait times, highway alerts
   *
   * Optimized for ferry operations:
   * - 5-second refetch interval for real-time data like vessel locations
   * - 1 retry with 2-second delay (fits within 5s interval)
   * - Conservative retry strategy for WSF API's 1000ms+ latency
   */
  REALTIME_UPDATES: {
    // Data is considered stale after 30 seconds
    staleTime: 30 * SECOND,
    // Keep in cache for 2 minutes
    gcTime: 2 * MINUTE,
    // Refetch every 5 seconds when component is active
    refetchInterval: 5 * SECOND,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Retry once with 2-second delay (fits within 5s interval)
    retry: 1,
    retryDelay: 2 * SECOND,
  },

  /**
   * Minute-level updates (every minute to few minutes)
   * Examples: Cache flush coordination, moderate real-time data
   *
   * Optimized for ferry operations:
   * - 1-minute refetch interval for infrequently updated coordination data
   * - No retries since this data changes rarely and failures are not critical
   * - Simple and efficient for cache coordination
   */
  MINUTE_UPDATES: {
    // Data is considered stale after 5 minutes
    staleTime: 5 * MINUTE,
    // Keep in cache for 10 minutes
    gcTime: 10 * MINUTE,
    // Refetch every 1 minute to check for updates
    refetchInterval: 1 * MINUTE,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // No retries - cache flush data is infrequently updated
    retry: false,
  },

  /**
   * Hourly updates (every hour to few hours)
   * Examples: Weather forecasts, traffic patterns, moderate frequency data
   *
   * Optimized for ferry operations:
   * - 1-hour refetch interval for moderately changing data
   * - 3 retries with 30s-2min delays for reliability
   * - Balanced approach for data that changes occasionally
   */
  HOURLY_UPDATES: {
    // Data is considered stale after 2 hours
    staleTime: 2 * HOUR,
    // Keep in cache for 4 hours
    gcTime: 4 * HOUR,
    // Refetch every 1 hour to check for updates
    refetchInterval: 1 * HOUR,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Retry up to 5 times with exponential backoff
    retry: 5,
    retryDelay: (attemptIndex: number) =>
      Math.min(30 * SECOND * 2 ** attemptIndex, 2 * MINUTE),
  },

  /**
   * Daily updates (every day to few days)
   * Examples: Schedule changes, fare updates, daily reports
   *
   * Optimized for ferry operations:
   * - 1-day refetch interval for daily changing data
   * - 4 retries with 1-8 minute delays for reliability
   * - Conservative approach for data that changes daily
   */
  DAILY_UPDATES: {
    // Data is considered stale after 1 day
    staleTime: 1 * DAY,
    // Keep in cache for 2 days
    gcTime: 2 * DAY,
    // Refetch every 1 day to check for updates
    refetchInterval: 1 * DAY,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Retry up to 5 times with exponential backoff
    retry: 5,
    retryDelay: (attemptIndex: number) =>
      Math.min(1 * MINUTE * 2 ** attemptIndex, 10 * MINUTE),
  },

  /**
   * Weekly updates (daily to weekly)
   * Examples: Terminal info, vessel specs, routes, schedules, fares
   *
   * Optimized for ferry operations:
   * - No automatic refetch interval - rely on cache flush invalidation
   * - 5 retries with 10s-10min delays for static data
   * - Conservative retry strategy for static data
   * - Longer retry delays to avoid unnecessary network usage
   */
  WEEKLY_UPDATES: {
    // Data is considered stale after 1 week (since cache flush will invalidate if it changes)
    staleTime: 1 * WEEK,
    // Keep in cache for 2 weeks (reduced from 1 month to avoid timeout overflow)
    gcTime: 2 * WEEK,
    // No automatic refetch interval - rely on cache flush invalidation
    refetchInterval: false,
    // Refetch when window regains focus (but only if stale)
    refetchOnWindowFocus: true,
    // Retry up to 5 times with exponential backoff (reduced for static data)
    retry: 5,
    retryDelay: (attemptIndex: number) =>
      Math.min(1 * MINUTE * 2 ** attemptIndex, 10 * MINUTE),
  },
} as const;
