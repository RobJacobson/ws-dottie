import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/surfaceMeasurements.endpoints";
import { weatherReadingsGroup } from "./weatherReadings/weatherReadings.endpoints";

export const wsdotWeatherReadingsApi = {
  api: apis.wsdotWeatherReadings,
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
} satisfies ApiDefinition;
