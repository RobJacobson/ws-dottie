import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
// Import schemas and types from the single-item endpoint
import { type VesselStats, vesselStatsSchema } from "./getVesselStatsById";

// ============================================================================
// API Function
//
// getVesselStats
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselstats";

/**
 * API function for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
 *
 * @returns Promise resolving to an array of VesselStats objects containing vessel statistics
 *
 * @example
 * ```typescript
 * const stats = await getVesselStats();
 * console.log(stats[0].VesselName); // "Cathlamet"
 * console.log(stats[0].MaxPassengerCount); // 2000
 * ```
 */
export const getVesselStats = async (): Promise<VesselStats[]> => {
  return zodFetch(ENDPOINT, {
    output: vesselStatsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselStatsParamsSchema
// GetVesselStatsParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselStatsArraySchema
// VesselStats
// ============================================================================

export const vesselStatsArraySchema = z
  .array(vesselStatsSchema)
  .describe("Array of technical statistics for all vessels in the WSF fleet");

// ============================================================================
// TanStack Query Hook
//
// useVesselStats
// ============================================================================

/**
 * Hook for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselStats objects with statistical information for all vessels
 */
export const useVesselStats = (
  options?: TanStackOptions<VesselStats[]>
): UseQueryResult<VesselStats[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: getVesselStats,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
