import type { ApiDefinition } from "@/apis/types";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsResource } from "./surfaceMeasurements/surfaceMeasurements.endpoints";
// Import all resources
import { weatherReadingsResource } from "./weatherReadings/weatherReadings.endpoints";

export const wsdotWeatherReadingsApi: ApiDefinition = {
  name: "wsdot-weather-readings",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/api",
  endpointGroups: [
    weatherReadingsResource,
    surfaceMeasurementsResource,
    subSurfaceMeasurementsResource,
  ],
};

// Export individual resources for direct use
export {
  weatherReadingsResource,
  surfaceMeasurementsResource,
  subSurfaceMeasurementsResource,
};
