import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { weatherInfoArraySchema } from "./getWeatherInformation";

// ============================================================================
// API Function
//
// getWeatherInformationForStations
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={stationIds}";

/**
 * Get weather information for multiple stations from WSDOT Weather Information API
 *
 * Returns weather information for multiple weather stations specified by their IDs.
 * This endpoint is perfect for monitoring a specific set of locations like a travel route,
 * multiple mountain passes, or key transportation corridors. You can request up to several
 * stations at once to get a comprehensive view of weather conditions across different regions.
 *
 * @param params - Object containing stationIds parameter
 * @param params.stationIds - Comma-separated list of station IDs (e.g., "1909,1928,1966" for I-5 and I-90 stations)
 * @returns Promise containing weather data array for the specified stations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const weatherInfo = await getWeatherInformationForStations({ stationIds: "1909,1928,1966" });
 * console.log(weatherInfo.length); // 3 (number of stations requested)
 * console.log(weatherInfo[0].StationName); // "S 144th St on SB I-5 at mp 155.32"
 * console.log(weatherInfo[1].TemperatureInFahrenheit); // Echo Lake temperature
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
// Input Schema & Types
//
// getWeatherInformationForStationsParamsSchema
// GetWeatherInformationForStationsParams
// ============================================================================

export const getWeatherInformationForStationsParamsSchema = z
  .object({
    stationIds: z
      .string()
      .min(1, "Station IDs cannot be empty")
      .describe(
        "Comma-separated list of weather station IDs to retrieve weather information for. Multiple station IDs should be separated by commas without spaces (e.g., '1909,1928,1966' for I-5 southbound, I-90 Echo Lake, and I-5 northbound stations). This allows monitoring multiple specific locations like mountain passes, urban corridors, or coastal areas simultaneously."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for multiple weather stations specified by their IDs"
  );

export type GetWeatherInformationForStationsParams = z.infer<
  typeof getWeatherInformationForStationsParamsSchema
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
 * Hook for getting weather information for multiple stations from WSDOT Weather Information API
 *
 * Returns weather information for multiple weather stations specified by their IDs.
 * This hook is excellent for route planning applications where you need weather conditions
 * along a specific travel path. You can monitor multiple stations simultaneously to get
 * comprehensive weather coverage for trip planning, safety assessment, and route optimization.
 *
 * @param params - Object containing stationIds parameter
 * @param params.stationIds - Comma-separated list of station IDs (e.g., "1909,1928,1966")
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with weather data array for the specified stations
 *
 * @example
 * ```typescript
 * const { data: routeWeather } = useWeatherInformationForStations({
 *   stationIds: "1909,1928,1966"
 * });
 * console.log(routeWeather?.length); // 3 stations along the route
 * const mountainPass = routeWeather?.find(s => s.StationID === 1928);
 * console.log(mountainPass?.TemperatureInFahrenheit); // Echo Lake conditions
 * ```
 */
export const useWeatherInformationForStations = (
  params: GetWeatherInformationForStationsParams,
  options?: TanStackOptions<import("./getWeatherInformation").WeatherInfo[]>
): UseQueryResult<import("./getWeatherInformation").WeatherInfo[], Error> => {
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
