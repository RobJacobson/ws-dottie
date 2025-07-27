// WSDOT Commercial Vehicle Restrictions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "./api";
import type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
} from "./types";

/**
 * Hook for getting commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictions();
 * console.log(restrictions?.[0]?.RouteName); // "I-5"
 * ```
 */
export const useCommercialVehicleRestrictions = (
  options?: QueryOptionsWithoutKey<CommercialVehicleRestriction[]>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictions",
    ],
    queryFn: () => getCommercialVehicleRestrictions(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data with unique IDs
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictionsWithId();
 * console.log(restrictions?.[0]?.RestrictionID); // 12345
 * ```
 */
export const useCommercialVehicleRestrictionsWithId = (
  options?: QueryOptionsWithoutKey<CommercialVehicleRestrictionWithId[]>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictionsWithId",
    ],
    queryFn: () => getCommercialVehicleRestrictionsWithId(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
