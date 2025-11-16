import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  currentWeatherForStationsInputSchema,
  searchWeatherInformationInputSchema,
  weatherInformationByStationIdInputSchema,
  weatherInformationInputSchema,
} from "./weatherInfo.input";
import { weatherInfoSchema } from "./weatherInfo.output";

export const weatherInfoGroup: EndpointGroup = {
  name: "weather-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current atmospheric conditions from WSDOT Road Weather Information System stations.",
    description:
      "Real-time temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data for transportation operations.",
    useCases: [
      "Assess road weather conditions for transportation management.",
      "Monitor atmospheric data for traveler safety decisions.",
      "Display current weather conditions at specific stations.",
      "Query historical weather data by station and time range.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchWeatherInformation = createEndpoint({
  api: apis.wsdotWeatherInformation,
  group: weatherInfoGroup,
  functionName: "fetchWeatherInformation",
  endpoint: "/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "List current weather information for all stations.",
});

export const fetchWeatherInformationByStationId = createEndpoint({
  api: apis.wsdotWeatherInformation,
  group: weatherInfoGroup,
  functionName: "fetchWeatherInformationByStationId",
  endpoint:
    "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
  inputSchema: weatherInformationByStationIdInputSchema,
  outputSchema: weatherInfoSchema,
  sampleParams: { StationID: 1909 },
  endpointDescription:
    "Get current weather information for a specific station by ID.",
});

export const fetchCurrentWeatherForStations = createEndpoint({
  api: apis.wsdotWeatherInformation,
  group: weatherInfoGroup,
  functionName: "fetchCurrentWeatherForStations",
  endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
  inputSchema: currentWeatherForStationsInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: { StationList: "1909,1966,1970" },
  endpointDescription:
    "Get current weather information for multiple specified stations.",
});

export const searchWeatherInformation = createEndpoint({
  api: apis.wsdotWeatherInformation,
  group: weatherInfoGroup,
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
});
