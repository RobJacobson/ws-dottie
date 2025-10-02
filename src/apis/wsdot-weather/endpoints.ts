import { datesHelper } from "@/shared/utils";
import { createApiDefinition } from "../utils";
import * as input from "./original/inputSchemas.original";
import * as output from "./original/outputSchemas.original";

export const wsdotWeatherApi = createApiDefinition("wsdot-weather", [
  {
    function: "getWeatherInformation",
    endpoint:
      "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
    inputSchema: input.getCurrentWeatherInformationSchema,
    outputSchema: output.weatherInformationListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getWeatherInformationByStationId",
    endpoint:
      "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
    inputSchema: input.getCurrentWeatherInformationByStationIDSchema,
    outputSchema: output.weatherInfoSchema,
    sampleParams: { StationID: 1909 },
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getCurrentWeatherForStations",
    endpoint:
      "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherForStationsAsJson?StationList={StationList}",
    inputSchema: input.getCurrentWeatherForStationsSchema,
    outputSchema: output.weatherInformationListSchema,
    sampleParams: { StationList: "1909,1966,1970" },
    cacheStrategy: "FREQUENT",
  },
  {
    function: "searchWeatherInformation",
    endpoint:
      "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?StationID={StationID}&SearchStartTime={SearchStartTime}&SearchEndTime={SearchEndTime}",
    inputSchema: input.searchWeatherInformationSchema,
    outputSchema: output.weatherInformationListSchema,
    sampleParams: {
      StationID: 1980,
      SearchStartTime: datesHelper.yesterday(),
      SearchEndTime: datesHelper.today(),
    },
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getWeatherInformationExtended",
    endpoint: "/traffic/api/api/Scanweb",
    inputSchema: input.getWeatherInformationExtendedSchema,
    outputSchema: output.weatherReadingsListSchema,
    sampleParams: {},
    cacheStrategy: "MODERATE",
  },
  {
    function: "getWeatherStations",
    endpoint:
      "/Traffic/api/WeatherStations/WeatherStationsREST.svc/GetCurrentStationsAsJson",
    inputSchema: input.getCurrentStationsSchema,
    outputSchema: output.weatherStationsListSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
]);
