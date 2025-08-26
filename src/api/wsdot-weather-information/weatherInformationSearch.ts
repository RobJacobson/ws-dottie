/**
 * Weather Information Search API
 *
 * Advanced weather data retrieval functions for WSDOT weather stations including
 * multi-station queries and historical data searches. Extends the base weather
 * information API with additional filtering and time-based search capabilities.
 *
 * This module provides functions to retrieve weather data for multiple stations
 * simultaneously and search historical weather records within specified time ranges.
 * Supports comma-separated station ID lists and date range queries for detailed
 * weather analysis and trend monitoring.
 *
 * API Functions:
 * - getWeatherInformationForStations: Returns weather data for multiple specified stations
 * - getSearchWeatherInformation: Returns historical weather data for a station within a time range
 *
 * Input/Output Overview:
 * - getWeatherInformationForStations: Input: { stationIds: string }, Output: WeatherInfo[]
 * - getSearchWeatherInformation: Input: { stationId: number, searchStartTime: Date, searchEndTime: Date }, Output: WeatherInfo[]
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList=1909,1928,1966&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "BarometricPressure": 957.00,
 *     "Latitude": 47.474800000,
 *     "Longitude": -122.270400000,
 *     "PrecipitationInInches": null,
 *     "ReadingTime": "/Date(1756188900000-0700)/",
 *     "RelativeHumidity": 57,
 *     "SkyCoverage": "N/A",
 *     "StationID": 1909,
 *     "StationName": "S 144th St on SB I-5 at mp 155.32",
 *     "TemperatureInFahrenheit": 73.94,
 *     "Visibility": 1,
 *     "WindDirection": 350,
 *     "WindDirectionCardinal": "N",
 *     "WindGustSpeedInMPH": 0,
 *     "WindSpeedInMPH": 0
 *   }
 * ]
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { weatherInfoArraySchema } from "./weatherInformation";

// ============================================================================
// API Functions
//
// getWeatherInformationForStations (multiple stations)
// getSearchWeatherInformation (time-based search)
// ============================================================================

const MULTIPLE_STATIONS_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={stationIds}";
const SEARCH_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?StationID={stationId}&SearchStartTime={searchStartTime}&SearchEndTime={searchEndTime}";

/**
 * Retrieves current weather information for multiple specified weather stations.
 *
 * @param params - Parameters object for multi-station weather query
 * @param params.stationIds - Comma-separated string of station IDs to retrieve weather data for
 * @returns Promise<WeatherInfo[]> - Array of current weather data from specified stations
 *
 * @example
 * const weatherData = await getWeatherInformationForStations({ stationIds: "1909,1928,1966" });
 * console.log(weatherData.length);  // 3
 * console.log(weatherData[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherData[1].StationName);  // "EB I-90 / SR-18 (Echo Lake) at mp 26.30"
 *
 * @throws {Error} When station IDs are invalid, API is unavailable, or authentication fails
 */
export const getWeatherInformationForStations = async (
  params: GetWeatherInformationForStationsParams
) => {
  return zodFetch(
    MULTIPLE_STATIONS_ENDPOINT,
    {
      input: getWeatherInformationForStationsParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

/**
 * Retrieves historical weather information for a specific station within a time range.
 *
 * @param params - Parameters object for historical weather search
 * @param params.stationId - Unique identifier for the specific weather station to search
 * @param params.searchStartTime - Start time for the search period in WSDOT date format
 * @param params.searchEndTime - End time for the search period in WSDOT date format
 * @returns Promise<WeatherInfo[]> - Array of historical weather data within the specified time range
 *
 * @example
 * const startDate = new Date('2024-01-15T00:00:00Z');
 * const endDate = new Date('2024-01-15T23:59:59Z');
 * const weatherData = await getSearchWeatherInformation({
 *   stationId: 1909,
 *   searchStartTime: startDate,
 *   searchEndTime: endDate
 * });
 * console.log(weatherData.length);  // 24 (hourly readings)
 * console.log(weatherData[0].ReadingTime);  // 2024-01-15T00:00:00.000Z
 *
 * @throws {Error} When station ID is invalid, dates are outside supported range, API is unavailable, or authentication fails
 */
export const getSearchWeatherInformation = async (
  params: GetSearchWeatherInformationParams
) => {
  return zodFetch(
    SEARCH_ENDPOINT,
    {
      input: getSearchWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationForStationsParamsSchema
// GetWeatherInformationForStationsParams
// ============================================================================

/**
 * Parameters for retrieving weather information for multiple specified weather stations
 */
export const getWeatherInformationForStationsParamsSchema = z
  .object({
    stationIds: z.string().min(1, "Station IDs cannot be empty").describe(""),
  })
  .describe("");

export type GetWeatherInformationForStationsParams = z.infer<
  typeof getWeatherInformationForStationsParamsSchema
>;

/**
 * Parameters for searching weather information for a specific weather station over a specified time period
 */
export const getSearchWeatherInformationParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to search. This ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint or other weather station listings."
      ),
    searchStartTime: zWsdotDate().describe(
      "Start time for the search period in WSDOT date format. This parameter defines the beginning of the time range for which weather information should be retrieved. The date will be converted to the appropriate WSDOT API format by the fetch layer."
    ),
    searchEndTime: zWsdotDate().describe(
      "End time for the search period in WSDOT date format. This parameter defines the end of the time range for which weather information should be retrieved. The date will be converted to the appropriate WSDOT API format by the fetch layer."
    ),
  })
  .describe(
    "Parameters for searching weather information for a specific weather station over a specified time period. All parameters are required to perform a time-based search."
  );

export type GetSearchWeatherInformationParams = z.infer<
  typeof getSearchWeatherInformationParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherInfoArraySchema (imported from ./getWeatherInformation)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationForStations
// ============================================================================

/**
 * TanStack Query hook for multiple weather stations with automatic updates (array).
 *
 * @param params - Parameters object for multi-station weather query
 * @param params.stationIds - Comma-separated string of station IDs to retrieve weather data for
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherInfo[], Error> - Query result with array of current weather data from specified stations
 *
 * @example
 * const { data: weatherData, isLoading } = useWeatherInformationForStations({ stationIds: "1909,1928,1966" });
 * if (weatherData) {
 *   console.log(weatherData.length);  // 3
 *   console.log(weatherData[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * }
 */
export const useWeatherInformationForStations = (
  params: GetWeatherInformationForStationsParams,
  options?: TanStackOptions<import("./weatherInformation").WeatherInfo[]>
): UseQueryResult<import("./weatherInformation").WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationForStations",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformationForStations(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for historical weather search with automatic updates (array).
 *
 * @param params - Parameters object for historical weather search
 * @param params.stationId - Unique identifier for the specific weather station to search
 * @param params.searchStartTime - Start time for the search period in WSDOT date format
 * @param params.searchEndTime - End time for the search period in WSDOT date format
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherInfo[], Error> - Query result with array of historical weather data within specified time range
 *
 * @example
 * const startDate = new Date('2024-01-15T00:00:00Z');
 * const endDate = new Date('2024-01-15T23:59:59Z');
 * const { data: weatherData, isLoading } = useSearchWeatherInformation({
 *   stationId: 1909,
 *   searchStartTime: startDate,
 *   searchEndTime: endDate
 * });
 * if (weatherData) {
 *   console.log(weatherData.length);  // 24 (hourly readings)
 *   console.log(weatherData[0].ReadingTime);  // 2024-01-15T00:00:00.000Z
 * }
 */
export const useSearchWeatherInformation = (
  params: GetSearchWeatherInformationParams,
  options?: TanStackOptions<import("./weatherInformation").WeatherInfo[]>
): UseQueryResult<import("./weatherInformation").WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getSearchWeatherInformation",
      JSON.stringify(params),
    ],
    queryFn: () => getSearchWeatherInformation(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
