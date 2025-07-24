// WSDOT Bridge Clearances API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type { BridgeDataGIS } from "./types";

// Create a factory function for WSDOT Bridge Clearances API
const createWsdotBridgeClearancesFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc"
);

/**
 * Get bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route and optional logMode
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing bridge clearance data for the specified route
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const clearances = await getBridgeClearances({ route: "005" });
 * console.log(clearances[0].BridgeName); // "Aurora Bridge"
 * ```
 */
export const getBridgeClearances = createWsdotBridgeClearancesFetch<
  { route: string },
  BridgeDataGIS[]
>("/GetClearancesAsJson?Route={route}");
