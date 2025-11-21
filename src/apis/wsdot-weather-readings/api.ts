import type { ApiDefinition } from "@/apis/types";
import { wsdotWeatherReadingsApiMeta } from "./apiMeta";
import { subSurfaceMeasurementsGroup } from "./subSurfaceMeasurements/shared/subSurfaceMeasurements.endpoints";
import { surfaceMeasurementsGroup } from "./surfaceMeasurements/shared/surfaceMeasurements.endpoints";
import { weatherReadingsGroup } from "./weatherReadings/shared/weatherReadings.endpoints";

export const wsdotWeatherReadings: ApiDefinition = {
  api: wsdotWeatherReadingsApiMeta,
  endpointGroups: [
    weatherReadingsGroup,
    surfaceMeasurementsGroup,
    subSurfaceMeasurementsGroup,
  ],
};
