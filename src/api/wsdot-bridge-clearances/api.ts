// WSDOT Bridge Clearances API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import { getBridgeClearancesParamsSchema } from "./inputs";
import { bridgeDataGisArraySchema } from "./outputs";

// Base URL path for WSDOT Bridge Clearances API
const WSDOT_BRIDGE_CLEARANCES_BASE = "/Traffic/api/Bridges/ClearanceREST.svc";

/**
 * Get bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route parameter
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @returns Promise containing bridge clearance data for the specified route
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const clearances = await getBridgeClearances({ route: "005" });
 * console.log(clearances[0].CrossingDescription); // "Over I-5"
 * ```
 */
export const getBridgeClearances = async (params: { route: string }) => {
  return zodFetch(
    `${WSDOT_BRIDGE_CLEARANCES_BASE}/GetClearancesAsJson?Route={route}`,
    {
      input: getBridgeClearancesParamsSchema,
      output: bridgeDataGisArraySchema,
    },
    params
  );
};
