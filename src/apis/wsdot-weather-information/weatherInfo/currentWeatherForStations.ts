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
  toolDescription: {
    purpose:
      "Get current atmospheric conditions from multiple specific WSDOT Road Weather Information System stations.",
    useWhen: [
      "monitoring a specific set of known stations",
      "building dashboards for selected locations",
      "needing weather data for targeted regions",
    ],
    avoidWhen: [
      "you need all stations statewide (prefer fetchWeatherInformation)",
      "you only need one station (prefer fetchWeatherInformationByStationId)",
    ],
    inputs: [
      "StationList: comma-separated StationIDs from fetchWeatherStations → StationID",
    ],
    returns: "array — one item per requested station",
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
      "fetchWeatherStations → extract multiple StationIDs → call fetchCurrentWeatherForStations with { StationList: ... }",
    ],
  },
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
