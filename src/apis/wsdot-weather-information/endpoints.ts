import type { ApiDefinition } from "@/apis/types";

// Import the resource
import { weatherInfoResource } from "./weatherInfo/weatherInfo";

// Combine all resources into the legacy format for backward compatibility
export const wsdotWeatherInformationApi: ApiDefinition = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(weatherInfoResource.endpoints),
  ],
};

// Export individual resources for direct use
export { weatherInfoResource };
