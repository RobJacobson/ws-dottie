// WSDOT Weather Information API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

import { createFetchFunction } from "@/shared/fetching/fetchApi";

import type { WeatherInfo, WeatherInformationResponse } from "./types";

// Module-scoped fetch function for weather information API
const fetchWeatherInformation = createFetchFunction(
  "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc"
);

/**
 * Retrieves all weather information from WSDOT API
 *
 * @returns Promise resolving to an array of weather information
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformation();
 * console.log(weatherInfo[0].TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformation = (): Promise<WeatherInformationResponse> =>
  fetchWeatherInformation<WeatherInformationResponse>(
    "/GetCurrentWeatherInformationAsJson"
  );

/**
 * Retrieves weather information for a specific station by ID from WSDOT API
 *
 * @param stationId - The ID of the specific weather station
 * @returns Promise resolving to weather information for the station
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationByStationId(1909);
 * console.log(weatherInfo.TemperatureInFahrenheit); // 66.38
 * ```
 */
export const getWeatherInformationByStationId = (
  stationId: number
): Promise<WeatherInfo> =>
  fetchWeatherInformation<WeatherInfo>(
    `/GetCurrentWeatherInformationByStationIDAsJson?StationID=${stationId}`
  );

/**
 * Retrieves weather information for multiple stations from WSDOT API
 *
 * @param stationIds - Comma-separated list of station IDs
 * @returns Promise resolving to an array of weather information for the specified stations
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationForStations("1909,1910,1928");
 * console.log(weatherInfo.length); // 3
 * ```
 */
export const getWeatherInformationForStations = (
  stationIds: string
): Promise<WeatherInformationResponse> =>
  fetchWeatherInformation<WeatherInformationResponse>(
    `/GetCurrentWeatherForStationsAsJson?StationList=${stationIds}`
  );
