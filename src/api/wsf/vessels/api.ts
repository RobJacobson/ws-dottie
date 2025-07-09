// WSF Vessels API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";

import type {
  VesselLocation,
  VesselsCacheFlushDate,
  VesselVerbose,
} from "./types";

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
 * for a specific vessel identified by vessel ID. This endpoint filters the
 * resultset to a single vessel, providing current location data including
 * GPS coordinates, vessel speed, heading direction, and operational status.
 *
 * The data is updated frequently and provides the most current information
 * about the specified vessel's location for tracking and monitoring purposes.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to an array of VesselLocation objects containing real-time position data for the specified vessel
 */
export const getVesselLocationsByVesselId = (
  vesselId: number
): Promise<VesselLocation[]> =>
  fetchWsfArray<VesselLocation>(
    "vessels",
    buildWsfUrl("/vessellocations/{vesselId}", { vesselId })
  );

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
 * filters the resultset to a single vessel, providing detailed information about vessel
 * dimensions, passenger and vehicle capacity, onboard amenities, and current operational status.
 *
 * This data is updated infrequently and provides static vessel characteristics
 * that don't change often, such as vessel specifications and capabilities.
 *
 * @param vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to an array of VesselVerbose objects containing comprehensive information for the specified vessel
 */
export const getVesselVerboseById = (
  vesselId: number
): Promise<VesselVerbose[]> =>
  fetchWsfArray<VesselVerbose>(
    "vessels",
    buildWsfUrl("/vesselverbose/{vesselId}", { vesselId })
  );

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
