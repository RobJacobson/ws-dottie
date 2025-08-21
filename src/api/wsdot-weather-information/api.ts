// WSDOT Weather Information API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  type GetWeatherInformationByStationIdParams,
  type GetWeatherInformationForStationsParams,
  type GetWeatherInformationParams,
  getWeatherInformationByStationIdParamsSchema,
  getWeatherInformationForStationsParamsSchema,
  getWeatherInformationParamsSchema,
} from "./inputs";
import type { WeatherInfo } from "./outputs";
import { weatherInfoArraySchema, weatherInfoSchema } from "./outputs";

// Create a factory function for WSDOT Weather Information API
const createFetch = createZodFetchFactory(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc"
);

/**
 * Get all weather information from WSDOT Weather Information API
 *
 * Retrieves current weather data for all monitored weather stations.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all weather information data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformation({});
 * console.log(weatherInfo[0].TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformation = async (
  params: GetWeatherInformationParams = {}
) => {
  const fetcher = createFetch<GetWeatherInformationParams>(
    "/GetCurrentWeatherInformationAsJson",
    {
      input: getWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    }
  );
  return fetcher(params) as Promise<WeatherInfo[]>;
};

/**
 * Get weather information for a specific station by ID from WSDOT Weather Information API
 *
 * Returns detailed weather information for a specific weather station
 * identified by its ID.
 *
 * @param params - Object containing stationId parameter
 * @param params.stationId - The ID of the specific weather station
 * @returns Promise containing the specific weather station data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationByStationId({ stationId: 1909 });
 * console.log(weatherInfo.TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformationByStationId = async (
  params: GetWeatherInformationByStationIdParams
) => {
  const fetcher = createFetch<GetWeatherInformationByStationIdParams>(
    "/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}",
    {
      input: getWeatherInformationByStationIdParamsSchema,
      output: weatherInfoSchema,
    }
  );
  return fetcher(params) as Promise<WeatherInfo>;
};

/**
 * Get weather information for multiple stations from WSDOT Weather Information API
 *
 * Returns weather information for multiple weather stations specified
 * by their IDs.
 *
 * @param params - Object containing stationIds parameter
 * @param params.stationIds - Comma-separated list of station IDs
 * @returns Promise containing weather data for the specified stations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationForStations({ stationIds: "1909,1910,1928" });
 * console.log(weatherInfo.length); // 3
 * ```
 */
export const getWeatherInformationForStations = async (
  params: GetWeatherInformationForStationsParams
) => {
  const fetcher = createFetch<GetWeatherInformationForStationsParams>(
    "/GetCurrentWeatherForStationsAsJson?StationList={stationIds}",
    {
      input: getWeatherInformationForStationsParamsSchema,
      output: weatherInfoArraySchema,
    }
  );
  return fetcher(params) as Promise<WeatherInfo[]>;
};
