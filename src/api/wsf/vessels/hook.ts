// WSF Vessels hooks

import { useQuery } from "@tanstack/react-query";

import {
  createCacheFlushOptions,
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
} from "@/shared/caching/config";

import {
  // Cache Flush Date API functions
  getCacheFlushDateVessels,
  // Vessel Locations API functions
  getVesselLocations,
  getVesselLocationsByVesselId,
  // Vessel Verbose API functions
  getVesselVerbose,
  getVesselVerboseById,
} from "./api";
import type {
  VesselLocation,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./types";

// ============================================================================
// VESSEL LOCATIONS HOOKS
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
 * for a specific vessel identified by vessel ID. This endpoint returns a single
 * vessel object, providing current location data including GPS coordinates,
 * vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the specified vessel's location for tracking and monitoring purposes.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing a VesselLocation object with real-time position data for the specified vessel
 */
export const useVesselLocationsByVesselId = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "locations", "byVesselId", vesselId],
    queryFn: () => getVesselLocationsByVesselId(vesselId),
    enabled: !!vesselId,
    ...createFrequentUpdateOptions(),
  });
};

// ============================================================================
// VESSEL VERBOSE HOOKS
// ============================================================================

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
 * returns detailed information about vessel dimensions, passenger and vehicle capacity,
 * onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing a VesselVerbose object with comprehensive information for the specified vessel
 */
export const useVesselVerboseById = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "verbose", "byId", vesselId],
    queryFn: () => getVesselVerboseById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook function for fetching cache flush date from WSF Vessels API with React Query
 *
 * @returns React Query result with VesselCacheFlushDate data
 */
export const useCacheFlushDateVessels = () => {
  return useQuery({
    queryKey: ["vessels", "cacheFlushDate"],
    queryFn: getCacheFlushDateVessels,
    ...createCacheFlushOptions(),
  });
};
