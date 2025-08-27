/**
 * Weather Stations API
 *
 * Metadata and location information for WSDOT weather monitoring stations across Washington State.
 * Provides station identification, geographic coordinates, and descriptive names for all active
 * weather monitoring locations used by the WSDOT weather information system.
 *
 * This API serves as a reference for available weather stations and their locations, enabling
 * applications to discover and map weather monitoring infrastructure. Station codes from this
 * API can be used as parameters in other weather APIs to retrieve specific station data.
 *
 * API Functions:
 * - getWeatherStations: Returns metadata for all WSDOT weather monitoring stations
 *
 * Input/Output Overview:
 * - getWeatherStations: Input: none, Output: WeatherStation[]
 *
 * Base Type: WeatherStation
 *
 * interface WeatherStation {
 *   Latitude: number;
 *   Longitude: number;
 *   StationCode: number;
 *   StationName: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "Latitude": 47.474800000,
 *     "Longitude": -122.270400000,
 *     "StationCode": 1909,
 *     "StationName": "S 144th St on SB I-5 at mp 155.32"
 *   },
 *   {
 *     "Latitude": 47.760632547,
 *     "Longitude": -122.184047830,
 *     "StationCode": 1910,
 *     "StationName": "NE 195th on SB I-405 at mp 24.58"
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

// ============================================================================
// API Function
//
// getWeatherStations
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson";

/**
 * Retrieves metadata for all WSDOT weather monitoring stations.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<WeatherStation[]> - Array of weather station metadata including location and identification
 *
 * @example
 * const weatherStations = await getWeatherStations();
 * console.log(weatherStations.length);  // 85
 * console.log(weatherStations[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherStations[0].StationCode);  // 1909
 * console.log(weatherStations[0].Latitude);  // 47.474800000
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getWeatherStations = async (
  params: GetWeatherStationsParams = {}
): Promise<WeatherStation[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherStationsParamsSchema,
      output: weatherStationArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherStationsParamsSchema
// GetWeatherStationsParams
// ============================================================================

/**
 * Parameters for retrieving weather station metadata (no parameters required)
 */
export const getWeatherStationsParamsSchema = z.object({}).describe("");

export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherStationDataSchema
// WeatherStationData
// ============================================================================

/**
 * Weather station metadata schema - includes location coordinates, station code, and descriptive name
 */
export const weatherStationSchema = z
  .object({
    Latitude: z.number().describe(""),

    Longitude: z.number().describe(""),

    StationCode: z.number().int().describe(""),

    StationName: z.string().nullable().describe(""),
  })
  
  .describe("");

/**
 * Array of weather station metadata objects - wrapper around weatherStationSchema
 */
export const weatherStationArraySchema = z
  .array(weatherStationSchema)
  .describe("");

/**
 * WeatherStation type - represents metadata for a WSDOT weather monitoring station
 */
export type WeatherStation = z.infer<typeof weatherStationSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherStations
// ============================================================================

/**
 * TanStack Query hook for weather station metadata with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherStation[], Error> - Query result with array of weather station metadata
 *
 * @example
 * const { data: weatherStations, isLoading } = useWeatherStations();
 * if (weatherStations) {
 *   console.log(weatherStations.length);  // 85
 *   console.log(weatherStations[0].StationName);  // "S 144th St on SB I-5 at mp 155.32"
 *   console.log(weatherStations[0].StationCode);  // 1909
 * }
 */
export const useWeatherStations = (
  params: GetWeatherStationsParams = {},
  options?: TanStackOptions<WeatherStation[]>
): UseQueryResult<WeatherStation[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-stations",
      "getWeatherStations",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherStations(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
