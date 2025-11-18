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
  type WeatherInformationByStationIdInput,
  weatherInformationByStationIdInputSchema,
} from "./shared/weatherInfo.input";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "./shared/weatherInfo.output";

/**
 * Metadata for the fetchWeatherInformationByStationId endpoint
 */
export const weatherInformationByStationIdMeta = {
  functionName: "fetchWeatherInformationByStationId",
  endpoint:
    "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
  inputSchema: weatherInformationByStationIdInputSchema,
  outputSchema: weatherInfoSchema,
  sampleParams: { StationID: 1909 },
  endpointDescription:
    "Get current weather information for a specific station by ID.",
} satisfies EndpointMeta<WeatherInformationByStationIdInput, WeatherInfo>;

/**
 * Fetch function for retrieving current weather information for a specific station by ID
 */
export const fetchWeatherInformationByStationId: (
  params?: FetchFunctionParams<WeatherInformationByStationIdInput>
) => Promise<WeatherInfo> = createFetchFunction(
  wsdotWeatherInformationApi,
  weatherInfoGroup,
  weatherInformationByStationIdMeta
);

/**
 * React Query hook for retrieving current weather information for a specific station by ID
 */
export const useWeatherInformationByStationId: (
  params?: FetchFunctionParams<WeatherInformationByStationIdInput>,
  options?: QueryHookOptions<WeatherInfo>
) => UseQueryResult<WeatherInfo, Error> = createHook(
  wsdotWeatherInformationApi,
  weatherInfoGroup,
  weatherInformationByStationIdMeta
);
