import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherStationsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchWeatherStations: (
  params?: FetchFunctionParams<WeatherStationsInput>
) => Promise<WeatherStation[]> = createFetchFunction(
  wsdotWeatherStationsApi,
  weatherStationsGroup,
  weatherStationsMeta
);

/**
 * React Query hook for retrieving weather station metadata for all stations statewide
 */
export const useWeatherStations: (
  params?: FetchFunctionParams<WeatherStationsInput>,
  options?: QueryHookOptions<WeatherStation[]>
) => UseQueryResult<WeatherStation[], Error> = createHook(
  wsdotWeatherStationsApi,
  weatherStationsGroup,
  weatherStationsMeta
);
