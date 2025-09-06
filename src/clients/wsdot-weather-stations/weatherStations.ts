import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherStationSchema,
  weatherStationsSchema,
  type WeatherStation,
  type WeatherStations,
} from "@/schemas/wsdot-weather-stations";

// Re-export schemas and types for convenience
export { weatherStationSchema, weatherStationsSchema };
export type { WeatherStation, WeatherStations };

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
// API Function
//
// getWeatherStations
// ============================================================================

export const getWeatherStations = zodFetch<
  GetWeatherStationsParams,
  WeatherStations
>(
  "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
  getWeatherStationsParamsSchema,
  weatherStationsSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherStationsOptions = createQueryOptions({
  apiFunction: getWeatherStations,
  queryKey: ["wsdot", "weather-stations", "getWeatherStations"],
  cacheStrategy: "DAILY_STATIC",
});
