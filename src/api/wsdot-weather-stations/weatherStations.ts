import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
//
// getWeatherStations
// ============================================================================

const ENDPOINT =
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson";

export const getWeatherStations = async (
  params: GetWeatherStationsParams = {}
): Promise<WeatherStations> => {
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

export type WeatherStations = z.infer<typeof weatherStationArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherStationsOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "weather-stations", "getWeatherStations"],
    queryFn: () => getWeatherStations({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
