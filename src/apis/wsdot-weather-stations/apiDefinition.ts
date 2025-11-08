import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { weatherStationsResource } from "./weatherStations/weatherStations.endpoints";

export const wsdotWeatherStationsApi = {
  name: "wsdot-weather-stations",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
  endpointGroups: [weatherStationsResource],
} satisfies ApiDefinition;
