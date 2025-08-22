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

const ENDPOINT = "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";

/**
 * API function for fetching vessel accommodation data for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @returns Promise resolving to a VesselAccommodation object containing accommodation information
 *
 * @example
 * ```typescript
 * const accommodation = await getVesselAccommodationsById({ vesselId: 1 });
 * console.log(accommodation.VesselName); // "Cathlamet"
 * console.log(accommodation.ADAAccessible); // true
 * ```
 */
export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodation> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription(
        "whose accommodation details you want to retrieve. This returns information about passenger capacity, vehicle capacity, ADA accessibility, amenities like restrooms and Wi-Fi, and other accommodation features"
      )
    ),
  })
  .describe(
    "Parameters for retrieving detailed accommodation information for a specific vessel"
  );

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the schema from the main accommodations file
import { vesselAccommodationSchema } from "./getVesselAccommodations";

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel accommodations for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselAccommodation object with accommodation information for the specified vessel
 */
export const useVesselAccommodationsById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselAccommodation>
): UseQueryResult<VesselAccommodation, Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations", "byId", params.vesselId],
    queryFn: () => getVesselAccommodationsById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
