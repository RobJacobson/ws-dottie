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
export const fetchCurrentWeatherForStations: FetchFactory<
  CurrentWeatherForStationsInput,
  WeatherInfo[]
> = createFetchFunction({
  api: wsdotWeatherInformationApiMeta,
  endpoint: currentWeatherForStationsMeta,
});

/**
 * React Query hook for retrieving current weather information for multiple specified stations
 */
export const useCurrentWeatherForStations: HookFactory<
  CurrentWeatherForStationsInput,
  WeatherInfo[]
> = createHook({
  apiName: wsdotWeatherInformationApiMeta.name,
  endpointName: currentWeatherForStationsMeta.functionName,
  fetchFn: fetchCurrentWeatherForStations,
  cacheStrategy: weatherInfoGroup.cacheStrategy,
});
