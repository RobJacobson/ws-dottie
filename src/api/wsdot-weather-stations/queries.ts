// WSDOT Weather Stations API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";

import { getWeatherStations } from "./api";
import type { WeatherStationData } from "./types";

/**
 * React Query hook for retrieving WSDOT weather stations
 * This endpoint provides information about all weather stations maintained by WSDOT
 *
 * @returns React Query result containing weather stations data
 *
 * @example
 * ```typescript
 * const { data: weatherStations, isLoading, error } = useWeatherStations();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {weatherStations?.map(station => (
 *       <div key={station.StationCode}>
 *         <h3>{station.StationName}</h3>
 *         <p>Station Code: {station.StationCode}</p>
 *         <p>Location: ({station.Latitude}, {station.Longitude})</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useWeatherStations = (
  options?: Parameters<typeof useQuery<WeatherStationData[]>>[0]
) => {
  return useQuery({
    queryKey: ["wsdot", "weather-stations", "getWeatherStations"],
    queryFn: () => getWeatherStations(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
