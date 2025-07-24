// WSDOT Bridge Clearances API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getBridgeClearances } from "./api";
import type { BridgeDataGIS } from "./types";

/**
 * Hook for getting bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. The Route parameter is required
 * and should be a valid WSDOT route identifier (e.g., "005" for I-5).
 *
 * @param params - Object containing route
 * @param params.route - The WSDOT route identifier (e.g., "005" for I-5)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with bridge clearance data
 *
 * @example
 * ```typescript
 * const { data: clearances } = useBridgeClearances({ route: "005" });
 * console.log(clearances?.[0]?.BridgeName); // "Aurora Bridge"
 * ```
 */
export const useBridgeClearances = (
  params: { route: string },
  options?: Parameters<typeof useQuery<BridgeDataGIS[]>>[0]
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "bridge-clearances",
      "getBridgeClearances",
      params.route,
    ],
    queryFn: () => getBridgeClearances({ route: params.route }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
