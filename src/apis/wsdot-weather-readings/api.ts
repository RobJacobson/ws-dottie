import type { ApiDefinition } from "@/apis/types";
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/shared/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/shared/surfaceMeasurements.endpoints";
import { weatherReadingsGroup } from "./weatherReadings/shared/weatherReadings.endpoints";

export const wsdotWeatherReadingsApi: ApiDefinition = {
  api: {
    name: "wsdot-weather-readings",
    baseUrl: "https://www.wsdot.wa.gov/traffic/api/api",
  },
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
};
