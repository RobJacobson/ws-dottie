// WSDOT Weather Information API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "./api";
import type { WeatherInfo } from "./types";

/**
 * React Query hook for retrieving all weather information
 *
 * Retrieves current weather data for all monitored weather stations.
 *
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformation = (
  options?: QueryOptionsWithoutKey<WeatherInfo[]>
) => {
  return useQuery({
    queryKey: ["wsdot", "weather-information", "getWeatherInformation"],
    queryFn: () => getWeatherInformation(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving weather information for a specific station
 *
 * Returns detailed weather information for a specific weather station
 * identified by its ID.
 *
 * @param params - Object containing stationId
 * @param params.stationId - The ID of the specific weather station
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformationByStationId = (
  params: { stationId: number },
  options?: QueryOptionsWithoutKey<WeatherInfo>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationByStationId",
      params.stationId,
    ],
    queryFn: () =>
      getWeatherInformationByStationId({ stationId: params.stationId }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving weather information for multiple stations
 *
 * Returns weather information for multiple weather stations specified
 * by their IDs.
 *
 * @param params - Object containing stationIds
 * @param params.stationIds - Array of station IDs
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformationForStations = (
  params: { stationIds: number[] },
  options?: QueryOptionsWithoutKey<WeatherInfo[]>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationForStations",
      params.stationIds,
    ],
    queryFn: () =>
      getWeatherInformationForStations({
        stationIds: params.stationIds.join(","),
      }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
