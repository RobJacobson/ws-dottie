import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import {
  currentWeatherForStationsInputSchema,
  searchWeatherInformationInputSchema,
  weatherInformationByStationIdInputSchema,
  weatherInformationInputSchema,
} from "./weatherInfo.input";
import { weatherInfoSchema } from "./weatherInfo.output";

export const weatherInfoGroup = defineEndpointGroup({
  name: "weather-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each WeatherInfo item represents current atmospheric conditions from a WSDOT Road Weather Information System station. These stations measure temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage to support transportation operations.",
    businessContext:
      "Use to assess road weather conditions by providing real-time atmospheric data for transportation management and traveler safety decisions.",
  },
});

export const fetchWeatherInformation = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: weatherInfoGroup,
  functionName: "fetchWeatherInformation",
  endpoint: "/GetCurrentWeatherInformationAsJson",
  inputSchema: weatherInformationInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "Returns multiple WeatherInfo items for all stations.",
});

export const fetchWeatherInformationByStationId = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: weatherInfoGroup,
  functionName: "fetchWeatherInformationByStationId",
  endpoint:
    "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
  inputSchema: weatherInformationByStationIdInputSchema,
  outputSchema: weatherInfoSchema,
  sampleParams: { StationID: 1909 },
  endpointDescription: "Returns single WeatherInfo for specific station.",
});

export const fetchCurrentWeatherForStations = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: weatherInfoGroup,
  functionName: "fetchCurrentWeatherForStations",
  endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
  inputSchema: currentWeatherForStationsInputSchema,
  outputSchema: weatherInfoSchema.array(),
  sampleParams: { StationList: "1909,1966,1970" },
  endpointDescription: "Returns multiple WeatherInfo for specified stations.",
});

export const searchWeatherInformation = defineEndpoint({
  api: apis.wsdotBorderCrossings,
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
    "Returns multiple WeatherInfo for historical time range.",
});
