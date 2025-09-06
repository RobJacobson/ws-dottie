import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherInformationSchema,
  type WeatherInformation,
} from "@/schemas/wsdot-weather-information";

// Re-export schemas and types for convenience
export { weatherInformationSchema };
export type { WeatherInformation };

// ============================================================================
// Input Schema & Types
// ============================================================================

export const getWeatherInformationParamsSchema = z.object({});

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

// ============================================================================
// API Function
// ============================================================================

export const getWeatherInformation = zodFetch<
  GetWeatherInformationParams,
  WeatherInformation
>(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  getWeatherInformationParamsSchema,
  weatherInformationSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherInformationOptions = createQueryOptions({
  apiFunction: getWeatherInformation,
  queryKey: ["wsdot", "weather-information", "getWeatherInformation"],
  cacheStrategy: "MINUTE_UPDATES",
});
