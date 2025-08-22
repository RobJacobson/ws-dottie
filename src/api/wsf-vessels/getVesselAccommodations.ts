import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas and types from the single-item endpoint
import {
  type VesselAccommodation,
  vesselAccommodationSchema,
} from "./getVesselAccommodationsById";

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const vesselAccommodationArraySchema = z
  .array(vesselAccommodationSchema)
  .describe(
    "Array of accommodation information for all vessels in the WSF fleet"
  );

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselaccommodations";

/**
 * API function for fetching vessel accommodation data from WSF Vessels API
 *
 * Retrieves detailed accommodation information for all vessels in the WSF fleet,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 * This endpoint provides comprehensive information about the capacity and
 * accommodation features of each vessel.
 *
 * @returns Promise resolving to an array of VesselAccommodation objects containing accommodation information
 *
 * @example
 * ```typescript
 * const accommodations = await getVesselAccommodations();
 * console.log(accommodations[0].VesselName); // "Cathlamet"
 * console.log(accommodations[0].ADAAccessible); // true
 * ```
 */
export const getVesselAccommodations = async (): Promise<
  VesselAccommodation[]
> => {
  return zodFetch(ENDPOINT, {
    output: vesselAccommodationArraySchema,
  });
};

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * Hook for fetching vessel accommodation data from WSF Vessels API
 *
 * Retrieves detailed accommodation information for all vessels in the WSF fleet,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 * This endpoint provides comprehensive information about the capacity and
 * accommodation features of each vessel.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselAccommodation objects with accommodation information
 *
 * @example
 * ```typescript
 * const { data: accommodations } = useVesselAccommodations();
 * console.log(accommodations?.[0]?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselAccommodations = (
  options?: TanStackOptions<VesselAccommodation[]>
): UseQueryResult<VesselAccommodation[], Error> => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
