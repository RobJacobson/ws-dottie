import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
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
 * Factory result for weather readings
 */
const weatherReadingsFactory = createFetchAndHook<
  WeatherReadingsInput,
  WeatherReading[]
>({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: weatherReadingsMeta,
  getEndpointGroup: () =>
    require("./shared/weatherReadings.endpoints").weatherReadingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive weather readings from all weather stations
 */
export const { fetch: fetchWeatherReadings, hook: useWeatherReadings } =
  weatherReadingsFactory;
