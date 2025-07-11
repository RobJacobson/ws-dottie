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
  // Vessel Accommodations API functions
  getVesselAccommodations,
  getVesselAccommodationsById,
  // Vessel Basics API functions
  getVesselBasics,
  getVesselBasicsById,
  // Vessel History API functions
  getVesselHistory,
  getVesselHistoryByVesselAndDateRange,
  // Vessel Locations API functions
  getVesselLocations,
  getVesselLocationsByVesselId,
  // Vessel Stats API functions
  getVesselStats,
  getVesselStatsById,
  // Vessel Verbose API functions
  getVesselVerbose,
  getVesselVerboseById,
} from "./api";
import type {
  VesselAccommodation,
  VesselBasic,
  VesselHistory,
  VesselLocation,
  VesselStats,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./types";

// ============================================================================
// VESSEL BASICS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel basics from WSF Vessels API
 *
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselBasic objects with basic vessel information
 */
export const useVesselBasics = () => {
  return useQuery({
    queryKey: ["vessels", "basics"],
    queryFn: getVesselBasics,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel basics for a specific vessel from WSF Vessels API
 *
 * Retrieves basic vessel information for a specific vessel identified by vessel ID,
 * including vessel name, abbreviation, class information, and operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing a VesselBasic object with basic information for the specified vessel
 */
export const useVesselBasicsById = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "basics", "byId", vesselId],
    queryFn: () => getVesselBasicsById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// VESSEL ACCOMMODATIONS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel accommodations from WSF Vessels API
 *
 * Retrieves accommodation information for all vessels including amenities,
 * facilities, and passenger services. This endpoint provides detailed information
 * about onboard accommodations and services available on each vessel.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselAccommodation objects with accommodation information
 */
export const useVesselAccommodations = () => {
  return useQuery({
    queryKey: ["vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel accommodations for a specific vessel from WSF Vessels API
 *
 * Retrieves accommodation information for a specific vessel identified by vessel ID,
 * including amenities, facilities, and passenger services available on that vessel.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing a VesselAccommodation object with accommodation information for the specified vessel
 */
export const useVesselAccommodationsById = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "accommodations", "byId", vesselId],
    queryFn: () => getVesselAccommodationsById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions(),
  });
};

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
// VESSEL STATS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information about vessels including operational metrics,
 * performance data, and usage statistics. This endpoint provides comprehensive
 * statistical data for all vessels in the WSF fleet.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselStats objects with vessel statistics
 */
export const useVesselStats = () => {
  return useQuery({
    queryKey: ["vessels", "stats"],
    queryFn: getVesselStats,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational metrics, performance data, and usage statistics.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns React Query result containing a VesselStats object with statistics for the specified vessel
 */
export const useVesselStatsById = (vesselId: number) => {
  return useQuery({
    queryKey: ["vessels", "stats", "byId", vesselId],
    queryFn: () => getVesselStatsById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// VESSEL HISTORY HOOKS
// ============================================================================

/**
 * Hook for fetching vessel history from WSF Vessels API
 *
 * Retrieves historical information about all vessels including past operations,
 * service records, and historical data. This endpoint provides comprehensive
 * historical data for all vessels in the WSF fleet.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns React Query result containing an array of VesselHistory objects with vessel historical information
 */
export const useVesselHistory = () => {
  return useQuery({
    queryKey: ["vessels", "history"],
    queryFn: getVesselHistory,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessel history for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical information for a specific vessel identified by vessel name
 * within a specified date range, including past operations, service records, and historical data.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselName - The name of the vessel (e.g., "Cathlamet")
 * @param dateStart - The start date for the history range (YYYY-MM-DD format)
 * @param dateEnd - The end date for the history range (YYYY-MM-DD format)
 * @returns React Query result containing an array of VesselHistory objects with historical information for the specified vessel and date range
 */
export const useVesselHistoryByVesselAndDateRange = (
  vesselName: string,
  dateStart: string,
  dateEnd: string
) => {
  return useQuery({
    queryKey: [
      "vessels",
      "history",
      "byVesselAndDateRange",
      vesselName,
      dateStart,
      dateEnd,
    ],
    queryFn: () =>
      getVesselHistoryByVesselAndDateRange(vesselName, dateStart, dateEnd),
    enabled: !!(vesselName && dateStart && dateEnd),
    ...createInfrequentUpdateOptions(),
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
