// WSDOT Bridge Clearances API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import { getBridgeClearances } from "./api";
import type { GetBridgeClearancesParams } from "./inputs";
import type { BridgeDataGIS } from "./outputs";

/**
 * Hook for getting bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route parameter
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with bridge clearance data
 *
 * @example
 * ```typescript
 * const { data: clearances } = useBridgeClearances({ route: "005" });
 * console.log(clearances?.[0]?.CrossingDescription); // "Over I-5"
 * ```
 */
export const useBridgeClearances = (
  params: GetBridgeClearancesParams,
  options?: TanStackOptions<BridgeDataGIS[]>
): UseQueryResult<BridgeDataGIS[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "bridge-clearances", "getBridgeClearances", params],
    queryFn: () => getBridgeClearances(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
