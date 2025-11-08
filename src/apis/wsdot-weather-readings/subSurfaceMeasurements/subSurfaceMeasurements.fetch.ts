import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements.endpoints";
import type { SubSurfaceMeasurementsInput } from "./subSurfaceMeasurements.input";
import type { SubsurfaceMeasurement } from "./subSurfaceMeasurements.output";

const fetchFunctions = createFetchFunctions(
  wsdotWeatherReadingsApi,
  subSurfaceMeasurementsResource
);

export const fetchSubSurfaceMeasurements: (
  params?: FetchFunctionParams<SubSurfaceMeasurementsInput>
) => Promise<SubsurfaceMeasurement[]> =
  fetchFunctions.fetchSubSurfaceMeasurements;
