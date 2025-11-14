import type { ApiDefinition } from "@/apis/types";

// Import the resource
import { weatherInfoGroup } from "./weatherInfo/weatherInfo.endpoints";

export const wsdotWeatherInformationApi = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  endpointGroups: [weatherInfoGroup],
} satisfies ApiDefinition;
