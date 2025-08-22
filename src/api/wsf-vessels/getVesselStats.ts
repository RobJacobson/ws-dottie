import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas and types from the single-item endpoint
import { type VesselStats, vesselStatsSchema } from "./getVesselStatsById";

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const vesselStatsArraySchema = z
  .array(vesselStatsSchema)
  .describe("Array of technical statistics for all vessels in the WSF fleet");

// ============================================================================
// FETCH FUNCTION
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
// QUERY HOOK
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
  return useQuery({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: () => getVesselStats(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
