import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
// Import schemas and types from the single-item endpoint
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./getVesselLocationsByVesselId";

// ============================================================================
// API Function
//
// getVesselLocations
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vessellocations";

/**
 * API function for fetching current vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes.
 *
 * @returns Promise resolving to an array of VesselLocation objects containing real-time vessel position data
 *
 * @example
 * ```typescript
 * const locations = await getVesselLocations();
 * console.log(locations[0].VesselName); // "Cathlamet"
 * ```
 */
export const getVesselLocations = async (): Promise<VesselLocation[]> => {
  return zodFetch(ENDPOINT, {
    output: vesselLocationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsParamsSchema
// GetVesselLocationsParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselLocationArraySchema
// VesselLocation
// ============================================================================

export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe(
    "Array of real-time vessel locations for all active vessels in the Washington State Ferries fleet. Each entry contains current position, speed, heading, and operational status data updated approximately every 10 seconds."
  );

// ============================================================================
// TanStack Query Hook
//
// useVesselLocations
// ============================================================================

/**
 * Hook for fetching vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes. This hook uses
 * real-time caching configuration with 5-second refresh intervals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselLocation objects with real-time location data for all vessels
 *
 * @example
 * ```typescript
 * const { data: locations } = useVesselLocations();
 * console.log(locations?.[0]?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselLocations = (
  options?: TanStackOptions<VesselLocation[]>
): UseQueryResult<VesselLocation[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "locations"],
    queryFn: getVesselLocations,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.REALTIME_UPDATES, ...options },
  });
};
