// Vessel verbose hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { VesselVerbose } from "../types";
import { getVesselVerbose, getVesselVerboseById } from "./api";

// Main hooks
/**
 * Hook for fetching vessel verbose data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information including specifications, capacity,
 * amenities, and operational status. This endpoint provides detailed information
 * about all vessels in the WSF fleet, including vessel dimensions, passenger
 * and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive vessel information
 */
export const useVesselVerbose = () => {
  return useQuery({
    queryKey: ["vessels", "verbose"],
    queryFn: getVesselVerbose,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel verbose data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including specifications, capacity, amenities, and operational status. This endpoint
 * filters the resultset to a single vessel, providing detailed information about vessel
 * dimensions, passenger and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive information for the specified vessel
 */
export const useVesselVerboseById = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "verbose", "byId", vesselId],
    queryFn: () => getVesselVerboseById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions(),
  });
};
