import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
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
export const fetchWeatherReadings: FetchFactory<
  WeatherReadingsInput,
  WeatherReading[]
> = createFetchFunction({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: weatherReadingsMeta,
});

/**
 * React Query hook for retrieving comprehensive weather readings from all weather stations
 */
export const useWeatherReadings: HookFactory<
  WeatherReadingsInput,
  WeatherReading[]
> = createHook({
  apiName: wsdotWeatherReadingsApiMeta.name,
  endpointName: weatherReadingsMeta.functionName,
  fetchFn: fetchWeatherReadings,
  cacheStrategy: weatherReadingsGroup.cacheStrategy,
});
