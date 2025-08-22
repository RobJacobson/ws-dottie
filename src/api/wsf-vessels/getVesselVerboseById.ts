import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { zPositiveInteger } from "@/shared/validation";

import { type VesselVerbose, vesselVerboseSchema } from "./getVesselVerbose";

const ENDPOINT = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";

/**
 * Get comprehensive vessel information for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselVerbose object containing comprehensive information for the specified vessel
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const vessel = await getVesselVerboseById({ vesselId: 1 });
 * console.log(vessel.VesselName); // "M/V Cathlamet"
 * console.log(vessel.MaxPassengerCount); // 1000
 * ```
 */
export const getVesselVerboseById = async (
  params: GetVesselVerboseByIdParams
): Promise<VesselVerbose> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselVerboseByIdParamsSchema,
      output: vesselVerboseSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getVesselVerboseByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      "Unique vessel identifier whose complete detailed information you want to retrieve. This returns the most comprehensive dataset available, combining basic info, accommodations, statistics, and specifications in a single response"
    ),
  })
  .describe(
    "Parameters for retrieving complete verbose information for a specific vessel"
  );

export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Schema and type imported from getVesselVerbose.ts to avoid duplication

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for fetching verbose vessel data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselVerbose object with comprehensive information for the specified vessel
 */
export const useVesselVerboseById = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselVerbose, Error>>[1]
): UseQueryResult<VesselVerbose, Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "verbose", "byId", params.vesselId],
    queryFn: () => getVesselVerboseById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
