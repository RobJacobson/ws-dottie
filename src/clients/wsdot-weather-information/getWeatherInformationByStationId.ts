import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherInfoSchema,
  type WeatherInfo,
} from "@/schemas/wsdot-weather-information";

// Re-export schemas and types for convenience
export { weatherInfoSchema };
export type { WeatherInfo };

// ============================================================================
// Input Schema & Types
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
// API Function
// ============================================================================

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

export const weatherInformationByStationIdOptions = createQueryOptions({
  apiFunction: getWeatherInformationByStationId,
  queryKey: [
    "wsdot",
    "weather-information",
    "getWeatherInformationByStationId",
  ],
  cacheStrategy: "MINUTE_UPDATES",
});
