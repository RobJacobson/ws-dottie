// WSF Vessels hooks

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

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
 * Retrieves basic vessel information for all vessels in the Washington State Ferries fleet,
 * including vessel names, abbreviations, class information, and operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselBasic objects with basic information for all vessels
 */
export const useVesselBasics = (
  options?: Parameters<typeof useQuery<VesselBasic[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: () => getVesselBasics(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
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
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselBasic object with basic information for the specified vessel
 */
export const useVesselBasicsById = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselBasic>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "basics", "byId", vesselId],
    queryFn: () => getVesselBasicsById({ vesselId }),
    enabled: !!vesselId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselAccommodation objects with accommodation information
 */
export const useVesselAccommodations = (
  options?: Parameters<typeof useQuery<VesselAccommodation[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: () => getVesselAccommodations(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
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
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselAccommodation object with accommodation information for the specified vessel
 */
export const useVesselAccommodationsById = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselAccommodation>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations", "byId", vesselId],
    queryFn: () => getVesselAccommodationsById({ vesselId }),
    enabled: !!vesselId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
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
 * about vessel locations and movements across the ferry system.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselLocation objects with real-time location data for all vessels
 */
export const useVesselLocations = (
  options?: Parameters<typeof useQuery<VesselLocation[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations"],
    queryFn: () => getVesselLocations(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint provides current
 * location data for the specified vessel, including GPS coordinates, vessel speed,
 * heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the vessel's location and movement.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselLocation object with real-time location data for the specified vessel
 */
export const useVesselLocationsByVesselId = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselLocation>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations", "byVesselId", vesselId],
    queryFn: () => getVesselLocationsByVesselId({ vesselId }),
    enabled: !!vesselId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL STATS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels including operational metrics,
 * performance data, and usage statistics. This endpoint provides comprehensive
 * statistical data about vessel operations and performance across the WSF fleet.
 *
 * The data is updated periodically and provides historical and current statistical
 * information about vessel operations and performance.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselStats objects with statistical information for all vessels
 */
export const useVesselStats = (
  options?: Parameters<typeof useQuery<VesselStats[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: () => getVesselStats(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational metrics, performance data, and usage statistics for that vessel.
 *
 * The data is updated periodically and provides historical and current statistical
 * information about the vessel's operations and performance.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselStats object with statistical information for the specified vessel
 */
export const useVesselStatsById = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselStats>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "stats", "byId", vesselId],
    queryFn: () => getVesselStatsById({ vesselId }),
    enabled: !!vesselId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL HISTORY HOOKS
// ============================================================================

/**
 * Hook for fetching vessel history data from WSF Vessels API
 *
 * Retrieves historical vessel data including past routes, schedules, and operational
 * history for all vessels in the WSF fleet. This endpoint provides comprehensive
 * historical information about vessel operations and movements over time.
 *
 * The data is updated periodically and provides historical information about
 * vessel operations, routes, and schedules.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical data for all vessels
 */
export const useVesselHistory = (
  options?: Parameters<typeof useQuery<VesselHistory[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "history"],
    queryFn: () => getVesselHistory(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel history data for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical vessel data for a specific vessel within a specified date range,
 * including past routes, schedules, and operational history for that vessel.
 *
 * The data is updated periodically and provides historical information about
 * the vessel's operations, routes, and schedules within the specified time period.
 *
 * @param vesselName - The name of the vessel (e.g., "M/V Cathlamet")
 * @param dateStart - The start date for the history range
 * @param dateEnd - The end date for the history range
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical data for the specified vessel and date range
 */
export const useVesselHistoryByVesselAndDateRange = (
  vesselName: string,
  dateStart: Date,
  dateEnd: Date,
  options?: Parameters<typeof useQuery<VesselHistory[]>>[0]
) => {
  return useQuery({
    queryKey: [
      "wsf",
      "vessels",
      "history",
      "byVesselAndDateRange",
      vesselName,
      dateStart.toISOString(),
      dateEnd.toISOString(),
    ],
    queryFn: () =>
      getVesselHistoryByVesselAndDateRange({ vesselName, dateStart, dateEnd }),
    enabled: !!vesselName && !!dateStart && !!dateEnd,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL VERBOSE HOOKS
// ============================================================================

/**
 * Hook for fetching verbose vessel data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for all vessels including detailed
 * specifications, capabilities, and operational data. This endpoint provides
 * the most complete vessel information available from the WSF API.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselVerbose objects with comprehensive information for all vessels
 */
export const useVesselVerbose = (
  options?: Parameters<typeof useQuery<VesselVerbose[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "verbose"],
    queryFn: () => getVesselVerbose(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching verbose vessel data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, capabilities, and operational data for that vessel.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselVerbose object with comprehensive information for the specified vessel
 */
export const useVesselVerboseById = (
  vesselId: number,
  options?: Parameters<typeof useQuery<VesselVerbose>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "verbose", "byId", vesselId],
    queryFn: () => getVesselVerboseById({ vesselId }),
    enabled: !!vesselId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook for fetching cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels data, indicating when the
 * vessel data was last updated. This endpoint provides information about
 * the freshness of the vessel data cache.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing the cache flush date for vessels data
 */
export const useCacheFlushDateVessels = (
  options?: Parameters<typeof useQuery<VesselsCacheFlushDate | null>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateVessels(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
