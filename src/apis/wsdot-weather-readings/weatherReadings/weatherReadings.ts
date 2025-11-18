import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
import { weatherReadingsGroup } from "./shared/weatherReadings.endpoints";
import {
  type WeatherReadingsInput,
  weatherReadingsInputSchema,
} from "./shared/weatherReadings.input";
import {
  type WeatherReading,
  weatherReadingSchema,
} from "./shared/weatherReadings.output";

/**
 * Metadata for the fetchWeatherReadings endpoint
 */
export const weatherReadingsMeta = {
  functionName: "fetchWeatherReadings",
  endpoint: "/Scanweb",
  inputSchema: weatherReadingsInputSchema,
  outputSchema: weatherReadingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List comprehensive weather readings from all weather stations.",
} satisfies EndpointMeta<WeatherReadingsInput, WeatherReading[]>;

/**
 * Fetch function for retrieving comprehensive weather readings from all weather stations
 */
export const fetchWeatherReadings: (
  params?: FetchFunctionParams<WeatherReadingsInput>
) => Promise<WeatherReading[]> = createFetchFunction(
  apis.wsdotWeatherReadings,
  weatherReadingsGroup,
  weatherReadingsMeta
);

/**
 * React Query hook for retrieving comprehensive weather readings from all weather stations
 */
export const useWeatherReadings: (
  params?: FetchFunctionParams<WeatherReadingsInput>,
  options?: QueryHookOptions<WeatherReading[]>
) => UseQueryResult<WeatherReading[], Error> = createHook(
  apis.wsdotWeatherReadings,
  weatherReadingsGroup,
  weatherReadingsMeta
);
