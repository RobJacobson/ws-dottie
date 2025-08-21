// WSF Vessels API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/vessels/rest/help

import { createZodFetchFactory as createFetchFactory } from "@/shared/fetching/api";

// Input parameter types and schemas
import type {
  GetAllVesselHistoriesParams,
  GetMultipleVesselHistoriesParams,
  GetVesselAccommodationsByIdParams,
  GetVesselBasicsByIdParams,
  GetVesselHistoryByVesselAndDateRangeParams,
  GetVesselLocationsByVesselIdParams,
  GetVesselStatsByIdParams,
  GetVesselVerboseByIdParams,
} from "./inputs";
import {
  getVesselAccommodationsByIdParamsSchema,
  getVesselBasicsByIdParamsSchema,
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  getVesselLocationsByVesselIdParamsSchema,
  getVesselStatsByIdParamsSchema,
  getVesselVerboseByIdParamsSchema,
} from "./inputs";
// Response types and schemas
import type {
  VesselAccommodation,
  VesselBasic,
  VesselHistory,
  VesselLocation,
  VesselStats,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./outputs";
import {
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselHistoryArraySchema,
  vesselLocationArraySchema,
  vesselLocationSchema,
  vesselStatsArraySchema,
  vesselStatsSchema,
  vesselsCacheFlushDateSchema,
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "./outputs";

// ============================================================================
// SHARED CONFIGURATION
// ============================================================================

// Create a factory function for WSF Vessels API
const createFetch = createFetchFactory("/ferries/api/vessels/rest");

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
 *
 * @example
 * ```typescript
 * const vessels = await getVesselBasics();
 * console.log(vessels[0].VesselName); // "M/V Cathlamet"
 * ```
 */
export const getVesselBasics = async () => {
  const fetcher = createFetch("/vesselbasics", {
    output: vesselBasicArraySchema,
  });
  return fetcher() as Promise<VesselBasic[]>;
};

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
 *
 * @example
 * ```typescript
 * const vessel = await getVesselBasicsById({ vesselId: 1 });
 * console.log(vessel.VesselName); // "M/V Cathlamet"
 * ```
 */
export const getVesselBasicsById = async (
  params: GetVesselBasicsByIdParams
) => {
  const fetcher = createFetch<GetVesselBasicsByIdParams>(
    "/vesselbasics/{vesselId}",
    {
      input: getVesselBasicsByIdParamsSchema,
      output: vesselBasicSchema,
    }
  );
  return fetcher(params) as Promise<VesselBasic>;
};

// ============================================================================
// VESSEL LOCATIONS API FUNCTIONS
// Real-time GPS tracking and vessel positioning
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
 *
 * @example
 * ```typescript
 * const locations = await getVesselLocations();
 * console.log(locations[0].VesselName); // "M/V Cathlamet"
 * ```
 */
export const getVesselLocations = async () => {
  const fetcher = createFetch("/vessellocations", {
    output: vesselLocationArraySchema,
  });
  return fetcher() as Promise<VesselLocation[]>;
};

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
export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
) => {
  const fetcher = createFetch<GetVesselLocationsByVesselIdParams>(
    "/vessellocations/{vesselId}",
    {
      input: getVesselLocationsByVesselIdParamsSchema,
      output: vesselLocationSchema,
    }
  );
  return fetcher(params) as Promise<VesselLocation>;
};

// ============================================================================
// VESSEL ACCOMMODATIONS API FUNCTIONS
// Passenger amenities, accessibility, and facility information
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
export const getVesselAccommodations = async () => {
  const fetcher = createFetch("/vesselaccommodations", {
    output: vesselAccommodationArraySchema,
  });
  return fetcher() as Promise<VesselAccommodation[]>;
};

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
export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
) => {
  const fetcher = createFetch<GetVesselAccommodationsByIdParams>(
    "/vesselaccommodations/{vesselId}",
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    }
  );
  return fetcher(params) as Promise<VesselAccommodation>;
};

// ============================================================================
// VESSEL STATISTICS API FUNCTIONS
// Technical specifications, capacity, and performance data
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
export const getVesselStats = async () => {
  const fetcher = createFetch("/vesselstats", {
    output: vesselStatsArraySchema,
  });
  return fetcher() as Promise<VesselStats[]>;
};

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
export const getVesselStatsById = async (params: GetVesselStatsByIdParams) => {
  const fetcher = createFetch<GetVesselStatsByIdParams>(
    "/vesselstats/{vesselId}",
    {
      input: getVesselStatsByIdParamsSchema,
      output: vesselStatsSchema,
    }
  );
  return fetcher(params) as Promise<VesselStats>;
};

// ============================================================================
// VESSEL HISTORY API FUNCTIONS
// Historical operational data and route information
// ============================================================================

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
export const getVesselHistoryByVesselAndDateRange = async (
  params: GetVesselHistoryByVesselAndDateRangeParams
) => {
  const fetcher = createFetch<GetVesselHistoryByVesselAndDateRangeParams>(
    "/vesselhistory/{vesselName}/{dateStart}/{dateEnd}",
    {
      input: getVesselHistoryByVesselAndDateRangeParamsSchema,
      output: vesselHistoryArraySchema,
    }
  );
  return fetcher(params) as Promise<VesselHistory[]>;
};

/**
 * Helper function for fetching vessel history data for multiple vessels and date range
 *
 * This function fetches historical data for multiple vessels by making parallel API calls
 * to the vessel history endpoint for each vessel. This is useful when you need historical
 * data for multiple vessels over the same time period.
 *
 * @param params - Object containing vesselNames, dateStart, dateEnd, and optional batchSize
 * @param params.vesselNames - Array of vessel names to fetch history for (e.g., ["Spokane", "Walla Walla"])
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for all specified vessels
 *
 * @example
 * ```typescript
 * const history = await getMultipleVesselHistories({
 *   vesselNames: ["Spokane", "Walla Walla"],
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-02")
 * });
 * console.log(history.length); // Total number of history records for all vessels
 * ```
 */
export const getMultipleVesselHistories = async (
  params: GetMultipleVesselHistoriesParams
): Promise<VesselHistory[]> => {
  const { vesselNames, dateStart, dateEnd, batchSize = 6 } = params;
  const results: VesselHistory[] = [];

  // Process in batches to avoid overwhelming the server and browser connection limits
  for (let i = 0; i < vesselNames.length; i += batchSize) {
    const batch = vesselNames.slice(i, i + batchSize);
    const batchPromises = batch.map((vesselName) =>
      getVesselHistoryByVesselAndDateRange({
        vesselName,
        dateStart,
        dateEnd,
      })
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.flat());
  }

  return results;
};

/**
 * Helper function for fetching vessel history data for all vessels in the WSF fleet
 *
 * This function fetches historical data for all 21 vessels in the Washington State Ferries fleet
 * by making batched API calls to the vessel history endpoint. This provides comprehensive
 * historical data for the entire fleet over a specified time period.
 *
 * @param params - Object containing dateStart, dateEnd, and optional batchSize
 * @param params.dateStart - The start date for the history range
 * @param params.dateEnd - The end date for the history range
 * @param params.batchSize - Optional batch size for processing requests (default: 6)
 * @returns Promise resolving to an array of VesselHistory objects containing historical data for all vessels
 *
 * @example
 * ```typescript
 * const allHistory = await getAllVesselHistories({
 *   dateStart: new Date("2024-01-01"),
 *   dateEnd: new Date("2024-01-02")
 * });
 * console.log(allHistory.length); // Total number of history records for all 21 vessels
 * ```
 */
export const getAllVesselHistories = async (
  params: GetAllVesselHistoriesParams
): Promise<VesselHistory[]> => {
  // All vessels in the WSF fleet (as of 2024)
  const allVesselNames = [
    "Cathlamet",
    "Chelan",
    "Chetzemoka",
    "Chimacum",
    "Issaquah",
    "Kaleetan",
    "Kennewick",
    "Kitsap",
    "Kittitas",
    "Puyallup",
    "Salish",
    "Samish",
    "Sealth",
    "Spokane",
    "Suquamish",
    "Tacoma",
    "Tillikum",
    "Tokitae",
    "Walla Walla",
    "Wenatchee",
    "Yakima",
  ];

  return getMultipleVesselHistories({
    vesselNames: allVesselNames,
    dateStart: params.dateStart,
    dateEnd: params.dateEnd,
    batchSize: params.batchSize,
  });
};

// ============================================================================
// VESSEL VERBOSE API FUNCTIONS
// Comprehensive vessel information (combines all data types)
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
export const getVesselVerbose = async () => {
  const fetcher = createFetch("/vesselverbose", {
    output: vesselVerboseArraySchema,
  });
  return fetcher() as Promise<VesselVerbose[]>;
};

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
export const getVesselVerboseById = async (
  params: GetVesselVerboseByIdParams
) => {
  const fetcher = createFetch<GetVesselVerboseByIdParams>(
    "/vesselverbose/{vesselId}",
    {
      input: getVesselVerboseByIdParamsSchema,
      output: vesselVerboseSchema,
    }
  );
  return fetcher(params) as Promise<VesselVerbose>;
};

// ============================================================================
// CACHE MANAGEMENT API FUNCTIONS
// Data freshness and cache invalidation utilities
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Vessels API
 *
 * Retrieves the cache flush date for the vessels API, which indicates when
 * the cached data was last updated. This information is useful for determining
 * the freshness of the cached vessel data.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a VesselsCacheFlushDate object containing the cache flush date
 */
export const getCacheFlushDateVessels = async () => {
  const fetcher = createFetch("/cacheflushdate", {
    output: vesselsCacheFlushDateSchema,
  });
  return fetcher() as Promise<VesselsCacheFlushDate>;
};
