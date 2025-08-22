import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { weatherInfoArraySchema } from "./getWeatherInformation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Search weather information for a specific station over a time range from WSDOT Weather Information API
 *
 * Returns weather information for a specific weather station over a specified time period.
 * This endpoint is useful for historical weather analysis and trend monitoring.
 *
 * @param params - Object containing stationId, searchStartTime, and searchEndTime parameters
 * @param params.stationId - The ID of the specific weather station
 * @param params.searchStartTime - Start time for the search period in WSDOT date format
 * @param params.searchEndTime - End time for the search period in WSDOT date format
 * @returns Promise containing weather data for the specified station and time range
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const startTime = new Date('2024-01-01T00:00:00Z');
 * const endTime = new Date('2024-01-02T00:00:00Z');
 * const weatherInfo = await getSearchWeatherInformation({
 *   stationId: 1909,
 *   searchStartTime: startTime,
 *   searchEndTime: endTime
 * });
 * console.log(weatherInfo.length); // Number of weather records found
 * ```
 */
export const getSearchWeatherInformation = async (
  params: GetSearchWeatherInformationParams
) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getSearchWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

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
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the schema from the main file (no type re-export to avoid chains)
export { weatherInfoArraySchema } from "./getWeatherInformation";

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for searching weather information for a specific station over a time range from WSDOT Weather Information API
 *
 * Returns weather information for a specific weather station over a specified time period.
 * This endpoint is useful for historical weather analysis and trend monitoring.
 *
 * @param params - Object containing stationId, searchStartTime, and searchEndTime parameters
 * @param params.stationId - The ID of the specific weather station
 * @param params.searchStartTime - Start time for the search period in WSDOT date format
 * @param params.searchEndTime - End time for the search period in WSDOT date format
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with weather data for the specified station and time range
 */
export const useSearchWeatherInformation = (
  params: GetSearchWeatherInformationParams,
  options?: TanStackOptions<import("./getWeatherInformation").WeatherInfo[]>
): UseQueryResult<import("./getWeatherInformation").WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getSearchWeatherInformation",
      params,
    ],
    queryFn: () => getSearchWeatherInformation(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
