// WSDOT Toll Rates API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { createFrequentUpdateOptions } from "@/shared/caching";

import { getTollRates, getTollTripInfo, getTollTripRates } from "./api";
import type {
  TollRatesResponse,
  TollTripInfoResponse,
  TollTripRatesResponse,
} from "./types";

/**
 * React Query hook for retrieving all toll rates
 *
 * @returns React Query result containing toll rates data
 *
 * @example
 * ```typescript
 * const { data: tollRates, isLoading, error } = useTollRates();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {tollRates?.map(rate => (
 *       <div key={rate.TripName}>
 *         <h3>{rate.StartLocationName} to {rate.EndLocationName}</h3>
 *         <p>Current Toll: ${rate.CurrentToll / 100}</p>
 *         <p>Route: {rate.StateRoute}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useTollRates = () => {
  return useQuery<TollRatesResponse>({
    queryKey: ["tollRates"],
    queryFn: getTollRates,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * React Query hook for retrieving toll trip information with geometry
 *
 * @returns React Query result containing toll trip information data
 *
 * @example
 * ```typescript
 * const { data: tripInfo, isLoading, error } = useTollTripInfo();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {tripInfo?.map(trip => (
 *       <div key={trip.TripName}>
 *         <h3>{trip.StartLocationName} to {trip.EndLocationName}</h3>
 *         <p>Direction: {trip.TravelDirection}</p>
 *         <p>Geometry: {trip.Geometry}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useTollTripInfo = () => {
  return useQuery<TollTripInfoResponse>({
    queryKey: ["tollTripInfo"],
    queryFn: getTollTripInfo,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * React Query hook for retrieving toll trip rates with messages
 *
 * @returns React Query result containing toll trip rates data
 *
 * @example
 * ```typescript
 * const { data: tripRates, isLoading, error } = useTollTripRates();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <p>Last Updated: {tripRates?.LastUpdated.toLocaleString()}</p>
 *     {tripRates?.Trips.map(trip => (
 *       <div key={trip.TripName}>
 *         <h3>{trip.TripName}</h3>
 *         <p>Toll: ${trip.Toll / 100}</p>
 *         <p>Message: {trip.Message}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useTollTripRates = () => {
  return useQuery<TollTripRatesResponse>({
    queryKey: ["tollTripRates"],
    queryFn: getTollTripRates,
    ...createFrequentUpdateOptions(),
  });
};
