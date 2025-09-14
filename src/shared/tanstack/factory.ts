/**
 * @fileoverview Query Options Factory
 *
 * Creates standardized TanStack Query options with appropriate caching strategies.
 * Eliminates boilerplate code across all API endpoints by providing a factory
 * function that generates query options with consistent patterns.
 *
 * This factory provides a consistent way to create TanStack Query options
 * that use standardized caching strategies. It eliminates the repetitive
 * pattern of manually defining queryKey, queryFn, staleTime, gcTime,
 * refetchInterval, retry, and retryDelay across all API endpoints.
 *
 * @example
 * ```typescript
 * // Create query options for a real-time API
 * const borderCrossingsOptions = createQueryOptions({
 *   apiFunction: getBorderCrossings,
 *   queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
 *   cacheStrategy: 'REALTIME_UPDATES',
 * });
 *
 * // Create query options for a static API
 * const terminalsOptions = createQueryOptions({
 *   apiFunction: getTerminals,
 *   queryKey: ["wsf", "terminals", "getTerminals"],
 *   cacheStrategy: 'DAILY_STATIC',
 * });
 * ```
 */

import { queryOptions } from "@tanstack/react-query";
import {
  FIVE_MINUTES,
  FIVE_SECONDS,
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_WEEK,
  SIX_HOURS,
  THIRTY_SECONDS,
  TWO_DAYS,
} from "./constants";

/**
 * Cache strategy configurations for different types of data
 *
 * Each strategy defines appropriate staleTime, gcTime, refetchInterval,
 * retry, and retryDelay values based on the expected data update frequency.
 * These strategies are optimized for transportation APIs with varying update patterns.
 */
export const tanstackRefetchOptions = {
  /** Real-time data that updates frequently (5-second intervals) */
  REALTIME_UPDATES: {
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 1,
    retryDelay: FIVE_SECONDS,
  },

  /** Data that updates every minute (traffic, wait times) */
  MINUTE_UPDATES: {
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 0,
    retryDelay: FIVE_SECONDS,
  },

  /** Data that updates every 5 minutes (frequent updates) */
  FIVE_MINUTE_UPDATES: {
    staleTime: FIVE_MINUTES,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_MINUTES,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  },

  /** Data that updates hourly (moderate frequency) */
  HOURLY_UPDATES: {
    staleTime: ONE_HOUR,
    gcTime: SIX_HOURS,
    refetchInterval: ONE_HOUR,
    retry: 5,
    retryDelay: THIRTY_SECONDS,
  },

  /** Data that updates daily (low frequency) */
  DAILY_UPDATES: {
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 5,
    retryDelay: ONE_MINUTE,
  },

  /** Static data that rarely changes (weekly refresh) */
  DAILY_STATIC: {
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 5,
    retryDelay: FIVE_SECONDS,
  },

  /** Very static data that changes infrequently (weekly refresh) */
  WEEKLY_STATIC: {
    staleTime: ONE_WEEK,
    gcTime: TWO_DAYS,
    refetchInterval: false,
    retry: 5,
    retryDelay: FIVE_SECONDS,
  },

  /** No caching strategy (for testing or special cases) */
  NONE: {
    staleTime: 0,
    gcTime: 0,
    refetchInterval: false,
    retry: 0,
    retryDelay: FIVE_SECONDS,
  },
} as const;

/**
 * Configuration interface for creating query options
 *
 * @template TInput - The input parameters type for the API function
 * @template TOutput - The output response type from the API function
 */
export interface QueryOptionsConfig<TInput, TOutput> {
  /** The API function to call when the query executes */
  apiFunction: (params: TInput) => Promise<TOutput>;
  /** Base query key array (params will be appended automatically) */
  queryKey: string[];
  /** Cache strategy to use for this query */
  cacheStrategy: keyof typeof tanstackRefetchOptions;
}

/**
 * Creates standardized TanStack Query options with appropriate caching strategies
 *
 * This factory function eliminates boilerplate by providing a consistent way to
 * create query options that use standardized caching strategies. The returned
 * function will:
 *
 * - Accept typed input parameters
 * - Generate appropriate query keys with parameters appended
 * - Use the specified API function as the queryFn
 * - Apply the appropriate caching strategy based on data update frequency
 * - Return properly typed TanStack Query options
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param config - Configuration object containing API function, query key, and cache strategy
 * @returns A function that accepts parameters and returns TanStack Query options
 *
 * @example
 * ```typescript
 * // For real-time data (border crossings)
 * const borderCrossingsOptions = createQueryOptions({
 *   apiFunction: getBorderCrossings,
 *   queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
 *   cacheStrategy: 'REALTIME_UPDATES',
 * });
 *
 * // For static data (terminals)
 * const terminalsOptions = createQueryOptions({
 *   apiFunction: getTerminals,
 *   queryKey: ["wsf", "terminals", "getTerminals"],
 *   cacheStrategy: 'DAILY_STATIC',
 * });
 *
 * // Usage with parameters
 * const options = borderCrossingsOptions({});
 * const { data } = useQuery(options);
 * ```
 */
export function createQueryOptions<TInput, TOutput>(
  config: QueryOptionsConfig<TInput, TOutput>
) {
  return (params: TInput) =>
    queryOptions({
      queryKey: [...config.queryKey, params],
      queryFn: () => config.apiFunction(params),
      ...tanstackRefetchOptions[config.cacheStrategy],
    });
}
