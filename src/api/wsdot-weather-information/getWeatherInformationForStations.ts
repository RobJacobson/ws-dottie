import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { type WeatherInfo, weatherInfoArraySchema } from "./getWeatherInformation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={stationIds}";

// ============================================================================
// API FUNCTION
// ============================================================================

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
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherInformationForStationsParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getWeatherInformationForStationsParamsSchema = z
  .object({
    stationIds: z
      .string()
      .min(1, "Station IDs cannot be empty")
      .describe(
        "Comma-separated list of weather station IDs to retrieve weather information for. Multiple station IDs should be separated by commas without spaces (e.g., '1909,1910,1928')."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for multiple weather stations specified by their IDs"
  );

export type GetWeatherInformationForStationsParams = z.infer<
  typeof getWeatherInformationForStationsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Re-export the schema and type from the main file
export { type WeatherInfo, weatherInfoArraySchema } from "./getWeatherInformation";

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting weather information for multiple stations from WSDOT Weather Information API
 *
 * Returns weather information for multiple weather stations specified
 * by their IDs.
 *
 * @param params - Object containing stationIds parameter
 * @param params.stationIds - Comma-separated list of station IDs
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with weather data for the specified stations
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
