// WSDOT Weather Information API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { TanStackOptions } from "@/shared/types";

import {
  getWeatherInformation,
  getWeatherInformationByStationId,
  getWeatherInformationForStations,
} from "./api";
import type {
  GetWeatherInformationByStationIdParams,
  GetWeatherInformationForStationsParams,
  GetWeatherInformationParams,
} from "./inputs";
import type { WeatherInfo } from "./outputs";

/**
 * React Query hook for retrieving all weather information
 *
 * Retrieves current weather data for all monitored weather stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformation = (
  params: GetWeatherInformationParams = {},
  options?: TanStackOptions<WeatherInfo[]>
): UseQueryResult<WeatherInfo[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "weather-information", "getWeatherInformation", params],
    queryFn: () => getWeatherInformation(params),
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
 * @param params - Object containing stationId parameter
 * @param params.stationId - The ID of the specific weather station
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformationByStationId = (
  params: GetWeatherInformationByStationIdParams,
  options?: TanStackOptions<WeatherInfo>
): UseQueryResult<WeatherInfo, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationByStationId",
      params,
    ],
    queryFn: () => getWeatherInformationByStationId(params),
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
 * @param params - Object containing stationIds parameter
 * @param params.stationIds - Comma-separated list of station IDs
 * @param options - Optional query options
 * @returns React Query result containing weather information data
 */
export const useWeatherInformationForStations = (
  params: GetWeatherInformationForStationsParams,
  options?: TanStackOptions<WeatherInfo[]>
): UseQueryResult<WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationForStations",
      params,
    ],
    queryFn: () => getWeatherInformationForStations(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
