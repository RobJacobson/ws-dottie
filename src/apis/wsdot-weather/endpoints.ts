import type { ApiDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";
import * as input from "./original/inputSchemas.original";
import * as output from "./original/outputSchemas.original";

export const wsdotWeatherApi: ApiDefinition = {
  name: "wsdot-weather",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/weatherinformation/weatherinformationrest.svc",
  endpoints: [
    {
      function: "getWeatherInformation",
      endpoint: "/getCurrentWeatherInformationAsJson",
      inputSchema: input.getCurrentWeatherInformationSchema,
      outputSchema: output.weatherInformationListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/getCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: input.getCurrentWeatherInformationByStationIDSchema,
      outputSchema: output.weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getCurrentWeatherForStations",
      endpoint: "/getCurrentWeatherForStationsAsJson?StationList={StationList}",
      inputSchema: input.getCurrentWeatherForStationsSchema,
      outputSchema: output.weatherInformationListSchema,
      sampleParams: { StationList: "1909,1966,1970" },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "searchWeatherInformation",
      endpoint:
        "/searchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
      inputSchema: input.searchWeatherInformationSchema,
      outputSchema: output.weatherInformationListSchema,
      sampleParams: {
        StationID: 1980,
        SearchStartTime: `${datesHelper.yesterday()}T00:00:00Z`,
        SearchEndTime: `${datesHelper.today()}T23:59:59Z`,
      },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getWeatherInformationExtended",
      endpoint: "/traffic/api/api/scanweb",
      inputSchema: input.getWeatherInformationExtendedSchema,
      outputSchema: output.weatherReadingsListSchema,
      sampleParams: {},
      cacheStrategy: "MODERATE",
    },
    {
      function: "getWeatherStations",
      endpoint: "/getCurrentStationsAsJson",
      inputSchema: input.getCurrentStationsSchema,
      outputSchema: output.weatherStationsListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ],
};
