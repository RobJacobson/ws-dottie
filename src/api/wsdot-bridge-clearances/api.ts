// WSDOT Bridge Clearances API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { createApiClient } from "@/shared/fetching/apiClient";

import type { BridgeDataGIS } from "./types";

// Module-scoped fetch function for bridge clearances API
const fetchBridgeClearances = createApiClient(
  "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc"
);

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
): Promise<BridgeDataGIS[]> => {
  return fetchBridgeClearances<BridgeDataGIS[]>(
    `/GetClearancesAsJson?Route=${encodeURIComponent(route)}`
  );
};
