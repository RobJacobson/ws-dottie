// WSDOT Weather Stations API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import { getWeatherStations } from "./api";
import type { WeatherStationData } from "./types";

/**
 * React Query hook for retrieving WSDOT weather stations
 *
 * Retrieves information about all weather stations maintained by WSDOT.
 *
 * @param options - Optional query options
 * @returns React Query result containing weather stations data
 *
 * @example
 * ```typescript
 * const { data: weatherStations } = useWeatherStations();
 * console.log(weatherStations[0].StationName); // "Alpental"
 * ```
 */
export const useWeatherStations = (
  options?: QueryOptionsWithoutKey<WeatherStationData[]>
): UseQueryResult<WeatherStationData[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "weather-stations", "getWeatherStations"],
    queryFn: () => getWeatherStations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
