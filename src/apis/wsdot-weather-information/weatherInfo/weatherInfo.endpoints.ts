import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsdotWeatherInformationApi } from "../apiDefinition";
import {
  currentWeatherForStationsInputSchema,
  searchWeatherInformationInputSchema,
  weatherInformationByStationIdInputSchema,
  weatherInformationInputSchema,
} from "./weatherInfo.input";
import { weatherInfoSchema } from "./weatherInfo.output";

const group = defineEndpointGroup({
  api: wsdotWeatherInformationApi,
  name: "weather-info",
  documentation: {
    resourceDescription:
      "Each WeatherInfo item represents current atmospheric conditions from a WSDOT Road Weather Information System station. These stations measure temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage to support transportation operations.",
    businessContext:
      "Use to assess road weather conditions by providing real-time atmospheric data for transportation management and traveler safety decisions.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchWeatherInformation = defineEndpoint({
  group,
  functionName: "fetchWeatherInformation",
  definition: {
    endpoint: "/GetCurrentWeatherInformationAsJson",
    inputSchema: weatherInformationInputSchema,
    outputSchema: weatherInfoSchema.array(),
    sampleParams: {},
    endpointDescription: "Returns multiple WeatherInfo items for all stations.",
  },
});

export const fetchWeatherInformationByStationId = defineEndpoint({
  group,
  functionName: "fetchWeatherInformationByStationId",
  definition: {
    endpoint:
      "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
    inputSchema: weatherInformationByStationIdInputSchema,
    outputSchema: weatherInfoSchema,
    sampleParams: { StationID: 1909 },
    endpointDescription: "Returns single WeatherInfo for specific station.",
  },
});

export const fetchCurrentWeatherForStations = defineEndpoint({
  group,
  functionName: "fetchCurrentWeatherForStations",
  definition: {
    endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
    inputSchema: currentWeatherForStationsInputSchema,
    outputSchema: weatherInfoSchema.array(),
    sampleParams: { StationList: "1909,1966,1970" },
    endpointDescription: "Returns multiple WeatherInfo for specified stations.",
  },
});

export const searchWeatherInformation = defineEndpoint({
  group,
  functionName: "searchWeatherInformation",
  definition: {
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
      "Returns multiple WeatherInfo for historical time range.",
  },
});

export const weatherInfoResource = group.descriptor;
