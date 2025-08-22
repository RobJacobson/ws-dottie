import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zPositiveInteger } from "@/shared/validation";
import { createVesselIdDescription } from "@/shared/validation/templates";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vessellocations/{vesselId}";

/**
 * API function for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time location data for a specific vessel identified by vessel ID,
 * including GPS coordinates, speed, heading, terminal information, and operational status.
 * This endpoint provides the most current position and status information for tracking
 * vessel movements in real-time.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @returns Promise resolving to a VesselLocation object containing real-time location data for the specified vessel
 *
 * @example
 * ```typescript
 * const location = await getVesselLocationsByVesselId({ vesselId: 1 });
 * console.log(location.VesselName); // "Cathlamet"
 * console.log(location.Latitude); // 47.6029
 * ```
 */
export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocation> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselLocationsByVesselIdParamsSchema,
      output: vesselLocationSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose location you want to track. This returns real-time GPS coordinates, speed, heading, and operational status"
      )
    ),
  })
  .describe(
    "Parameters for retrieving real-time location data for a specific vessel"
  );

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the schema from the main locations file
import { vesselLocationSchema } from "./getVesselLocations";

export type VesselLocation = z.infer<typeof vesselLocationSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time location data for a specific vessel identified by vessel ID,
 * including GPS coordinates, speed, heading, terminal information, and operational status.
 * This endpoint provides the most current position and status information for tracking
 * vessel movements in real-time.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselLocation object with real-time location data for the specified vessel
 *
 * @example
 * ```typescript
 * const { data: location } = useVesselLocationsByVesselId({ vesselId: 1 });
 * console.log(location?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselLocationsByVesselId = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselLocation>
): UseQueryResult<VesselLocation, Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations", "byVesselId", params.vesselId],
    queryFn: () => getVesselLocationsByVesselId({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};
