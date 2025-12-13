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
  toolDescription: {
    purpose:
      "Get current atmospheric conditions from a specific WSDOT Road Weather Information System station.",
    useWhen: [
      "monitoring conditions at a specific location",
      "getting weather data for a known station",
      "building detailed views for individual stations",
    ],
    avoidWhen: [
      "you need data for multiple stations (prefer fetchCurrentWeatherForStations or fetchWeatherInformation)",
    ],
    inputs: ["StationID: from fetchWeatherStations → StationID"],
    returns: "object — one weather station profile",
    outputHighlights: [
      "StationID and StationName for identification",
      "Latitude/Longitude coordinates for mapping",
      "TemperatureInFahrenheit, RelativeHumidity, and PrecipitationInInches for conditions",
      "WindSpeedInMPH, WindDirection, and WindGustSpeedInMPH for wind data",
      "BarometricPressure and Visibility for atmospheric conditions",
      "ReadingTime as UTC timestamp when measurements were taken",
      "Fields may be null when sensors are unavailable",
    ],
    chaining: [
      "fetchWeatherStations → extract StationID → call fetchWeatherInformationByStationId with { StationID: ... }",
    ],
  },
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
