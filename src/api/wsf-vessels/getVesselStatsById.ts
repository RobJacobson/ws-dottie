import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
} from "@/shared/validation";
import { createVesselIdDescription } from "@/shared/validation/templates";

// Import vessel class schema from getVesselBasics
import { vesselClassSchema } from "./getVesselBasics";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselstats/{vesselId}";

/**
 * API function for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational statistics, performance metrics, and other relevant data.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselStats object containing statistics for the specified vessel
 *
 * @example
 * ```typescript
 * const stats = await getVesselStatsById({ vesselId: 1 });
 * console.log(stats.VesselName); // "M/V Cathlamet"
 * console.log(stats.MaxPassengerCount); // 2000
 * ```
 */
export const getVesselStatsById = async (
  params: GetVesselStatsByIdParams
): Promise<VesselStats> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselStatsByIdParamsSchema,
      output: vesselStatsSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getVesselStatsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose technical specifications and statistics you want to retrieve. This returns detailed information about the vessel's physical characteristics, capacity, engine specifications, and operational statistics"
      )
    ),
  })
  .describe(
    "Parameters for retrieving comprehensive statistics and specifications for a specific vessel"
  );

export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the schema from the main stats file
import { vesselStatsSchema } from "./getVesselStats";

export type VesselStats = z.infer<typeof vesselStatsSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational statistics, performance metrics, and other relevant data.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselStats object with statistics for the specified vessel
 */
export const useVesselStatsById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselStats>
): UseQueryResult<VesselStats, Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "stats", "byId", params.vesselId],
    queryFn: () => getVesselStatsById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
