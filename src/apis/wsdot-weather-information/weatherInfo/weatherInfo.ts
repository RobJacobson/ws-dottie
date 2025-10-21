import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./weatherInfo.input";
import * as o from "./weatherInfo.output";

export const weatherInfoResource: EndpointGroup = {
  name: "weather-info",
  documentation: {
    resourceDescription:
      "WeatherInfo provides current weather conditions from WSDOT weather stations including temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage. Data is updated frequently and represents real-time weather observations.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getWeatherInformation: {
      function: "getWeatherInformation",
      endpoint: "/GetCurrentWeatherInformationAsJson",
      inputSchema: i.getCurrentWeatherInformationSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {},
      endpointDescription:
        "Returns current weather information for all stations.",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationInput,
      o.WeatherInfo[]
    >,
    getWeatherInformationByStationId: {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: i.getCurrentWeatherInformationByStationIDSchema,
      outputSchema: o.weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      endpointDescription:
        "Returns current weather information for a specific station by ID.",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationByStationIDInput,
      o.WeatherInfo
    >,
    getCurrentWeatherForStations: {
      function: "getCurrentWeatherForStations",
      endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: i.getCurrentWeatherForStationsSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: { StationList: "1909,1966,1970" },
      endpointDescription:
        "Returns current weather information for multiple stations specified by a comma-separated list of station IDs.",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherForStationsInput,
      o.WeatherInfo[]
    >,
    searchWeatherInformation: {
      function: "searchWeatherInformation",
      endpoint:
        "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
      inputSchema: i.searchWeatherInformationSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {
        StationID: 1980,
        SearchStartTime: new Date(
          `${datesHelper.yesterday()}T00:00:00Z`
        ).toISOString(),
        SearchEndTime: new Date(
          `${datesHelper.today()}T23:59:59Z`
        ).toISOString(),
      },
      endpointDescription:
        "Returns historical weather information for a specific station within a given time range.",
    } satisfies EndpointDefinition<
      i.SearchWeatherInformationInput,
      o.WeatherInfo[]
    >,
  },
};
