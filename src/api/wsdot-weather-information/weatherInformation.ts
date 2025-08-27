/**
 * Weather Information API
 *
 * Real-time weather data from WSDOT-maintained weather stations across Washington State highways.
 * Provides current conditions including temperature, humidity, wind speed/direction, visibility,
 * barometric pressure, and precipitation data from roadside weather monitoring stations.
 *
 * This API supports retrieving weather data for all stations, specific stations by ID,
 * multiple stations by ID list, and historical data searches within specified time ranges.
 * Data is updated frequently and includes GPS coordinates for each weather station location.
 *
 * API Functions:
 * - getWeatherInformation: Returns weather data for all active weather stations
 * - getWeatherInformationByStationId: Returns weather data for a specific station by ID
 *
 * Input/Output Overview:
 * - getWeatherInformation: Input: none, Output: WeatherInfo[]
 * - getWeatherInformationByStationId: Input: { stationId: number }, Output: WeatherInfo
 *
 * Base Type: WeatherInfo
 *
 * interface WeatherInfo {
 *   BarometricPressure: number | null;
 *   Latitude: number;
 *   Longitude: number;
 *   PrecipitationInInches: number | null;
 *   ReadingTime: Date;
 *   RelativeHumidity: number | null;
 *   SkyCoverage: string | null;
 *   StationID: number;
 *   StationName: string;
 *   TemperatureInFahrenheit: number | null;
 *   Visibility: number | null;
 *   WindDirection: number | null;
 *   WindDirectionCardinal: string | null;
 *   WindGustSpeedInMPH: number | null;
 *   WindSpeedInMPH: number | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
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

import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Functions
//
// getWeatherInformation (array)
// getWeatherInformationByStationId (single item)
// ============================================================================

const ALL_WEATHER_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson";
const STATION_BY_ID_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}";

/**
 * Retrieves current weather information for all WSDOT-maintained weather stations.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<WeatherInfo[]> - Array of current weather data from all active stations
 *
 * @example
 * const weatherData = await getWeatherInformation();
 * console.log(weatherData.length);  // 85
 * console.log(weatherData[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherData[0].TemperatureInFahrenheit);  // 73.94
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getWeatherInformation = async (
  params: GetWeatherInformationParams = {}
) => {
  return zodFetch(
    ALL_WEATHER_ENDPOINT,
    {
      input: getWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

/**
 * Retrieves current weather information for a specific weather station by its ID.
 *
 * @param params - Parameters object for weather station query
 * @param params.stationId - Unique identifier for the specific weather station to retrieve
 * @returns Promise<WeatherInfo> - Current weather data for the specified station
 *
 * @example
 * const weatherData = await getWeatherInformationByStationId({ stationId: 1909 });
 * console.log(weatherData.StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherData.TemperatureInFahrenheit);  // 73.94
 * console.log(weatherData.WindSpeedInMPH);  // 0
 *
 * @throws {Error} When station ID is invalid, API is unavailable, or authentication fails
 */
export const getWeatherInformationByStationId = async (
  params: GetWeatherInformationByStationIdParams
) => {
  return zodFetch(
    STATION_BY_ID_ENDPOINT,
    {
      input: getWeatherInformationByStationIdParamsSchema,
      output: weatherInfoSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationParamsSchema
// GetWeatherInformationParams
// ============================================================================

/**
 * Parameters for retrieving all weather information (no parameters required)
 */
export const getWeatherInformationParamsSchema = z.object({}).describe("");

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

/**
 * Parameters for retrieving weather information for a specific weather station by its unique identifier
 */
export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID corresponds to specific monitoring stations like 1909 (S 144th St on SB I-5), 1928 (EB I-90 Echo Lake), 1966 (NE 130th Street on I-5), or 1983 (Satus Pass on US 97). The ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

export type GetWeatherInformationByStationIdParams = z.infer<
  typeof getWeatherInformationByStationIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherInfoSchema
// WeatherInfo
// ============================================================================

/**
 * Current weather information schema - includes temperature, humidity, wind, visibility, and pressure data
 */
export const weatherInfoSchema = z
  .object({
    BarometricPressure: zNullableNumber().describe(""),

    Latitude: zLatitude().describe(""),

    Longitude: zLongitude().describe(""),

    PrecipitationInInches: zNullableNumber().describe(""),

    ReadingTime: zWsdotDate().describe(""),

    RelativeHumidity: zNullableNumber().describe(""),

    SkyCoverage: zNullableString().describe(""),

    StationID: z.number().int().positive().describe(""),

    StationName: z.string().describe(""),

    TemperatureInFahrenheit: zNullableNumber().describe(""),

    Visibility: zNullableNumber().describe(""),

    WindDirection: zNullableNumber().describe(""),

    WindDirectionCardinal: zNullableString().describe(""),

    WindGustSpeedInMPH: zNullableNumber().describe(""),

    WindSpeedInMPH: zNullableNumber().describe(""),
  })
  
  .describe("");

/**
 * WeatherInfo type - represents current weather data from a WSDOT weather station
 */
export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

/**
 * Array of weather information objects - wrapper around weatherInfoSchema
 */
export const weatherInfoArraySchema = z.array(weatherInfoSchema).describe("");

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformation
// ============================================================================

/**
 * TanStack Query hook for all weather information with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherInfo[], Error> - Query result with array of current weather data
 *
 * @example
 * const { data: weatherData, isLoading } = useWeatherInformation();
 * if (weatherData) {
 *   console.log(weatherData.length);  // 85
 *   console.log(weatherData[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * }
 */
export const useWeatherInformation = (
  params: GetWeatherInformationParams = {},
  options?: UseQueryOptions<WeatherInfo[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformation",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformation(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for weather information by station ID with automatic updates (single item).
 *
 * @param params - Parameters object for weather station query
 * @param params.stationId - Unique identifier for the specific weather station to retrieve
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherInfo, Error> - Query result with current weather data for specified station
 *
 * @example
 * const { data: weatherData, isLoading } = useWeatherInformationByStationId({ stationId: 1909 });
 * if (weatherData) {
 *   console.log(weatherData.StationName);  // "S 144th St on SB I-5 at mp 155.32"
 *   console.log(weatherData.TemperatureInFahrenheit);  // 73.94
 * }
 */
export const useWeatherInformationByStationId = (
  params: GetWeatherInformationByStationIdParams,
  options?: UseQueryOptions<WeatherInfo, Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getWeatherInformationByStationId",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformationByStationId(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
