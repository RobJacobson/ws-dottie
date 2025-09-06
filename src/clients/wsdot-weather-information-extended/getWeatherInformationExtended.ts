import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherReadingSchema,
  type WeatherReading,
} from "@/schemas/wsdot-weather-information-extended";

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationExtendedParamsSchema
// GetWeatherInformationExtendedParams
// ============================================================================

export const getWeatherInformationExtendedParamsSchema = z.object({});

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

// ============================================================================
// API Function
//
// getWeatherInformationExtended
// ============================================================================

export const getWeatherInformationExtended = zodFetch<
  GetWeatherInformationExtendedParams,
  WeatherReading[]
>(
  "/traffic/api/api/Scanweb",
  getWeatherInformationExtendedParamsSchema,
  z.array(weatherReadingSchema)
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherInformationExtendedOptions = createQueryOptions({
  apiFunction: getWeatherInformationExtended,
  queryKey: [
    "wsdot",
    "weather-information-extended",
    "getWeatherInformationExtended",
  ],
  cacheStrategy: "HOURLY_UPDATES",
});
