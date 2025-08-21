// WSDOT Bridge Clearances API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import { getBridgeClearancesParamsSchema } from "./inputs";
import type { BridgeDataGIS } from "./outputs";
import { bridgeDataGisArraySchema } from "./outputs";

// Create a factory function for WSDOT Bridge Clearances API
const createFetch = createZodFetchFactory(
  "/Traffic/api/Bridges/ClearanceREST.svc"
);

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
  const fetcher = createFetch<{ route: string }>(
    "/GetClearancesAsJson?Route={route}",
    {
      input: getBridgeClearancesParamsSchema,
      output: bridgeDataGisArraySchema,
    }
  );
  return fetcher(params) as Promise<BridgeDataGIS[]>;
};
