import type { ApiDefinition } from "@/apis/types";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements/subSurfaceMeasurements";
import { surfaceMeasurementsResource } from "./surfaceMeasurements/surfaceMeasurements";
// Import all resources
import { weatherReadingsResource } from "./weatherReadings/weatherReadings";

// Combine all resources into the legacy format for backward compatibility
export const wsdotWeatherReadingsApi: ApiDefinition = {
  name: "wsdot-weather-readings",
  baseUrl: "http://www.wsdot.wa.gov/traffic/api/api",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(weatherReadingsResource.endpoints),
    ...Object.values(surfaceMeasurementsResource.endpoints),
    ...Object.values(subSurfaceMeasurementsResource.endpoints),
  ],
};

// Export individual resources for direct use
export {
  weatherReadingsResource,
  surfaceMeasurementsResource,
  subSurfaceMeasurementsResource,
};
