// WSDOT Weather Information API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/api";

import type { WeatherInfo } from "./schemas";
import { weatherInfoArraySchema, weatherInfoSchema } from "./schemas";

// Create a factory function for WSDOT Weather Information API
const createFetch = createFetchFactory(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc"
);

/**
 * Get all weather information from WSDOT Weather Information API
 *
 * Retrieves current weather data for all monitored weather stations.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all weather information data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformation();
 * console.log(weatherInfo[0].TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformation = async () => {
  const fetcher = createFetch("/GetCurrentWeatherInformationAsJson");
  const data = await fetcher();
  return weatherInfoArraySchema.parse(data) as WeatherInfo[];
};

/**
 * Get weather information for a specific station by ID from WSDOT Weather Information API
 *
 * Returns detailed weather information for a specific weather station
 * identified by its ID.
 *
 * @param params - Object containing stationId and optional logMode
 * @param params.stationId - The ID of the specific weather station
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific weather station data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationByStationId(1909);
 * console.log(weatherInfo.TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformationByStationId = async (params: {
  stationId: number;
}) => {
  const fetcher = createFetch<{ stationId: number }>(
    "/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}"
  );
  const data = await fetcher(params);
  return weatherInfoSchema.parse(data) as WeatherInfo;
};

/**
 * Get weather information for multiple stations from WSDOT Weather Information API
 *
 * Returns weather information for multiple weather stations specified
 * by their IDs.
 *
 * @param params - Object containing stationIds and optional logMode
 * @param params.stationIds - Comma-separated list of station IDs
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing weather data for the specified stations
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationForStations("1909,1910,1928");
 * console.log(weatherInfo.length); // 3
 * ```
 */
export const getWeatherInformationForStations = async (params: {
  stationIds: string;
}) => {
  const fetcher = createFetch<{ stationIds: string }>(
    "/GetCurrentWeatherForStationsAsJson?StationList={stationIds}"
  );
  const data = await fetcher(params);
  return weatherInfoArraySchema.parse(data) as WeatherInfo[];
};
