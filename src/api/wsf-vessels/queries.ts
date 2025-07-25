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
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselBasic objects with basic information for all vessels
 *
 * @example
 * ```typescript
 * const { data: vessels } = useVesselBasics();
 * console.log(vessels?.[0]?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselBasics = (
  options?: Parameters<typeof useQuery<VesselBasic[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: () => getVesselBasics(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel basics for a specific vessel from WSF Vessels API
 *
 * Retrieves basic vessel information for a specific vessel identified by vessel ID,
 * including vessel name, abbreviation, class information, and operational status.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselBasic object with basic information for the specified vessel
 *
 * @example
 * ```typescript
 * const { data: vessel } = useVesselBasicsById({ vesselId: 1 });
 * console.log(vessel?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselBasicsById = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselBasic>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "basics", "byId", params.vesselId],
    queryFn: () => getVesselBasicsById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL ACCOMMODATIONS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel accommodations from WSF Vessels API
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
 * console.log(accommodations?.[0]?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselAccommodations = (
  options?: Parameters<typeof useQuery<VesselAccommodation[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: () => getVesselAccommodations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel accommodations for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselAccommodation object with accommodation information for the specified vessel
 */
export const useVesselAccommodationsById = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselAccommodation>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "accommodations", "byId", params.vesselId],
    queryFn: () => getVesselAccommodationsById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * about vessel locations for tracking and monitoring purposes.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselLocation objects with real-time location data for all vessels
 *
 * @example
 * ```typescript
 * const { data: locations } = useVesselLocations();
 * console.log(locations?.[0]?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselLocations = (
  options?: Parameters<typeof useQuery<VesselLocation[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations"],
    queryFn: () => getVesselLocations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint returns a single vessel object.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselLocation object with real-time position data for the specified vessel
 *
 * @example
 * ```typescript
 * const { data: location } = useVesselLocationsByVesselId({ vesselId: 1 });
 * console.log(location?.VesselName); // "M/V Cathlamet"
 * ```
 */
export const useVesselLocationsByVesselId = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselLocation>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "locations", "byVesselId", params.vesselId],
    queryFn: () => getVesselLocationsByVesselId({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL STATS HOOKS
// ============================================================================

/**
 * Hook for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
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
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational statistics, performance metrics, and other relevant data.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselStats object with statistics for the specified vessel
 */
export const useVesselStatsById = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselStats>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "stats", "byId", params.vesselId],
    queryFn: () => getVesselStatsById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL HISTORY HOOKS
// ============================================================================

/**
 * Hook for fetching vessel history data from WSF Vessels API
 *
 * Retrieves historical vessel data for all vessels in the WSF fleet,
 * including past routes, schedules, and operational history. This endpoint
 * provides comprehensive historical information about vessel operations.
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
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching vessel history data for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical vessel data for a specific vessel within a specified date range,
 * including past routes, schedules, and operational history for that vessel.
 *
 * @param params - Object containing vesselName, dateStart, dateEnd
 * @param params.vesselName - The name of the vessel (e.g., "M/V Cathlamet")
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselHistory objects with historical data for the specified vessel and date range
 */
export const useVesselHistoryByVesselAndDateRange = (
  params: { vesselName: string; dateStart: Date; dateEnd: Date },
  options?: Parameters<typeof useQuery<VesselHistory[]>>[0]
) => {
  return useQuery({
    queryKey: [
      "wsf",
      "vessels",
      "history",
      "byVesselAndDateRange",
      params.vesselName,
      params.dateStart.toISOString(),
      params.dateEnd.toISOString(),
    ],
    queryFn: () =>
      getVesselHistoryByVesselAndDateRange({
        vesselName: params.vesselName,
        dateStart: params.dateStart,
        dateEnd: params.dateEnd,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// VESSEL VERBOSE HOOKS
// ============================================================================

/**
 * Hook for fetching verbose vessel data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for all vessels in the WSF fleet,
 * including detailed specifications, operational data, and extended information.
 * This endpoint provides the most complete vessel information available.
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
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching verbose vessel data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param options - Optional React Query options
 * @returns React Query result containing a VesselVerbose object with comprehensive information for the specified vessel
 */
export const useVesselVerboseById = (
  params: { vesselId: number },
  options?: Parameters<typeof useQuery<VesselVerbose>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "verbose", "byId", params.vesselId],
    queryFn: () => getVesselVerboseById({ vesselId: params.vesselId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook for fetching cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels API, which indicates when
 * the cached data was last updated. This information is useful for determining
 * the freshness of the cached vessel data.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing the cache flush date for vessels data
 */
export const useCacheFlushDateVessels = (
  options?: Parameters<typeof useQuery<VesselsCacheFlushDate>>[0]
) => {
  return useQuery({
    queryKey: ["wsf", "vessels", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateVessels(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
