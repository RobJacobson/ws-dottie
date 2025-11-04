/**
 * @fileoverview TanStack Query Options for WS-Dottie
 *
 * This module provides TanStack Query configuration utilities for WS-Dottie,
 * including cache strategies optimized for different types of transportation
 * data and query options creation functions. It defines four core cache
 * strategies that cover all transportation API use cases.
 */

import { queryOptions } from "@tanstack/react-query";

import type { CacheStrategy } from "@/shared/types";

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

/**
 * Creates TanStack Query options with the specified cache strategy
 *
 * This function creates a query options factory that can be used with
 * TanStack Query hooks. It combines the API function, query key, and
 * cache strategy to create properly configured query options.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param apiFunction - The API function to call for data fetching
 * @param queryKey - Base query key array (params will be appended)
 * @param cacheStrategy - Cache strategy to use for this query
 * @returns Function that accepts parameters and returns query options
 * @example
 * ```typescript
 * const useScheduleQuery = createQueryOptions(
 *   getSchedule,
 *   ["wsf-schedule", "get-schedule"],
 *   "FREQUENT"
 * );
 * const queryOptions = useScheduleQuery({ terminalId: 1 });
 * ```
 */
export function createQueryOptions<TInput, TOutput>(
  apiFunction: (params: TInput) => Promise<TOutput>,
  queryKey: string[],
  cacheStrategy: CacheStrategy
) {
  return (params: TInput) =>
    queryOptions({
      queryKey: [...queryKey, params],
      queryFn: () => apiFunction(params),
      ...cacheStrategies[cacheStrategy],
    });
}
