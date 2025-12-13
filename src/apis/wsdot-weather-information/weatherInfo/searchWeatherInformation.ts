import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotWeatherInformationApiMeta } from "../apiMeta";
import {
  type SearchWeatherInformationInput,
  searchWeatherInformationInputSchema,
} from "./shared/weatherInfo.input";
import {
  type WeatherInfo,
  weatherInfoSchema,
} from "./shared/weatherInfo.output";

/**
 * Metadata for the searchWeatherInformation endpoint
 */
export const searchWeatherInformationMeta = {
  functionName: "searchWeatherInformation",
  endpoint:
    "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
  inputSchema: searchWeatherInformationInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: {
    StationID: 1980,
    SearchStartTime: new Date(
      `${datesHelper.yesterday()}T00:00:00Z`
    ).toISOString(),
    SearchEndTime: new Date(`${datesHelper.today()}T23:59:59Z`).toISOString(),
  },
  endpointDescription:
    "Search historical weather information for a station within a time range.",
  toolDescription: {
    purpose:
      "Search historical atmospheric conditions from a WSDOT Road Weather Information System station over a specified time range.",
    useWhen: [
      "analyzing weather patterns over time",
      "building historical weather reports",
      "studying weather conditions for specific periods",
    ],
    avoidWhen: [
      "you need current conditions (prefer fetchWeatherInformationByStationId)",
      "you need data for multiple stations (prefer fetchWeatherInformation)",
    ],
    inputsHighlights:
      "StationID from fetchWeatherStations → StationID; SearchStartTime, SearchEndTime in ISO-8601 UTC format",
    returns: "array — one item per reading timestamp",
    outputHighlights: [
      "StationID and StationName for identification",
      "Latitude/Longitude coordinates for mapping",
      "TemperatureInFahrenheit, RelativeHumidity, and PrecipitationInInches for conditions",
      "WindSpeedInMPH, WindDirection, and WindGustSpeedInMPH for wind data",
      "BarometricPressure and Visibility for atmospheric conditions",
      "ReadingTime as UTC timestamp when each measurement was taken",
      "Some fields may be null when sensors were unavailable",
    ],
    chaining: [
      "fetchWeatherStations → extract StationID → call searchWeatherInformation with { StationID: ..., SearchStartTime: ..., SearchEndTime: ... }",
    ],
  },
} satisfies EndpointMeta<SearchWeatherInformationInput, WeatherInfo[]>;

/**
 * Factory result for search weather information
 */
const searchWeatherInformationFactory = createFetchAndHook<
  SearchWeatherInformationInput,
  WeatherInfo[]
>({
  api: wsdotWeatherInformationApiMeta,
  endpoint: searchWeatherInformationMeta,
  getEndpointGroup: () =>
    require("./shared/weatherInfo.endpoints").weatherInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical weather information for a station within a time range
 */
export const {
  fetch: searchWeatherInformation,
  hook: useSearchWeatherInformation,
} = searchWeatherInformationFactory;
