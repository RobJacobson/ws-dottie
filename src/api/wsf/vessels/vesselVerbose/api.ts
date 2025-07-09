// Vessel verbose API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { VesselVerbose } from "../types";

// Main API functions
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
