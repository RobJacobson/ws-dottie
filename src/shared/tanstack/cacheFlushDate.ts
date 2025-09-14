import type { UseQueryOptions } from "@tanstack/react-query";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { fetchZod } from "@/shared/fetching";
import { FIVE_MINUTES, FIVE_SECONDS, ONE_DAY } from "./constants";
import { zWsdotDate } from "./validation";

/**
 * @fileoverview WSF Cache Flush Date utilities
 *
 * This module provides utilities for managing WSF API cache invalidation based on
 * cache flush dates. WSF APIs provide cache flush date endpoints that indicate
 * when data has been updated, allowing for intelligent cache invalidation.
 */

// ============================================================================
// Types
// ============================================================================

/** WSF API types that support cache flush date functionality */
export type WsfApiType = "fares" | "vessels" | "terminals" | "schedule";

/** Cache flush date returned by WSF APIs */
export type WsfCacheFlushDate = Date;

/** Parameters for cache flush date requests (currently none required) */
export type WsfCacheFlushDateParams = Record<string, never>;

// ============================================================================
// Schema
// ============================================================================

/** Zod schema for cache flush date request parameters */
export const wsfCacheFlushDateParamsSchema = z.object({});

/** Zod schema for cache flush date response validation */
export const wsfCacheFlushDateSchema = zWsdotDate();

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Creates a cache flush date factory for a specific WSF API type
 *
 * @param apiType - The WSF API type to create cache flush date utilities for
 * @returns Object containing API function, React hook, endpoint, and query key
 */
export const createWsfCacheFlushDate = (apiType: WsfApiType) => {
  const endpoint = `/ferries/api/${apiType}/rest/cacheflushdate`;
  const queryKey = ["wsf", apiType, "cacheFlushDate"];

  // ============================================================================
  // API Function
  // ============================================================================

  /**
   * Fetches the cache flush date for the specified WSF API type
   *
   * @param params - Request parameters (currently unused)
   * @returns Promise resolving to the cache flush date
   */
  const getCacheFlushDate = async (
    params: WsfCacheFlushDateParams = {}
  ): Promise<WsfCacheFlushDate> => {
    return fetchZod({
      endpoint,
      inputSchema: wsfCacheFlushDateParamsSchema,
      outputSchema: wsfCacheFlushDateSchema,
      params,
    });
  };

  // ============================================================================
  // TanStack Query Hook
  // ============================================================================

  /**
   * React hook for fetching cache flush date with TanStack Query
   *
   * @param params - Request parameters (currently unused)
   * @param options - Additional TanStack Query options
   * @returns TanStack Query result with cache flush date data
   */
  const useCacheFlushDate = (
    params: WsfCacheFlushDateParams = {},
    options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
  ) => {
    return useQuery({
      queryKey: [...queryKey, params],
      queryFn: () => getCacheFlushDate(params),
      staleTime: FIVE_MINUTES,
      gcTime: ONE_DAY,
      refetchInterval: FIVE_MINUTES,
      retry: 3,
      retryDelay: FIVE_SECONDS,
      ...options,
    });
  };

  return {
    getCacheFlushDate,
    useCacheFlushDate,
    endpoint,
    queryKey,
  };
};

// ============================================================================
// Factory Function (exported for use by individual client files)
// ============================================================================

// The createWsfCacheFlushDate factory function is available for individual
// client files to create their own cache flush date functions

// ==========================================================================
// Query Options + Auto-Invalidation Helper
// ==========================================================================

/**
 * Creates TanStack Query options for cache flush date requests
 *
 * @param apiType - The WSF API type to create options for
 * @returns TanStack Query options object
 */
export const wsfCacheFlushDateOptions = (apiType: WsfApiType) => {
  const endpoint = `/ferries/api/${apiType}/rest/cacheflushdate`;
  const key = ["wsf", apiType, "cacheFlushDate"] as const;
  return queryOptions({
    queryKey: key,
    queryFn: () =>
      fetchZod({
        endpoint,
        inputSchema: wsfCacheFlushDateParamsSchema,
        outputSchema: wsfCacheFlushDateSchema,
        params: {},
      }),
    staleTime: FIVE_MINUTES,
    gcTime: ONE_DAY,
    refetchInterval: FIVE_MINUTES,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
};

/**
 * React hook for automatic WSF query invalidation based on cache flush date changes
 *
 * Mount this in your app to automatically invalidate WSF queries when the
 * cache flush date changes for a given apiType. This ensures that stale data
 * is automatically refreshed when the API indicates new data is available.
 *
 * @param apiType - The WSF API type to monitor for cache flush date changes
 *
 * @example
 * ```typescript
 * // In your app component
 * useWsfAutoInvalidateOnUpdate("schedule");
 * useWsfAutoInvalidateOnUpdate("fares");
 * ```
 *
 * @note Behavior: invalidates all queries whose keys start with ["wsf", apiType]
 */
export const useWsfAutoInvalidateOnUpdate = (apiType: WsfApiType) => {
  const queryClient = useQueryClient();
  const { data: lastFlushDate } = useQuery(wsfCacheFlushDateOptions(apiType));
  const previous = useRef<Date | null>(null);

  useEffect(() => {
    if (!lastFlushDate) return;
    if (
      previous.current &&
      previous.current.getTime() === lastFlushDate.getTime()
    )
      return;
    previous.current = lastFlushDate;
    queryClient.invalidateQueries({ queryKey: ["wsf", apiType] });
  }, [lastFlushDate, queryClient, apiType]);
};
