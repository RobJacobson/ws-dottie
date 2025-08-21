// WSDOT Commercial Vehicle Restrictions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "./api";
import type {
  GetCommercialVehicleRestrictionsParams,
  GetCommercialVehicleRestrictionsWithIdParams,
} from "./inputs";
import type {
  CommercialVehicleRestriction,
  CommercialVehicleRestrictionWithId,
} from "./outputs";

/**
 * Hook for getting commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictions({});
 * console.log(restrictions?.[0]?.BridgeName); // "Aurora Bridge"
 * ```
 */
export const useCommercialVehicleRestrictions = (
  params: GetCommercialVehicleRestrictionsParams = {},
  options?: TanStackOptions<CommercialVehicleRestriction[]>
): UseQueryResult<CommercialVehicleRestriction[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictions",
      params,
    ],
    queryFn: () => getCommercialVehicleRestrictions(params),
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
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data with unique IDs
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictionsWithId({});
 * console.log(restrictions?.[0]?.UniqueID); // "12345"
 * ```
 */
export const useCommercialVehicleRestrictionsWithId = (
  params: GetCommercialVehicleRestrictionsWithIdParams = {},
  options?: TanStackOptions<CommercialVehicleRestrictionWithId[]>
): UseQueryResult<CommercialVehicleRestrictionWithId[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictionsWithId",
      params,
    ],
    queryFn: () => getCommercialVehicleRestrictionsWithId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
