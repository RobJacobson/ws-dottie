// WSDOT Bridge Clearances API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html
// API Help: https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getBridgeClearances } from "./api";
import type { BridgeClearancesResponse } from "./types";

/**
 * Hook for getting bridge clearances from WSDOT Bridge Clearances API
 *
 * Returns bridge clearance data for a specific route. Uses infrequent update options
 * since bridge clearance data is relatively static.
 *
 * @param route - WSDOT route identifier (e.g., "005" for I-5)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with bridge clearance data
 */
export const useBridgeClearances = (
  route: string,
  options?: Parameters<typeof useQuery<BridgeClearancesResponse>>[0]
) => {
  return useQuery({
    queryKey: ["bridge-clearances", route],
    queryFn: () => getBridgeClearances(route),
    enabled: !!route,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
