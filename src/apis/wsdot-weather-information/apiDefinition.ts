import type { ApiDefinition } from "@/apis/types";

// Import the resource
import { weatherInfoResource } from "./weatherInfo/weatherInfo";

export const wsdotWeatherInformationApi: ApiDefinition = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  endpointGroups: [weatherInfoResource],
};

// Export individual resources for direct use
export { weatherInfoResource };
