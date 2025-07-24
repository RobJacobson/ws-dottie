// WSF Vessels API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/vessels/rest/help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type {
  VesselAccommodation,
  VesselBasic,
  VesselHistory,
  VesselLocation,
  VesselStats,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./types";

// Create a factory function for WSF Vessels API
const createWsfVesselsFetch = createFetchFactory(
  "https://www.wsdot.wa.gov/ferries/api/vessels/rest"
);

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
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselBasic objects containing basic vessel information
 */
export const getVesselBasics =
  createWsfVesselsFetch<VesselBasic[]>("/vesselbasics");

/**
 * API function for fetching vessel basics for a specific vessel from WSF Vessels API
 *
 * Retrieves basic vessel information for a specific vessel identified by vessel ID,
 * including vessel name, abbreviation, class information, and operational status.
 *
 * @param params - Object containing vesselId and optional logMode
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselBasic object containing basic information for the specified vessel
 */
export const getVesselBasicsById = createWsfVesselsFetch<
  { vesselId: number },
  VesselBasic
>("/vesselbasics/{vesselId}");

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
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselLocation objects containing real-time vessel position data
 */
export const getVesselLocations =
  createWsfVesselsFetch<VesselLocation[]>("/vessellocations");

/**
 * API function for fetching current vessel location data for a specific vessel from WSF Vessels API
 *
 * Retrieves real-time vessel position, speed, heading, and status information
 * for a specific vessel identified by vessel ID. This endpoint returns a single vessel object.
 *
 * @param params - Object containing vesselId and optional logMode
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselLocation object containing real-time position data for the specified vessel
 */
export const getVesselLocationsByVesselId = createWsfVesselsFetch<
  { vesselId: number },
  VesselLocation
>("/vessellocations/{vesselId}");

// ============================================================================
// VESSEL ACCOMMODATIONS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel accommodation data from WSF Vessels API
 *
 * Retrieves detailed accommodation information for all vessels in the WSF fleet,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 * This endpoint provides comprehensive information about the capacity and
 * accommodation features of each vessel.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselAccommodation objects containing accommodation information
 */
export const getVesselAccommodations = createWsfVesselsFetch<
  VesselAccommodation[]
>("/vesselaccommodations");

/**
 * API function for fetching vessel accommodation data for a specific vessel from WSF Vessels API
 *
 * Retrieves detailed accommodation information for a specific vessel identified by vessel ID,
 * including passenger capacity, vehicle capacity, and other accommodation details.
 *
 * @param params - Object containing vesselId and optional logMode
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselAccommodation object containing accommodation information for the specified vessel
 */
export const getVesselAccommodationsById = createWsfVesselsFetch<
  { vesselId: number },
  VesselAccommodation
>("/vesselaccommodations/{vesselId}");

// ============================================================================
// VESSEL STATS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel statistics from WSF Vessels API
 *
 * Retrieves statistical information for all vessels in the WSF fleet,
 * including operational statistics, performance metrics, and other relevant data.
 * This endpoint provides comprehensive statistical information about vessel operations.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselStats objects containing vessel statistics
 */
export const getVesselStats =
  createWsfVesselsFetch<VesselStats[]>("/vesselstats");

/**
 * API function for fetching vessel statistics for a specific vessel from WSF Vessels API
 *
 * Retrieves statistical information for a specific vessel identified by vessel ID,
 * including operational statistics, performance metrics, and other relevant data.
 *
 * @param params - Object containing vesselId and optional logMode
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselStats object containing statistics for the specified vessel
 */
export const getVesselStatsById = createWsfVesselsFetch<
  { vesselId: number },
  VesselStats
>("/vesselstats/{vesselId}");

// ============================================================================
// VESSEL HISTORY API FUNCTIONS
// ============================================================================

/**
 * API function for fetching vessel history data from WSF Vessels API
 *
 * Retrieves historical vessel data for all vessels in the WSF fleet,
 * including past routes, schedules, and operational history. This endpoint
 * provides comprehensive historical information about vessel operations.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselHistory objects containing historical vessel data
 */
export const getVesselHistory =
  createWsfVesselsFetch<VesselHistory[]>("/vesselhistory");

/**
 * API function for fetching vessel history data for a specific vessel and date range from WSF Vessels API
 *
 * Retrieves historical vessel data for a specific vessel within a specified date range,
 * including past routes, schedules, and operational history for that vessel.
 *
 * @param params - Object containing vesselName, dateStart, dateEnd, and optional logMode
 * @param params.vesselName - The name of the vessel (e.g., "M/V Cathlamet")
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for the specified vessel and date range
 */
export const getVesselHistoryByVesselAndDateRange = createWsfVesselsFetch<
  {
    vesselName: string;
    dateStart: Date;
    dateEnd: Date;
  },
  VesselHistory[]
>("/vesselhistory/{vesselName}/{dateStart}/{dateEnd}");

// ============================================================================
// VESSEL VERBOSE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching verbose vessel data from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for all vessels in the WSF fleet,
 * including detailed specifications, operational data, and extended information.
 * This endpoint provides the most complete vessel information available.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive vessel information
 */
export const getVesselVerbose =
  createWsfVesselsFetch<VesselVerbose[]>("/vesselverbose");

/**
 * API function for fetching verbose vessel data for a specific vessel from WSF Vessels API
 *
 * Retrieves comprehensive vessel information for a specific vessel identified by vessel ID,
 * including detailed specifications, operational data, and extended information.
 *
 * @param params - Object containing vesselId and optional logMode
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselVerbose object containing comprehensive information for the specified vessel
 */
export const getVesselVerboseById = createWsfVesselsFetch<
  { vesselId: number },
  VesselVerbose
>("/vesselverbose/{vesselId}");

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels API, which indicates when
 * the cached data was last updated. This information is useful for determining
 * the freshness of the cached vessel data.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselsCacheFlushDate object containing the cache flush date, or null if not available
 */
export const getCacheFlushDateVessels =
  createWsfVesselsFetch<VesselsCacheFlushDate | null>("/cacheflushdate");
