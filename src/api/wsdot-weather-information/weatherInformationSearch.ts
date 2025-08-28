import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import type { TanStackOptions } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";

import { weatherInfoArraySchema } from "./weatherInformation";

// ============================================================================
// API Functions
//
// getWeatherInformationForStations (multiple stations)
// getSearchWeatherInformation (time-based search)
// ============================================================================

const MULTIPLE_STATIONS_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={stationIds}";
const SEARCH_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?StationID={stationId}&SearchStartTime={searchStartTime}&SearchEndTime={searchEndTime}";

export const getWeatherInformationForStations = async (
  params: GetWeatherInformationForStationsParams
) => {
  return zodFetch(
    MULTIPLE_STATIONS_ENDPOINT,
    {
      input: getWeatherInformationForStationsParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

export const getSearchWeatherInformation = async (
  params: GetSearchWeatherInformationParams
) => {
  return zodFetch(
    SEARCH_ENDPOINT,
    {
      input: getSearchWeatherInformationParamsSchema,
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
// Output Schema & Types
//
// weatherInfoArraySchema (imported from ./getWeatherInformation)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationForStations
// ============================================================================

export const useWeatherInformationForStations = (
  params: GetWeatherInformationForStationsParams,
  options?: TanStackOptions<import("./weatherInformation").WeatherInfo[]>
): UseQueryResult<import("./weatherInformation").WeatherInfo[], Error> => {
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

export const useSearchWeatherInformation = (
  params: GetSearchWeatherInformationParams,
  options?: TanStackOptions<import("./weatherInformation").WeatherInfo[]>
): UseQueryResult<import("./weatherInformation").WeatherInfo[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information",
      "getSearchWeatherInformation",
      JSON.stringify(params),
    ],
    queryFn: () => getSearchWeatherInformation(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
