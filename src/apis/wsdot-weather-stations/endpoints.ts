import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { weatherStationsResource } from "./weatherStations";

// Combine all resources into the legacy format for backward compatibility
export const wsdotWeatherStationsApi: ApiDefinition = {
  name: "wsdot-weather-stations",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(weatherStationsResource.endpoints),
  ],
};

// Export individual resources for direct use
export { weatherStationsResource };
