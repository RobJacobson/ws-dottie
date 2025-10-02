import { createApiDefinition } from "../utils";
import {
  getCurrentStationsInputSchema,
  getCurrentWeatherInformationByStationIDInputSchema,
  getCurrentWeatherInformationInputSchema,
  getWeatherInformationExtendedInputSchema,
} from "./original/inputSchemas.original";
import {
  weatherInformationListSchema,
  weatherInfoSchema,
  weatherReadingsListSchema,
  weatherStationsListSchema,
} from "./original/outputSchemas.original";

export const wsdotWeatherInformationApi = createApiDefinition(
  "wsdot-weather-information",
  [
    {
      function: "getWeatherInformation",
      endpoint:
        "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson",
      inputSchema: getCurrentWeatherInformationInputSchema,
      outputSchema: weatherInformationListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getWeatherInformationByStationId",
      endpoint:
        "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={StationID}",
      inputSchema: getCurrentWeatherInformationByStationIDInputSchema,
      outputSchema: weatherInfoSchema,
      sampleParams: { StationID: 1909 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getWeatherInformationExtended",
      endpoint: "/traffic/api/api/Scanweb",
      inputSchema: getWeatherInformationExtendedInputSchema,
      outputSchema: weatherReadingsListSchema,
      sampleParams: {},
      cacheStrategy: "MODERATE",
    },
    {
      function: "getWeatherStations",
      endpoint:
        "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentStationsAsJson",
      inputSchema: getCurrentStationsInputSchema,
      outputSchema: weatherStationsListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
  ]
);
