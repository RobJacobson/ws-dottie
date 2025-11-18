import type { ApiDefinition } from "@/apis/types";
import { weatherInfoGroup } from "./weatherInfo/shared/weatherInfo.endpoints";

export const wsdotWeatherInformationApi: ApiDefinition = {
  api: {
    name: "wsdot-weather-information",
    baseUrl:
      "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  },
  endpointGroups: [weatherInfoGroup],
};
