import { z } from "zod";
import { zodFetchCustom } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  weatherInformationSchema,
  type WeatherInformation,
} from "@/schemas/wsdot-weather-information";

// ============================================================================
// API Functions
//
// getWeatherInformationForStations (multiple stations)
// getSearchWeatherInformation (time-based search)
// ============================================================================

export const getWeatherInformationForStations = async (
  params: GetWeatherInformationForStationsParams
): Promise<WeatherInformation> => {
  return zodFetchCustom(
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={stationIds}",
    {
      input: getWeatherInformationForStationsParamsSchema,
      output: weatherInformationSchema,
    },
    params
  );
};

export const getSearchWeatherInformation = async (
  params: GetSearchWeatherInformationParams
): Promise<WeatherInformation> => {
  return zodFetchCustom(
    "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?StationID={stationId}&SearchStartTime={searchStartTime}&SearchEndTime={searchEndTime}",
    {
      input: getSearchWeatherInformationParamsSchema,
      output: weatherInformationSchema,
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

export const getWeatherInformationForStationsParamsSchema = z.object({
  stationIds: z.string().min(1, "Station IDs cannot be empty"),
});

export type GetWeatherInformationForStationsParams = z.infer<
  typeof getWeatherInformationForStationsParamsSchema
>;

export const getSearchWeatherInformationParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to search. This ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint or other weather station listings."
      ),
    searchStartTime: zWsdotDate().describe(
      "Start time for the search period in WSDOT date format. This parameter defines the beginning of the time range for which weather information should be retrieved. The date will be converted to the appropriate WSDOT API format by the fetch layer."
    ),
    searchEndTime: zWsdotDate().describe(
      "End time for the search period in WSDOT date format. This parameter defines the end of the time range for which weather information should be retrieved. The date will be converted to the appropriate WSDOT API format by the fetch layer."
    ),
  })
  .describe(
    "Parameters for searching weather information for a specific weather station over a specified time period. All parameters are required to perform a time-based search."
  );

export type GetSearchWeatherInformationParams = z.infer<
  typeof getSearchWeatherInformationParamsSchema
>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const weatherInformationForStationsOptions = createQueryOptions({
  apiFunction: getWeatherInformationForStations,
  queryKey: [
    "wsdot",
    "weather-information",
    "getWeatherInformationForStations",
  ],
  cacheStrategy: "MINUTE_UPDATES",
});

export const searchWeatherInformationOptions = createQueryOptions({
  apiFunction: getSearchWeatherInformation,
  queryKey: ["wsdot", "weather-information", "getSearchWeatherInformation"],
  cacheStrategy: "MINUTE_UPDATES",
});
