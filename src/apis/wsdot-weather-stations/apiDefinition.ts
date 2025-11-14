import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-weather-stations",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc",
} as const;

// THEN import groups (which can use API constant)
import { weatherStationsGroup } from "./weatherStations/weatherStations.endpoints";

// Finally, construct full API definition using API constant
export const wsdotWeatherStationsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [weatherStationsGroup],
} satisfies ApiDefinition;
