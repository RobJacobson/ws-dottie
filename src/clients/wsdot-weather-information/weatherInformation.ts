import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherInfoSchema,
  weatherInformationSchema,
  type WeatherInfo,
  type WeatherInformation,
} from "@/schemas/wsdot-weather-information";

// Re-export schemas and types for convenience
export { weatherInfoSchema, weatherInformationSchema };
export type { WeatherInfo, WeatherInformation };

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationParamsSchema
// GetWeatherInformationParams
// ============================================================================

export const getWeatherInformationParamsSchema = z.object({});

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

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
// API Functions
//
// getWeatherInformation (array)
// getWeatherInformationByStationId (single item)
// ============================================================================

export const getWeatherInformation = zodFetch<
  GetWeatherInformationParams,
  WeatherInformation
>(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
  getWeatherInformationParamsSchema,
  weatherInformationSchema
);

export const getWeatherInformationByStationId = zodFetch<
  GetWeatherInformationByStationIdParams,
  WeatherInfo
>(
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}",
  getWeatherInformationByStationIdParamsSchema,
  weatherInfoSchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherInformationOptions = createQueryOptions({
  apiFunction: getWeatherInformation,
  queryKey: ["wsdot", "weather-information", "getWeatherInformation"],
  cacheStrategy: "MINUTE_UPDATES",
});

export const weatherInformationByStationIdOptions = createQueryOptions({
  apiFunction: getWeatherInformationByStationId,
  queryKey: [
    "wsdot",
    "weather-information",
    "getWeatherInformationByStationId",
  ],
  cacheStrategy: "MINUTE_UPDATES",
});
