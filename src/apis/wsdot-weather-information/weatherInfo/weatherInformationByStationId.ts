import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
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
 * Factory result for weather information by station ID
 */
const weatherInformationByStationIdFactory = createFetchAndHook<
  WeatherInformationByStationIdInput,
  WeatherInfo
>({
  api: wsdotWeatherInformationApiMeta,
  endpoint: weatherInformationByStationIdMeta,
  getEndpointGroup: () =>
    require("./shared/weatherInfo.endpoints").weatherInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving current weather information for a specific station by ID
 */
export const {
  fetch: fetchWeatherInformationByStationId,
  hook: useWeatherInformationByStationId,
} = weatherInformationByStationIdFactory;
