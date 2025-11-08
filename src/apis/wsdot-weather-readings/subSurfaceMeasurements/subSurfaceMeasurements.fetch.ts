import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
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
