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
  type WeatherInformationInput,
  weatherInformationInputSchema,
} from "./shared/weatherInfo.input";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "./shared/weatherInfo.output";

/**
 * Metadata for the fetchWeatherInformation endpoint
 */
export const weatherInformationMeta = {
  functionName: "fetchWeatherInformation",
  endpoint: "/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "List current weather information for all stations.",
} satisfies EndpointMeta<WeatherInformationInput, WeatherInfo[]>;

/**
 * Fetch function for retrieving current weather information for all stations
 */
export const fetchWeatherInformation: (
  params?: FetchFunctionParams<WeatherInformationInput>
) => Promise<WeatherInfo[]> = createFetchFunction(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  weatherInformationMeta
);

/**
 * React Query hook for retrieving current weather information for all stations
 */
export const useWeatherInformation: (
  params?: FetchFunctionParams<WeatherInformationInput>,
  options?: QueryHookOptions<WeatherInfo[]>
) => UseQueryResult<WeatherInfo[], Error> = createHook(
  wsdotWeatherInformationApi.api,
  weatherInfoGroup,
  weatherInformationMeta
);
