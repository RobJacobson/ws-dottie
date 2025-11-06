import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { surfaceMeasurementsResource } from "./surfaceMeasurements.endpoints";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  surfaceMeasurementsResource
);

export const fetchSurfaceMeasurements =
  fetchFunctions.fetchSurfaceMeasurements as (
    params?: FetchFunctionParams<SurfaceMeasurementsInput>
  ) => Promise<SurfaceMeasurement[]>;
