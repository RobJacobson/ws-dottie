import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotWeatherInformationApi: ApiDefinition = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  endpoints: [
    /**
     * WeatherInfo response
     */
    {
      function: "getWeatherInformation",
      endpoint: "/GetCurrentWeatherInformationAsJson",
      inputSchema: i.getCurrentWeatherInformationSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationInput,
      o.WeatherInfo[]
    >,
    {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: i.getCurrentWeatherInformationByStationIDSchema,
      outputSchema: o.weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherInformationByStationIDInput,
      o.WeatherInfo
    >,
    {
      function: "getCurrentWeatherForStations",
      endpoint: "/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: i.getCurrentWeatherForStationsSchema,
      outputSchema: z.array(o.weatherInfoSchema),
      sampleParams: { StationList: "1909,1966,1970" },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCurrentWeatherForStationsInput,
      o.WeatherInfo[]
    >,
    {
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
      description: "",
    } satisfies EndpointDefinition<
      i.SearchWeatherInformationInput,
      o.WeatherInfo[]
    >,
  ],
};
