import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "WeatherInfo provides current weather conditions from WSDOT weather stations including temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage. Data is updated frequently and represents real-time weather observations.";

export const weatherInfoResource = {
  name: "weather-info",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getWeatherInformation",
      endpoint: "/GetCurrentWeatherInformationAsJson",
      inputSchema: i.getCurrentWeatherInformationSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current weather information for all stations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationInput,
      o.WeatherInfo[]
    >,
    byId: {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: i.getCurrentWeatherInformationByStationIDSchema,
      outputSchema: o.weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      cacheStrategy: "FREQUENT",
      description: `Returns current weather information for a specific station by ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationByStationIDInput,
      o.WeatherInfo
    >,
    byStationList: {
      function: "getCurrentWeatherForStations",
      endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: i.getCurrentWeatherForStationsSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: { StationList: "1909,1966,1970" },
      cacheStrategy: "FREQUENT",
      description: `Returns current weather information for multiple stations specified by a comma-separated list of station IDs. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherForStationsInput,
      o.WeatherInfo[]
    >,
    search: {
      function: "searchWeatherInformation",
      endpoint:
        "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
      inputSchema: i.searchWeatherInformationSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {
        StationID: 1980,
        SearchStartTime: new Date(`${datesHelper.yesterday()}T0:00:00Z`),
        SearchEndTime: new Date(`${datesHelper.today()}T23:59:59Z`),
      },
      cacheStrategy: "FREQUENT",
      description: `Returns historical weather information for a specific station within a given time range. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.SearchWeatherInformationInput,
      o.WeatherInfo[]
    >,
  },
};
