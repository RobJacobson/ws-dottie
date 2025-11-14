import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-weather-readings",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/api",
} as const;

// THEN import groups (which can use API constant)
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/surfaceMeasurements.endpoints";
// Import all resources
import { weatherReadingsGroup } from "./weatherReadings/weatherReadings.endpoints";

// Finally, construct full API definition using API constant
export const wsdotWeatherReadingsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
} satisfies ApiDefinition;
