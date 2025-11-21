import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
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
 * Factory result for current weather for stations
 */
const currentWeatherForStationsFactory = createFetchAndHook<
  CurrentWeatherForStationsInput,
  WeatherInfo[]
>({
  api: wsdotWeatherInformationApiMeta,
  endpoint: currentWeatherForStationsMeta,
  getEndpointGroup: () =>
    require("./shared/weatherInfo.endpoints").weatherInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving current weather information for multiple specified stations
 */
export const {
  fetch: fetchCurrentWeatherForStations,
  hook: useCurrentWeatherForStations,
} = currentWeatherForStationsFactory;
