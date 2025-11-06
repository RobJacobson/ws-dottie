import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./weatherInfo.input";
import * as o from "./weatherInfo.output";

export const weatherInfoResource = {
  name: "weather-info",
  documentation: {
    resourceDescription:
      "Each WeatherInfo item represents current atmospheric conditions from a WSDOT Road Weather Information System station. These stations measure temperature, humidity, wind speed and direction, barometric pressure, precipitation, visibility, and sky coverage to support transportation operations.",
    businessContext:
      "Use to assess road weather conditions by providing real-time atmospheric data for transportation management and traveler safety decisions.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getWeatherInformation: {
      function: "getWeatherInformation",
      endpoint: "/GetCurrentWeatherInformationAsJson",
      inputSchema: i.weatherInformationInputSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple WeatherInfo items for all stations.",
    } satisfies EndpointDefinition<i.WeatherInformationInput, o.WeatherInfo[]>,
    getWeatherInformationByStationId: {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: i.weatherInformationByStationIdInputSchema,
      outputSchema: o.weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      endpointDescription: "Returns single WeatherInfo for specific station.",
    } satisfies EndpointDefinition<
      i.WeatherInformationByStationIdInput,
      o.WeatherInfo
    >,
    getCurrentWeatherForStations: {
      function: "getCurrentWeatherForStations",
      endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: i.currentWeatherForStationsInputSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: { StationList: "1909,1966,1970" },
      endpointDescription:
        "Returns multiple WeatherInfo for specified stations.",
    } satisfies EndpointDefinition<
      i.CurrentWeatherForStationsInput,
      o.WeatherInfo[]
    >,
    searchWeatherInformation: {
      function: "searchWeatherInformation",
      endpoint:
        "/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
      inputSchema: i.searchWeatherInformationInputSchema,
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
        "Returns multiple WeatherInfo for historical time range.",
    } satisfies EndpointDefinition<
      i.SearchWeatherInformationInput,
      o.WeatherInfo[]
    >,
  },
} satisfies EndpointGroup;
