import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotWeatherStationsApiMeta } from "../apiMeta";
import { weatherStationsGroup } from "./shared/weatherStations.endpoints";
import {
  type WeatherStationsInput,
  weatherStationsInputSchema,
} from "./shared/weatherStations.input";
import {
  type WeatherStation,
  weatherStationSchema,
} from "./shared/weatherStations.output";

/**
 * Metadata for the fetchWeatherStations endpoint
 */
export const weatherStationsMeta = {
  functionName: "fetchWeatherStations",
  endpoint: "/GetCurrentStationsAsJson",
  inputSchema: weatherStationsInputSchema,
  outputSchema: weatherStationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List weather station metadata for all stations statewide.",
} satisfies EndpointMeta<WeatherStationsInput, WeatherStation[]>;

/**
 * Fetch function for retrieving weather station metadata for all stations statewide
 */
export const fetchWeatherStations: FetchFactory<
  WeatherStationsInput,
  WeatherStation[]
> = createFetchFunction({
  api: wsdotWeatherStationsApiMeta,
  endpoint: weatherStationsMeta,
});

/**
 * React Query hook for retrieving weather station metadata for all stations statewide
 */
export const useWeatherStations: HookFactory<
  WeatherStationsInput,
  WeatherStation[]
> = createHook({
  apiName: wsdotWeatherStationsApiMeta.name,
  endpointName: weatherStationsMeta.functionName,
  fetchFn: fetchWeatherStations,
  cacheStrategy: weatherStationsGroup.cacheStrategy,
});
