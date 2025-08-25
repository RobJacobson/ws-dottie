import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
// Import schemas and types from the single-item endpoint
import {
  type VesselAccommodation,
  vesselAccommodationSchema,
} from "./getVesselAccommodationsById";

// ============================================================================
// API Function
//
// getVesselAccommodations
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
// Input Schema & Types
//
// getVesselAccommodationsParamsSchema
// GetVesselAccommodationsParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationArraySchema
// VesselAccommodation
// ============================================================================

export const vesselAccommodationArraySchema = z
  .array(vesselAccommodationSchema)
  .describe(
    "Array of accommodation information for all vessels in the WSF fleet"
  );

// ============================================================================
// TanStack Query Hook
//
// useVesselAccommodations
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
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
