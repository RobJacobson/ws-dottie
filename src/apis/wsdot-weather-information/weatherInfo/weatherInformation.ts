import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
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
 * Factory result for weather information
 */
const weatherInformationFactory = createFetchAndHook<
  WeatherInformationInput,
  WeatherInfo[]
>({
  api: wsdotWeatherInformationApiMeta,
  endpoint: weatherInformationMeta,
  getEndpointGroup: () =>
    require("./shared/weatherInfo.endpoints").weatherInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving current weather information for all stations
 */
export const { fetch: fetchWeatherInformation, hook: useWeatherInformation } =
  weatherInformationFactory;
