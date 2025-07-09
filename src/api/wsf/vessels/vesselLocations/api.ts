// VesselLocations API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { VesselLocation } from "../types";

// Main API functions
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
