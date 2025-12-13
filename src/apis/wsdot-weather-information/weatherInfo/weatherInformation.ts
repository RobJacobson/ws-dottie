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
  toolDescription: {
    purpose:
      "List current atmospheric conditions from all WSDOT Road Weather Information System stations statewide.",
    useWhen: [
      "building statewide weather maps",
      "monitoring road conditions across regions",
      "needing comprehensive weather data for analysis",
    ],
    avoidWhen: [
      "you only need data for one station (prefer fetchWeatherInformationByStationId)",
      "you need weather for specific stations (prefer fetchCurrentWeatherForStations)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per weather station",
    outputHighlights: [
      "StationID and StationName for identification",
      "Latitude/Longitude coordinates for mapping",
      "TemperatureInFahrenheit, RelativeHumidity, and PrecipitationInInches for conditions",
      "WindSpeedInMPH, WindDirection, and WindGustSpeedInMPH for wind data",
      "BarometricPressure and Visibility for atmospheric conditions",
      "ReadingTime as UTC timestamp when measurements were taken",
      "Some fields may be null when sensors are unavailable",
    ],
    chaining: [
      "fetchWeatherStations → extract StationID → call fetchWeatherInformationByStationId with { StationID: ... }",
      "fetchWeatherStations → extract multiple StationIDs → call fetchCurrentWeatherForStations with { StationList: ... }",
    ],
  },
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
