import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/shared/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/shared/surfaceMeasurements.endpoints";
import { weatherReadingsGroup } from "./weatherReadings/shared/weatherReadings.endpoints";

export const wsdotWeatherReadingsApi = {
  api: apis.wsdotWeatherReadings,
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
} satisfies ApiDefinition;
