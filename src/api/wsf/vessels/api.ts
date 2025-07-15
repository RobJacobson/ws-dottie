// WSF Vessels API functions

import { toDateStamp } from "@/shared/fetching/dateUtils";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";
import { buildWsfUrl } from "@/shared/fetching/urlBuilder";

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
// VESSEL BASICS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel basics from WSF Vessels API
 *
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * @returns Promise resolving to an array of VesselBasic objects containing basic vessel information
 */
export const getVesselBasics = (): Promise<VesselBasic[]> =>
  fetchWsfArray<VesselBasic>("vessels", "/vesselbasics");

/**
 * API function for fetching vessel basics for a specific vessel from WSF Vessels API
 *
 * Retrieves basic vessel information for a specific vessel identified by vessel ID,
 * including vessel name, abbreviation, class information, and operational status.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselBasic object containing basic information for the specified vessel
 */
export const getVesselBasicsById = (vesselId: number): Promise<VesselBasic> =>
  fetchWsf<VesselBasic>("vessels", `/vesselbasics/${vesselId}`);

// ============================================================================
// VESSEL LOCATIONS API FUNCTIONS
// ============================================================================

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
 */
export const getVesselLocations = (): Promise<VesselLocation[]> =>
  fetchWsfArray<VesselLocation>("vessels", "/vessellocations");

/**
 * API function for fetching current vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint returns a single vessel object.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselLocation object containing real-time position data for the specified vessel
 */
export const getVesselLocationsByVesselId = (
  vesselId: number
): Promise<VesselLocation> =>
  fetchWsf<VesselLocation>("vessels", `/vessellocations/${vesselId}`);

// ============================================================================
// VESSEL ACCOMMODATIONS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel accommodations from WSF Vessels API
 *
 * Retrieves accommodation information for all vessels including amenities,
 * facilities, and passenger services. This endpoint provides detailed information
 * about onboard accommodations and services available on each vessel.
 *
 * @returns Promise resolving to an array of VesselAccommodation objects containing accommodation information
 */
export const getVesselAccommodations = (): Promise<VesselAccommodation[]> =>
  fetchWsfArray<VesselAccommodation>("vessels", "/vesselaccommodations");

/**
 * API function for fetching vessel accommodations for a specific vessel from WSF Vessels API
 *
 * Retrieves accommodation information for a specific vessel identified by vessel ID,
 * including amenities, facilities, and passenger services available on that vessel.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselAccommodation object containing accommodation information for the specified vessel
 */
export const getVesselAccommodationsById = (
  vesselId: number
): Promise<VesselAccommodation> =>
  fetchWsf<VesselAccommodation>("vessels", `/vesselaccommodations/${vesselId}`);

// ============================================================================
// VESSEL STATISTICS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information about vessels including operational metrics,
 * performance data, and usage statistics. This endpoint provides comprehensive
 * statistical data for all vessels in the WSF fleet.
 *
 * @returns Promise resolving to an array of VesselStats objects containing vessel statistics
 */
export const getVesselStats = (): Promise<VesselStats[]> =>
  fetchWsfArray<VesselStats>("vessels", "/vesselstats");

/**
 * API function for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational metrics, performance data, and usage statistics.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselStats object containing statistics for the specified vessel
 */
export const getVesselStatsById = (vesselId: number): Promise<VesselStats> =>
  fetchWsf<VesselStats>("vessels", `/vesselstats/${vesselId}`);

// ============================================================================
// VESSEL HISTORY API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel history from WSF Vessels API
 *
 * Retrieves historical information about all vessels including past operations,
 * service records, and historical data. This endpoint provides comprehensive
 * historical data for all vessels in the WSF fleet.
 *
 * @returns Promise resolving to an array of VesselHistory objects containing vessel historical information
 */
export const getVesselHistory = (): Promise<VesselHistory[]> =>
  fetchWsfArray<VesselHistory>("vessels", "/vesselhistory");

/**
 * API function for fetching vessel history for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical information for a specific vessel identified by vessel name
 * within a specified date range, including past operations, service records, and historical data.
 *
 * @param vesselName - The name of the vessel (e.g., "Cathlamet")
 * @param dateStart - The start date for the history range (YYYY-MM-DD format)
 * @param dateEnd - The end date for the history range (YYYY-MM-DD format)
 * @returns Promise resolving to an array of VesselHistory objects containing historical information for the specified vessel and date range
 */
export const getVesselHistoryByVesselAndDateRange = (
  vesselName: string,
  dateStart: Date,
  dateEnd: Date
): Promise<VesselHistory[]> => {
  const formattedDateStart = toDateStamp(dateStart);
  const formattedDateEnd = toDateStamp(dateEnd);
  return fetchWsfArray<VesselHistory>(
    "vessels",
    `/vesselhistory/${vesselName}/${formattedDateStart}/${formattedDateEnd}`
  );
};

// ============================================================================
// VESSEL VERBOSE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel verbose data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information including specifications, capacity,
 * amenities, and operational status. This endpoint provides detailed information
 * about all vessels in the WSF fleet, including vessel dimensions, passenger
 * and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive vessel information
 */
export const getVesselVerbose = (): Promise<VesselVerbose[]> =>
  fetchWsfArray<VesselVerbose>("vessels", "/vesselverbose");

/**
 * API function for fetching vessel verbose data for a specific vessel from WSF Vessels API
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
 * @returns Promise resolving to a VesselVerbose object containing comprehensive information for the specified vessel
 */
export const getVesselVerboseById = (
  vesselId: number
): Promise<VesselVerbose> =>
  fetchWsf<VesselVerbose>("vessels", `/vesselverbose/${vesselId}`);

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Vessels API
 *
 * Returns the date when the vessel data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to VesselCacheFlushDate object or null
 */
export const getCacheFlushDateVessels =
  (): Promise<VesselsCacheFlushDate | null> =>
    fetchWsf<VesselsCacheFlushDate>("vessels", "/cacheflushdate");
