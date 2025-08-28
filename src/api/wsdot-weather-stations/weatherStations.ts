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

export const getWeatherStationsParamsSchema = z.object({});

export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherStationDataSchema
// WeatherStationData
// ============================================================================

export const weatherStationSchema = z.object({
  Latitude: z.number(),

  Longitude: z.number(),

  StationCode: z.number().int(),

  StationName: z.string().nullable(),
});

export const weatherStationArraySchema = z.array(weatherStationSchema);

export type WeatherStation = z.infer<typeof weatherStationSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherStations
// ============================================================================

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
