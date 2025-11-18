import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherInformationApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { weatherInfoGroup } from "./shared/weatherInfo.endpoints";
import {
  type CurrentWeatherForStationsInput,
  currentWeatherForStationsInputSchema,
} from "./shared/weatherInfo.input";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "./shared/weatherInfo.output";

/**
 * Metadata for the fetchCurrentWeatherForStations endpoint
 */
export const currentWeatherForStationsMeta = {
  functionName: "fetchCurrentWeatherForStations",
  endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
  inputSchema: currentWeatherForStationsInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: { StationList: "1909,1966,1970" },
  endpointDescription:
    "Get current weather information for multiple specified stations.",
} satisfies EndpointMeta<CurrentWeatherForStationsInput, WeatherInfo[]>;

/**
 * Fetch function for retrieving current weather information for multiple specified stations
 */
export const fetchCurrentWeatherForStations: (
  params?: FetchFunctionParams<CurrentWeatherForStationsInput>
) => Promise<WeatherInfo[]> = createFetchFunction(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  currentWeatherForStationsMeta
);

/**
 * React Query hook for retrieving current weather information for multiple specified stations
 */
export const useCurrentWeatherForStations: (
  params?: FetchFunctionParams<CurrentWeatherForStationsInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = createHook(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  currentWeatherForStationsMeta
);
