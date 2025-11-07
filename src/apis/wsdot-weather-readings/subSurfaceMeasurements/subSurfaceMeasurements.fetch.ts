import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements.endpoints";
import type { SubSurfaceMeasurementsInput } from "./subSurfaceMeasurements.input";
import type { SubsurfaceMeasurement } from "./subSurfaceMeasurements.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  subSurfaceMeasurementsResource
);

export const fetchSubSurfaceMeasurements: (
  params?: FetchFunctionParams<SubSurfaceMeasurementsInput>
) => Promise<SubsurfaceMeasurement[]> = fetchFunctions.fetchSubSurfaceMeasurements;
