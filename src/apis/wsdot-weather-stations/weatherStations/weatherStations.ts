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
  toolDescription: {
    purpose:
      "List metadata for all WSDOT Road Weather Information System stations statewide, providing station identifiers and locations needed for other weather endpoints.",
    useWhen: [
      "discovering available weather stations",
      "building station picker interfaces",
      "mapping weather station locations",
      "getting StationID/StationCode values for other weather endpoints",
    ],
    avoidWhen: [
      "you already know specific station IDs",
      "you need current weather conditions (prefer weather-information endpoints)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per weather station",
    outputHighlights: [
      "StationCode (numeric ID) and StationName for station identification",
      "Latitude and Longitude coordinates in decimal degrees for mapping",
      "StationCode is the key identifier used by other weather endpoints",
      "StationName may be null for some stations",
      "Foundational endpoint for discovering available weather monitoring locations",
    ],
    chaining: [
      "fetchWeatherStations → extract StationCode → call weather-information endpoints with StationID",
      "fetchWeatherStations → extract StationCode → call searchWeatherInformation with StationID",
      "fetchWeatherStations → extract multiple StationCodes → call fetchCurrentWeatherForStations with StationList",
    ],
  },
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
