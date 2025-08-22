import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas and types from the single-item endpoint
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./getVesselLocationsByVesselId";

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe(
    "Array of real-time vessel locations for all active vessels in the Washington State Ferries fleet. Each entry contains current position, speed, heading, and operational status data updated approximately every 30 seconds to 2 minutes."
  );

// ============================================================================
// API FUNCTION
// ============================================================================

const WSF_VESSELS_BASE = "/ferries/api/vessels/rest";

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
  return zodFetch(`${WSF_VESSELS_BASE}/vessellocations`, {
    output: vesselLocationArraySchema,
  });
};

// ============================================================================
// VESSEL LOCATIONS HOOKS
// Real-time GPS tracking and vessel positioning
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
  return useQuery({
    queryKey: ["wsf", "vessels", "locations"],
    queryFn: () => getVesselLocations(),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};
