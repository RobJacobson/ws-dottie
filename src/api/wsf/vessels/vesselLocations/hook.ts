// Vessel locations hooks

import { useQuery } from "@tanstack/react-query";

// Main hooks
import { createFrequentUpdateOptions } from "@/shared/caching/config";
import type { VesselLocation } from "../types";
import { getVesselLocations, getVesselLocationsByVesselId } from "./api";

/**
 * Hook for fetching vessel location data from WSF Vessels API
 *
 * Retrieves real-time vessel positions, speeds, headings, and status information
 * from the Washington State Ferries API. This endpoint provides current location
 * data for all active vessels in the WSF fleet, including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about vessel locations for tracking and monitoring purposes.
 *
 * @returns React Query result containing an array of VesselLocation objects with real-time vessel position data
 */
export const useVesselLocations = () => {
  return useQuery({
    queryKey: ["vessels", "locations"],
    queryFn: getVesselLocations,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint filters the
 * resultset to a single vessel, providing current location data including
 * GPS coordinates, vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the specified vessel's location for tracking and monitoring purposes.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing an array of VesselLocation objects with real-time position data for the specified vessel
 */
export const useVesselLocationsByVesselId = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "locations", "byVesselId", vesselId],
    queryFn: () => getVesselLocationsByVesselId(vesselId),
    enabled: !!vesselId,
    ...createFrequentUpdateOptions(),
  });
};
