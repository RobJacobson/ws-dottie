// WSDOT Commercial Vehicle Restrictions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html
// API Help: https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help

import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import {
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsWithId,
} from "./api";
import type {
  CommercialVehicleRestrictionsResponse,
  CommercialVehicleRestrictionsWithIdResponse,
} from "./types";

/**
 * Hook for getting commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. Uses infrequent
 * update options since restriction data is relatively static.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data
 */
export const useCommercialVehicleRestrictions = (
  options?: Parameters<
    typeof useQuery<CommercialVehicleRestrictionsResponse>
  >[0]
) => {
  return useQuery({
    queryKey: ["commercial-vehicle-restrictions"],
    queryFn: getCommercialVehicleRestrictions,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction. Uses infrequent update options since
 * restriction data is relatively static.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data with unique IDs
 */
export const useCommercialVehicleRestrictionsWithId = (
  options?: UseQueryOptions<CommercialVehicleRestrictionsWithIdResponse>
) => {
  return useQuery({
    queryKey: ["wsdot", "commercialVehicleRestrictions", "withId"],
    queryFn: getCommercialVehicleRestrictionsWithId,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
