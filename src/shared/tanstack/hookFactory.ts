/**
 * Hook Factory for TanStack Query
 *
 * This module provides factory functions that create properly typed React Query hooks
 * with minimal boilerplate. These factories are slim wrappers around TanStack Query's
 * `useQuery` that eliminate repetitive code while maintaining full compatibility with
 * all TanStack Query features and options.
 *
 * ## Factory Pattern Benefits
 *
 * The factory pattern reduces boilerplate from 15+ lines per hook to just 3-5 lines,
 * while preserving the ability to override any TanStack Query option. This means
 * developers can use familiar TanStack Query patterns like `staleTime`, `refetchInterval`,
 * `enabled`, etc. exactly as they would with the standard `useQuery` hook. The factories
 * handle common patterns like query key generation, options merging, and type inference
 * automatically, allowing developers to focus on their application logic rather than
 * repetitive hook setup code.
 *
 * ## WSDOT vs WSF Distinction
 *
 * The library provides two specialized factory functions to handle different caching
 * requirements. WSDOT APIs use standard TanStack Query caching with periodic refetching
 * based on time intervals (e.g., every 5 minutes). WSF APIs, however, have a unique
 * requirement: they need to automatically refetch data when the underlying data changes,
 * not just on a time schedule. This is achieved through a `cacheFlushDate` endpoint that
 * returns a timestamp indicating when the data was last updated.
 *
 * ## Caching Strategies
 *
 * The factories support two caching strategies that can be used independently or
 * combined. The first strategy is periodic fetching on an interval, which works for
 * both WSDOT and WSF APIs. This is the standard TanStack Query approach where data
 * is refetched every X minutes regardless of whether it has changed. The second
 * strategy, available only for WSF APIs, is automatic refetching when data changes.
 * This strategy polls the `cacheFlushDate` endpoint every 5 minutes and compares the
 * returned timestamp with the previous value. If the timestamp has changed, it
 * indicates that the underlying data has been updated, and the hook automatically
 * invalidates the cache and triggers a refetch. This provides more efficient data
 * synchronization by only refetching when necessary, while still maintaining a
 * periodic fallback to ensure data freshness.
 *
 * ## Type Safety and Extensibility
 *
 * All factory functions provide full TypeScript support with automatic type inference
 * from the API functions. The returned hooks accept the same parameters as standard
 * `useQuery` hooks, including all TanStack Query options. This means developers can
 * easily extend or override the default behavior by passing additional options,
 * making the factories both powerful and flexible while maintaining the familiar
 * TanStack Query developer experience.
 */
/** biome-ignore-all lint/suspicious/noExplicitAny: Needed for hook factories */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { TanStackOptions } from "./types";

// ============================================================================
// HOOK FACTORIES
// ============================================================================

/**
 * Configuration for creating WSDOT API hooks with standard caching behavior.
 *
 * WSDOT APIs use standard TanStack Query caching with periodic refetching
 * based on time intervals. This configuration is simpler than WSF hooks
 * since it doesn't require cache invalidation logic.
 *
 * @template TApiFn - The API function type that returns a Promise
 * @template TParams - The parameters type for the API function (defaults to first parameter)
 *
 * @example
 * ```typescript
 * export const useHighwayAlerts = createUseQueryWsdot({
 *   queryFn: getHighwayAlerts,
 *   queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
 *   defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
 * });
 * ```
 */
export interface WsdotHookConfig<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
> {
  /** The API function to call. This function should accept parameters and return a Promise. */
  queryFn: TApiFn;

  /**
   * Query key prefix as an array of strings. The factory will automatically append
   * the stringified parameters to create the full query key.
   *
   * @example ["wsdot", "highway-alerts", "getHighwayAlerts"]
   */
  queryKeyPrefix: readonly string[];

  /**
   * Default TanStack Query options. These will be merged with any options
   * passed to the hook, with hook options taking precedence.
   *
   * @example tanstackQueryOptions.MINUTE_UPDATES
   */
  defaultOptions?: TanStackOptions<Awaited<ReturnType<TApiFn>>, Error>;
}

/**
 * Configuration for creating WSF API hooks with automatic cache invalidation.
 *
 * WSF APIs require automatic refetching when data changes, not just periodic
 * updates. This is achieved by polling a `cacheFlushDate` endpoint that returns
 * a timestamp indicating when the data was last updated.
 *
 * @template TApiFn - The API function type that returns a Promise
 * @template TParams - The parameters type for the API function (defaults to first parameter)
 *
 * @example
 * ```typescript
 * export const useVesselLocations = createUseQueryWsf({
 *   queryFn: getVesselLocations,
 *   queryKeyPrefix: ["wsf", "vessels", "locations"],
 *   defaultOptions: tanstackQueryOptions.REALTIME_UPDATES,
 *   getCacheFlushDate: getCacheFlushDateVessels,
 *   pollingInterval: 5 * 60 * 1000, // 5 minutes (default)
 * });
 * ```
 */
export interface WsfHookConfig<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
> {
  /** The API function to call. This function should accept parameters and return a Promise. */
  queryFn: TApiFn;

  /**
   * Query key prefix as an array of strings. The factory will automatically append
   * the stringified parameters to create the full query key.
   *
   * @example ["wsf", "vessels", "locations", "getVesselLocations"]
   */
  queryKeyPrefix: readonly string[];

  /**
   * Default TanStack Query options. These will be merged with any options
   * passed to the hook, with hook options taking precedence.
   *
   * @example tanstackQueryOptions.REALTIME_UPDATES
   */
  defaultOptions?: TanStackOptions<Awaited<ReturnType<TApiFn>>, Error>;

  /**
   * Function that returns the cache flush date for automatic invalidation.
   * This function should return a Promise that resolves to a Date or null.
   * The hook will poll this function at the specified interval to detect data changes.
   *
   * @returns Promise<Date | null> - The timestamp when data was last updated, or null if unavailable
   */
  getCacheFlushDate: () => Promise<Date | null>;

  /**
   * Polling interval for cache invalidation checks in milliseconds.
   * Defaults to 5 minutes (300,000ms). Set to 0 to disable auto-update.
   *
   * @example 5 * 60 * 1000 // 5 minutes
   * @example 0 // Disable auto-update
   */
  pollingInterval?: number;
}

/**
 * Creates a React Query hook for WSDOT APIs with standard caching behavior.
 *
 * This factory creates hooks that use standard TanStack Query caching with periodic
 * refetching based on time intervals. The returned hook accepts the same parameters
 * as a standard `useQuery` hook and can be extended or overridden with any TanStack
 * Query option.
 *
 * @template TApiFn - The API function type that returns a Promise
 * @template TParams - The parameters type for the API function (defaults to first parameter)
 *
 * @param config - Configuration object containing the API function, query key prefix, and default options
 *
 * @returns A React Query hook that accepts parameters and optional TanStack Query options
 *
 * @example
 * ```typescript
 * // Create the hook
 * export const useHighwayAlerts = createUseQueryWsdot({
 *   queryFn: getHighwayAlerts,
 *   queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
 *   defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
 * });
 *
 * // Use the hook with standard TanStack Query options
 * const { data, isLoading } = useHighwayAlerts(
 *   { region: "Northwest" },
 *   { staleTime: 30000, refetchInterval: 60000 }
 * );
 * ```
 */
export function createUseQueryWsdot<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(config: WsdotHookConfig<TApiFn, TParams>) {
  const { queryFn, queryKeyPrefix, defaultOptions = {} } = config;

  return (
    params: TParams,
    options?: TanStackOptions<Awaited<ReturnType<TApiFn>>, Error>
  ) => {
    const queryKey = [...queryKeyPrefix, JSON.stringify(params)];

    return useQuery({
      queryKey,
      queryFn: () => queryFn(params),
      ...defaultOptions,
      ...options,
    });
  };
}

/**
 * Creates a React Query hook for WSF APIs with automatic cache invalidation.
 *
 * This factory creates hooks that automatically refetch data when the underlying
 * data changes, in addition to supporting standard periodic refetching. The hook
 * polls a `cacheFlushDate` endpoint every 5 minutes to detect data changes and
 * automatically invalidates the cache when updates are detected.
 *
 * The returned hook accepts the same parameters as a standard `useQuery` hook and
 * can be extended or overridden with any TanStack Query option, including the
 * ability to disable automatic invalidation by setting `enabled: false`.
 *
 * @template TApiFn - The API function type that returns a Promise
 * @template TParams - The parameters type for the API function (defaults to first parameter)
 *
 * @param config - Configuration object containing the API function, query key prefix, default options, and cache flush function
 *
 * @returns A React Query hook that accepts parameters and optional TanStack Query options
 *
 * @example
 * ```typescript
 * // Create the hook
 * export const useVesselLocations = createUseQueryWsf({
 *   queryFn: getVesselLocations,
 *   queryKeyPrefix: ["wsf", "vessels", "locations"],
 *   defaultOptions: tanstackQueryOptions.REALTIME_UPDATES,
 *   getCacheFlushDate: getCacheFlushDateVessels,
 * });
 *
 * // Use the hook with automatic invalidation enabled
 * const { data, isLoading } = useVesselLocations({ vesselId: 123 });
 *
 * // Use the hook with automatic invalidation disabled
 * const { data, isLoading } = useVesselLocations(
 *   { vesselId: 123 },
 *   { enabled: false }
 * );
 * ```
 */
export function createUseQueryWsf<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(config: WsfHookConfig<TApiFn, TParams>) {
  const {
    queryFn,
    queryKeyPrefix,
    defaultOptions = {},
    getCacheFlushDate,
    pollingInterval = 5 * 60 * 1000, // Default to 5 minutes
  } = config;

  return (
    params: TParams,
    options?: TanStackOptions<Awaited<ReturnType<TApiFn>>, Error>
  ) => {
    const queryKey = [...queryKeyPrefix, JSON.stringify(params)];

    // Main query using React Query
    const queryResult = useQuery({
      queryKey,
      queryFn: () => queryFn(params),
      ...defaultOptions,
      ...options,
    });

    // Auto-update logic
    useAutoUpdate(queryKey, getCacheFlushDate, pollingInterval);

    return queryResult;
  };
}

// ============================================================================
// AUTO-UPDATE HOOK
// ============================================================================

/**
 * Internal hook that handles automatic cache invalidation for WSF APIs.
 *
 * This hook polls the cache flush endpoint every 5 minutes to detect data changes
 * and automatically invalidates the cache when updates are detected. It uses a
 * ref-based approach to track the previous update time and only invalidates when
 * the timestamp has actually changed.
 *
 * The hook is designed to fail gracefully - if the cache flush endpoint fails,
 * it will continue polling without throwing errors, ensuring that the main query
 * functionality remains unaffected.
 *
 * @param queryKey - The query key to invalidate when data changes
 * @param getCacheFlushDate - Function that returns the current cache flush date
 * @param pollingInterval - Polling interval in milliseconds
 *
 * @example
 * ```typescript
 * // This is called internally by createUseQueryWsf
 * useAutoUpdate(
 *   ["wsf", "vessels", "locations", JSON.stringify(params)],
 *   getCacheFlushDateVessels,
 *   5 * 60 * 1000 // 5 minutes
 * );
 * ```
 */
function useAutoUpdate(
  queryKey: readonly string[],
  getCacheFlushDate: () => Promise<Date | null>,
  pollingInterval: number
) {
  const queryClient = useQueryClient();

  // Track the last update time to detect changes
  const previousLastUpdateTime = useRef<Date | null>(null);

  // Reference to the polling interval for cleanup
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-update logic using useEffect
  useEffect(() => {
    /**
     * Polls the last update time endpoint to detect data changes
     * and invalidates the cache when updates are detected
     */
    const pollLastUpdateTime = async () => {
      try {
        const currentLastUpdateTime = await getCacheFlushDate();

        // Early return if no previous time to compare against
        if (!previousLastUpdateTime.current || !currentLastUpdateTime) {
          previousLastUpdateTime.current = currentLastUpdateTime;
          return;
        }

        // Early return if times are the same (no change detected)
        if (
          previousLastUpdateTime.current.getTime() ===
          currentLastUpdateTime.getTime()
        ) {
          return;
        }

        // Last update time changed - invalidate all queries for this endpoint
        queryClient.invalidateQueries({ queryKey });

        // Update our reference to the new last update time
        previousLastUpdateTime.current = currentLastUpdateTime;
      } catch (error) {
        // Silently fail - cache invalidation is not critical for functionality
        // Log error for debugging but don't throw
        console.error(
          `Error polling cache flush date for query key: ${queryKey.join(
            ","
          )}. Error:`,
          error
        );
      }
    };

    // Perform initial check immediately
    pollLastUpdateTime();

    // Set up periodic polling at the specified interval
    intervalRef.current = setInterval(pollLastUpdateTime, pollingInterval);

    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getCacheFlushDate, queryClient, queryKey, pollingInterval]);
}
