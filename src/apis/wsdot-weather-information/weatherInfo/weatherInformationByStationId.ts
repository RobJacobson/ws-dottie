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
export const fetchWeatherInformationByStationId: FetchFactory<
  WeatherInformationByStationIdInput,
  WeatherInfo
> = createFetchFunction({
  api: wsdotWeatherInformationApiMeta,
  endpoint: weatherInformationByStationIdMeta,
});

/**
 * React Query hook for retrieving current weather information for a specific station by ID
 */
export const useWeatherInformationByStationId: HookFactory<
  WeatherInformationByStationIdInput,
  WeatherInfo
> = createHook({
  apiName: wsdotWeatherInformationApiMeta.name,
  endpointName: weatherInformationByStationIdMeta.functionName,
  fetchFn: fetchWeatherInformationByStationId,
  cacheStrategy: weatherInfoGroup.cacheStrategy,
});
