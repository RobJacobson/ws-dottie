import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements.endpoints";
import type { SubSurfaceMeasurementsInput } from "./subSurfaceMeasurements.input";
import type { SubsurfaceMeasurement } from "./subSurfaceMeasurements.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  subSurfaceMeasurementsResource
);

export const fetchSubSurfaceMeasurements =
  fetchFunctions.fetchSubSurfaceMeasurements as (
    params?: FetchFunctionParams<SubSurfaceMeasurementsInput>
  ) => Promise<SubsurfaceMeasurement[]>;
