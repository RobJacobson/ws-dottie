import type { ApiDefinition } from "@/apis/types";
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/surfaceMeasurements.endpoints";
// Import all resources
import { weatherReadingsGroup } from "./weatherReadings/weatherReadings.endpoints";

export const wsdotWeatherReadingsApi = {
  name: "wsdot-weather-readings",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/api",
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
} satisfies ApiDefinition;
