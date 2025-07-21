// WSDOT Bridge Clearances API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { fetchWsdot } from "@/shared/fetching/fetchWsdot";

import type { BridgeClearancesResponse } from "./types";

/**
 * Get bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param route - WSDOT route identifier (e.g., "005" for I-5)
 * @returns Promise resolving to array of bridge clearance data
 */
export const getBridgeClearances = async (
  route: string
): Promise<BridgeClearancesResponse> => {
  return fetchWsdot<BridgeClearancesResponse>(
    "bridgeClearances",
    `/GetClearancesAsJson?Route=${encodeURIComponent(route)}`
  );
};
