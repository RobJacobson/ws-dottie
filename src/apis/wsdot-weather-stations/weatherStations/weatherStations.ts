import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherStationsApiMeta } from "../apiMeta";
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
 * Factory result for weather stations
 */
const weatherStationsFactory = createFetchAndHook<
  WeatherStationsInput,
  WeatherStation[]
>({
  api: wsdotWeatherStationsApiMeta,
  endpoint: weatherStationsMeta,
  getEndpointGroup: () =>
    require("./shared/weatherStations.endpoints").weatherStationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving weather station metadata for all stations statewide
 */
export const { fetch: fetchWeatherStations, hook: useWeatherStations } =
  weatherStationsFactory;
