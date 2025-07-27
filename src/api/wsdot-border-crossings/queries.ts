// WSDOT Border Crossings API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import { getBorderCrossings } from "./api";
import type { BorderCrossingData } from "./types";

/**
 * Hook for getting border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Uses frequent update options since border crossing data changes frequently.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with border crossing data
 *
 * @example
 * ```typescript
 * const { data: crossings } = useBorderCrossings();
 * console.log(crossings?.[0]?.CrossingName); // "Peace Arch"
 * ```
 */
export const useBorderCrossings = (
  options?: QueryOptionsWithoutKey<BorderCrossingData[]>
): UseQueryResult<BorderCrossingData[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
    queryFn: () => getBorderCrossings(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
