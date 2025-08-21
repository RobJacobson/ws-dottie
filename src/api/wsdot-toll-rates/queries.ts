// WSDOT Toll Rates API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import { getTollRates, getTollTripInfo, getTollTripRates } from "./api";
import type {
  GetTollRatesParams,
  GetTollTripInfoParams,
  GetTollTripRatesParams,
} from "./inputs";
import type { TollRate, TollTripInfo, TollTripRates } from "./outputs";

/**
 * React Query hook for retrieving all toll rates
 *
 * Returns current toll rates for all WSDOT toll facilities, including
 * pricing information and facility details.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing toll rates data
 *
 * @example
 * ```typescript
 * const { data: tollRates } = useTollRates({});
 * console.log(tollRates[0].CurrentToll); // 125
 * ```
 */
export const useTollRates = (
  params: GetTollRatesParams = {},
  options?: TanStackOptions<TollRate[]>
): UseQueryResult<TollRate[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollRates", params],
    queryFn: () => getTollRates(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving toll trip information with geometry
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing toll trip information data
 *
 * @example
 * ```typescript
 * const { data: tripInfo } = useTollTripInfo({});
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const useTollTripInfo = (
  params: GetTollTripInfoParams = {},
  options?: TanStackOptions<TollTripInfo[]>
): UseQueryResult<TollTripInfo[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo", params],
    queryFn: () => getTollTripInfo(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving toll trip rates with messages
 *
 * Returns current toll trip rates along with system messages and
 * last updated timestamps.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing toll trip rates data
 *
 * @example
 * ```typescript
 * const { data: tripRates } = useTollTripRates({});
 * console.log(tripRates.LastUpdated); // Date object
 * console.log(tripRates.Trips[0].Toll); // 0
 * ```
 */
export const useTollTripRates = (
  params: GetTollTripRatesParams = {},
  options?: TanStackOptions<TollTripRates>
): UseQueryResult<TollTripRates, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates", params],
    queryFn: () => getTollTripRates(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
