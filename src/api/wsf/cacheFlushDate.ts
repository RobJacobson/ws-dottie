/**
 * WSF Cache Flush Date - Consolidated Utility
 *
 * Provides a unified interface for accessing cache flush dates across all WSF APIs.
 * This utility eliminates code duplication while maintaining the same external API
 * surface for consumers.
 *
 * Supported API Types:
 * - fares: WSF Fares API cache flush date
 * - vessels: WSF Vessels API cache flush date
 * - terminals: WSF Terminals API cache flush date
 * - schedule: WSF Schedule API cache flush date
 *
 * All endpoints return a .NET timestamp format that is automatically converted to a
 * JavaScript Date object by the zodFetch utility.
 *
 * Example Usage:
 * ```typescript
 * const { getCacheFlushDate, useCacheFlushDate } = createWsfCacheFlushDate('fares');
 *
 * // API function
 * const flushDate = await getCacheFlushDate();
 *
 * // React hook
 * const { data: flushDate, isLoading } = useCacheFlushDate();
 * ```
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// Types
// ============================================================================

export type WsfApiType = "fares" | "vessels" | "terminals" | "schedule";

export type WsfCacheFlushDate = Date;

export type WsfCacheFlushDateParams = Record<string, never>;

// ============================================================================
// Schema
// ============================================================================

export const wsfCacheFlushDateParamsSchema = z.object({}).describe("");

export const wsfCacheFlushDateSchema = zWsdotDate().describe("");

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Creates cache flush date functions for a specific WSF API type.
 *
 * @param apiType - The WSF API type (fares, vessels, terminals, or schedule)
 * @returns Object containing the API function and React hook for the specified API type
 */
export const createWsfCacheFlushDate = (apiType: WsfApiType) => {
  const endpoint = `/ferries/api/${apiType}/rest/cacheflushdate`;
  const queryKey = ["wsf", apiType, "cacheFlushDate"];

  // ============================================================================
  // API Function
  // ============================================================================

  /**
   * Retrieves the cache flush date from the specified WSF API.
   *
   * This endpoint returns the timestamp when data was last updated. Applications
   * should use this information to implement intelligent caching strategies, refreshing
   * their local cache only when the flush date changes.
   *
   * @param params - Parameters object (no parameters required, defaults to empty object)
   * @returns Promise<Date> - Cache flush date indicating when data was last modified
   *
   * @example
   * const flushDate = await getCacheFlushDate();
   * console.log(flushDate); // Date object representing last update time
   *
   * @throws {Error} When API is unavailable or returns invalid response
   */
  const getCacheFlushDate = async (
    params: WsfCacheFlushDateParams = {}
  ): Promise<WsfCacheFlushDate> => {
    return zodFetch(
      endpoint,
      {
        input: wsfCacheFlushDateParamsSchema,
        output: wsfCacheFlushDateSchema,
      },
      params
    );
  };

  // ============================================================================
  // TanStack Query Hook
  // ============================================================================

  /**
   * TanStack Query hook for cache flush date with automatic updates.
   *
   * @param params - Parameters object (no parameters required, defaults to empty object)
   * @param options - Optional TanStack Query options for caching and refetch behavior
   * @returns UseQueryResult<Date, Error> - Query result with cache flush date
   *
   * @example
   * const { data: flushDate, isLoading } = useCacheFlushDate();
   * if (flushDate) {
   *   console.log(flushDate); // Date object representing last update time
   * }
   */
  const useCacheFlushDate = (
    params: WsfCacheFlushDateParams = {},
    options?: Omit<
      UseQueryOptions<WsfCacheFlushDate, Error>,
      "queryKey" | "queryFn"
    >
  ) => {
    return useQuery({
      queryKey: [...queryKey, params],
      queryFn: () => getCacheFlushDate(params),
      ...tanstackQueryOptions.DAILY_UPDATES,
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
// Pre-configured Instances
// ============================================================================

/**
 * Pre-configured cache flush date functions for WSF Fares API
 */
export const {
  getCacheFlushDate: getFaresCacheFlushDate,
  useCacheFlushDate: useFaresCacheFlushDate,
} = createWsfCacheFlushDate("fares");

/**
 * Pre-configured cache flush date functions for WSF Vessels API
 */
export const {
  getCacheFlushDate: getCacheFlushDateVessels,
  useCacheFlushDate: useCacheFlushDateVessels,
} = createWsfCacheFlushDate("vessels");

/**
 * Pre-configured cache flush date functions for WSF Terminals API
 */
export const {
  getCacheFlushDate: getCacheFlushDateTerminals,
  useCacheFlushDate: useCacheFlushDateTerminals,
} = createWsfCacheFlushDate("terminals");

/**
 * Pre-configured cache flush date functions for WSF Schedule API
 */
export const {
  getCacheFlushDate: getCacheFlushDateSchedule,
  useCacheFlushDate: useCacheFlushDateSchedule,
} = createWsfCacheFlushDate("schedule");
