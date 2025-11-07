import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { surfaceMeasurementsResource } from "./surfaceMeasurements.endpoints";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotWeatherReadingsApi,
  surfaceMeasurementsResource
);

export const fetchSurfaceMeasurements: (
  params?: FetchFunctionParams<SurfaceMeasurementsInput>
) => Promise<SurfaceMeasurement[]> = fetchFunctions.fetchSurfaceMeasurements;
