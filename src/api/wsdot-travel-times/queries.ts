// WSDOT Travel Times API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getTravelTimeById, getTravelTimes } from "./api";
import type { TravelTimeRoute } from "./types";

/**
 * React Query hook for retrieving all travel times
 *
 * @returns React Query result containing travel times data
 *
 * @example
 * ```typescript
 * const { data: travelTimes, isLoading, error } = useTravelTimes();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {travelTimes?.map(route => (
 *       <div key={route.TravelTimeID}>
 *         <h3>{route.Name}</h3>
 *         <p>Current Time: {route.CurrentTime} minutes</p>
 *         <p>Average Time: {route.AverageTime} minutes</p>
 *         <p>Distance: {route.Distance} miles</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useTravelTimes = (
  options?: Parameters<typeof useQuery<TravelTimeRoute[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsdot", "travel-times", "getTravelTimes"],
    queryFn: () => getTravelTimes(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving a specific travel time by ID
 *
 * @param travelTimeId - The ID of the specific travel time route
 * @returns React Query result containing travel time data
 *
 * @example
 * ```typescript
 * const { data: travelTime, isLoading, error } = useTravelTimeById(2);
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{travelTime?.Name}</h2>
 *     <p>Current Time: {travelTime?.CurrentTime} minutes</p>
 *     <p>Average Time: {travelTime?.AverageTime} minutes</p>
 *     <p>Distance: {travelTime?.Distance} miles</p>
 *     <p>From: {travelTime?.StartPoint.Description}</p>
 *     <p>To: {travelTime?.EndPoint.Description}</p>
 *   </div>
 * );
 * ```
 */
export const useTravelTimeById = (
  travelTimeId: number,
  options?: Parameters<typeof useQuery<TravelTimeRoute>>[0]
) => {
  return useQuery({
    queryKey: ["wsdot", "travel-times", "getTravelTimeById", travelTimeId],
    queryFn: () => getTravelTimeById({ travelTimeId }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    enabled: travelTimeId > 0,
    ...options,
  });
};
