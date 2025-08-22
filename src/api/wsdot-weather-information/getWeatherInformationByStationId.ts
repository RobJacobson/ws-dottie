import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { weatherInfoSchema } from "./getWeatherInformation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}";

// ============================================================================
// API FUNCTION
// ============================================================================

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
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherInformationByStationIdParamsSchema,
      output: weatherInfoSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint or other weather station listings."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

export type GetWeatherInformationByStationIdParams = z.infer<
  typeof getWeatherInformationByStationIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

// Import the schema from the main file (no type re-export to avoid chains)
export { weatherInfoSchema } from "./getWeatherInformation";

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting weather information for a specific station by ID from WSDOT Weather Information API
 *
 * Returns detailed weather information for a specific weather station
 * identified by its ID.
 *
 * @param params - Object containing stationId parameter
 * @param params.stationId - The ID of the specific weather station
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with the specific weather station data
 */
export const useWeatherInformationByStationId = (
  params: GetWeatherInformationByStationIdParams,
  options?: TanStackOptions<import("./getWeatherInformation").WeatherInfo>
): UseQueryResult<import("./getWeatherInformation").WeatherInfo, Error> => {
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
