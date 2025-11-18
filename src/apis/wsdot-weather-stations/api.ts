import type { ApiDefinition } from "@/apis/types";
import { weatherStationsGroup } from "./weatherStations/shared/weatherStations.endpoints";

export const wsdotWeatherStationsApi: ApiDefinition = {
  api: {
    name: "wsdot-weather-stations",
    baseUrl:
      "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
  },
  endpointGroups: [weatherStationsGroup],
};
