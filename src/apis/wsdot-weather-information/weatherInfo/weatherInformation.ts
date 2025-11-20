import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
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
export const fetchWeatherInformation: FetchFactory<
  WeatherInformationInput,
  WeatherInfo[]
> = createFetchFunction({
  api: wsdotWeatherInformationApiMeta,
  endpoint: weatherInformationMeta,
});

/**
 * React Query hook for retrieving current weather information for all stations
 */
export const useWeatherInformation: HookFactory<
  WeatherInformationInput,
  WeatherInfo[]
> = createHook({
  apiName: wsdotWeatherInformationApiMeta.name,
  endpointName: weatherInformationMeta.functionName,
  fetchFn: fetchWeatherInformation,
  cacheStrategy: weatherInfoGroup.cacheStrategy,
});
