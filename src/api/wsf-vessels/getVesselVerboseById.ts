import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zPositiveInteger } from "@/shared/validation";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
import { type VesselVerbose, vesselVerboseSchema } from "./getVesselVerbose";

// ============================================================================
// API Function
//
// getVesselVerboseById
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";

/**
 * Get comprehensive vessel information for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @returns Promise resolving to a VesselVerbose object containing comprehensive vessel information
 *
 * @example
 * ```typescript
 * const vessel = await getVesselVerboseById({ vesselId: 1 });
 * console.log(vessel.VesselName); // "Cathlamet"
 * console.log(vessel.MaxPassengerCount); // 2000
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
// Input Schema & Types
//
// getVesselVerboseByIdParamsSchema
// GetVesselVerboseByIdParams
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
// Output Schema & Types
//
// vesselVerboseSchema (imported from ./getVesselVerbose)
// VesselVerbose
// ============================================================================

// Schema and type imported from getVesselVerbose.ts to avoid duplication

// ============================================================================
// TanStack Query Hook
//
// useVesselVerboseById
// ============================================================================

/**
 * Hook for fetching verbose vessel data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselVerbose object with comprehensive information
 *
 * @example
 * ```typescript
 * const { data: vessel } = useVesselVerboseById({ vesselId: 1 });
 * console.log(vessel?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselVerboseById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselVerbose>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose", JSON.stringify(params)],
    queryFn: () => getVesselVerboseById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
