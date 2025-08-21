// WSDOT Travel Times API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import { getTravelTimeById, getTravelTimes } from "./api";
import type { GetTravelTimeByIdParams, GetTravelTimesParams } from "./inputs";
import type { TravelTimeRoute } from "./outputs";

/**
 * React Query hook for retrieving all travel times
 *
 * Retrieves current travel time data for all monitored routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing travel times data
 */
export const useTravelTimes = (
  params: GetTravelTimesParams = {},
  options?: TanStackOptions<TravelTimeRoute[]>
): UseQueryResult<TravelTimeRoute[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "travel-times", "getTravelTimes", params],
    queryFn: () => getTravelTimes(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving a specific travel time route by ID
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @param options - Optional query options
 * @returns React Query result containing travel time data
 */
export const useTravelTimeById = (
  params: GetTravelTimeByIdParams,
  options?: TanStackOptions<TravelTimeRoute>
): UseQueryResult<TravelTimeRoute, Error> => {
  return useQuery({
    queryKey: ["wsdot", "travel-times", "getTravelTimeById", params],
    queryFn: () => getTravelTimeById(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
