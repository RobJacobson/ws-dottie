// WSF API Caching Configuration
// Defines caching strategies for different types of data based on update frequency

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

/**
 * Caching configuration for frequently updated data (every few seconds to minutes)
 * Examples: Vessel locations, terminal sailing space, wait times
 */
export const FREQUENT_UPDATE_CONFIG = {
  // Data is considered stale after 30 seconds
  staleTime: 30 * SECOND,
  // Keep in cache for 2 minutes
  gcTime: 2 * MINUTE,
  // Refetch every 5 seconds when component is active
  refetchInterval: 5 * SECOND,
  // Refetch when window regains focus
  refetchOnWindowFocus: true,
  // Retry up to 3 times with exponential backoff
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Caching configuration for infrequently updated data (daily to weekly)
 * Examples: Terminal info, vessel specs, routes, schedules, wait times
 *
 * Since this data is invalidated by cache flush dates when it changes,
 * we can cache it for much longer periods to reduce API calls and improve performance.
 */
export const INFREQUENT_UPDATE_CONFIG = {
  // Data is considered stale after 1 week (since cache flush will invalidate if it changes)
  staleTime: 1 * WEEK,
  // Keep in cache for 1 month (aggressive caching since cache flush handles invalidation)
  gcTime: 1 * MONTH,
  // No automatic refetch interval - rely on cache flush invalidation
  refetchInterval: false,
  // Refetch when window regains focus (but only if stale)
  refetchOnWindowFocus: true,
  // Retry up to 5 times with exponential backoff
  retry: 5,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Caching configuration for cache flush date queries
 * These are used to invalidate other queries when data changes
 */
export const CACHE_FLUSH_CONFIG = {
  // Data is considered stale after 5 minutes
  staleTime: 5 * MINUTE,
  // Keep in cache for 10 minutes
  gcTime: 10 * MINUTE,
  // Refetch every 2 minutes to check for updates
  refetchInterval: 2 * MINUTE,
  // Refetch when window regains focus
  refetchOnWindowFocus: true,
  // Retry up to 5 times with exponential backoff
  retry: 5,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Helper function to create query options with frequent update configuration
 */
export const createFrequentUpdateOptions = (additionalOptions = {}) => ({
  ...FREQUENT_UPDATE_CONFIG,
  ...additionalOptions,
});

/**
 * Helper function to create query options with infrequent update configuration
 */
export const createInfrequentUpdateOptions = (additionalOptions = {}) => ({
  ...INFREQUENT_UPDATE_CONFIG,
  ...additionalOptions,
});

/**
 * Helper function to create query options with cache flush configuration
 */
export const createCacheFlushOptions = (additionalOptions = {}) => ({
  ...CACHE_FLUSH_CONFIG,
  ...additionalOptions,
});
