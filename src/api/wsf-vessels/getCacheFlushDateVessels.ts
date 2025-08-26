import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getCacheFlushDateVessels
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/cacheflushdate";

/**
 * Get cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels API, which indicates when
 * the cached data was last updated. This information is useful for determining
 * the freshness of the cached vessel data.
 *
 * @returns Promise resolving to a VesselsCacheFlushDate object containing the cache flush date
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const cacheDate = await getCacheFlushDateVessels();
 * console.log(cacheDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getCacheFlushDateVessels =
  async (): Promise<VesselsCacheFlushDate> => {
    return zodFetch(ENDPOINT, {
      output: vesselsCacheFlushDateSchema,
    });
  };

// ============================================================================
// Input Schema & Types
//
// getCacheFlushDateVesselsParamsSchema
// GetCacheFlushDateVesselsParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselsCacheFlushDateSchema
// VesselsCacheFlushDate
// ============================================================================

export const vesselsCacheFlushDateSchema = zWsdotDate().describe("");

export type VesselsCacheFlushDate = z.infer<typeof vesselsCacheFlushDateSchema>;

// ============================================================================
// TanStack Query Hook
//
// useCacheFlushDateVessels
// ============================================================================

/**
 * Hook for fetching cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels API, which indicates when
 * the cached data was last updated. This information is useful for determining
 * the freshness of the cached vessel data.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing the cache flush date for vessels data
 */
export const useCacheFlushDateVessels = (
  options?: TanStackOptions<VesselsCacheFlushDate>
): UseQueryResult<VesselsCacheFlushDate, Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "cacheflushdate"],
    queryFn: getCacheFlushDateVessels,
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
