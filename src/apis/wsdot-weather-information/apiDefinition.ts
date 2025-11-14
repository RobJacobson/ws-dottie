import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-weather-information",
  baseUrl:
    "https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc",
} as const;

// THEN import groups (which can use API constant)
import { weatherInfoGroup } from "./weatherInfo/weatherInfo.endpoints";

// Finally, construct full API definition using API constant
export const wsdotWeatherInformationApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [weatherInfoGroup],
} satisfies ApiDefinition;
