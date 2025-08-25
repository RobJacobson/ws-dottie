import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { weatherInfoSchema } from "./getWeatherInformation";

// ============================================================================
// API Function
//
// getWeatherInformationByStationId
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}";

/**
 * Get weather information for a specific station by ID from WSDOT Weather Information API
 *
 * Returns detailed weather information for a specific weather station identified by its ID.
 * This endpoint is useful for monitoring specific locations like mountain passes, urban corridors,
 * or areas prone to weather-related driving hazards. The data includes real-time temperature,
 * visibility, wind conditions, and other weather parameters critical for road safety.
 *
 * @param params - Object containing stationId parameter
 * @param params.stationId - The ID of the specific weather station (e.g., 1909 for I-5 southbound, 1928 for I-90 Echo Lake)
 * @returns Promise containing the specific weather station data with current conditions
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationByStationId({ stationId: 1909 });
 * console.log(weatherInfo.TemperatureInFahrenheit); // 89.24 (current temperature in °F)
 * console.log(weatherInfo.StationName); // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherInfo.Visibility); // 1 (visibility in miles)
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
// Input Schema & Types
//
// getWeatherInformationByStationIdParamsSchema
// GetWeatherInformationByStationIdParams
// ============================================================================

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
// weatherInfoSchema (imported from ./getWeatherInformation)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationByStationId
// ============================================================================

/**
 * Hook for getting weather information for a specific station by ID from WSDOT Weather Information API
 *
 * Returns detailed weather information for a specific weather station identified by its ID.
 * This hook is ideal for focused weather monitoring at specific locations like mountain passes
 * (Snoqualmie, Stevens), urban areas (Seattle, Bellevue), or coastal regions. The data updates
 * frequently to provide current conditions for transportation planning and safety.
 *
 * @param params - Object containing stationId parameter
 * @param params.stationId - The ID of the specific weather station (e.g., 1909 for I-5 southbound, 1928 for I-90 Echo Lake)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with the specific weather station data for targeted monitoring
 *
 * @example
 * ```typescript
 * const { data: stationWeather } = useWeatherInformationByStationId({ stationId: 1928 });
 * console.log(stationWeather?.TemperatureInFahrenheit); // Echo Lake temperature
 * console.log(stationWeather?.WindSpeedInMPH); // Current wind conditions
 * console.log(stationWeather?.Visibility); // Visibility for safety assessment
 * ```
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
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformationByStationId(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
