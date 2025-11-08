import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { surfaceMeasurementsResource } from "./surfaceMeasurements.endpoints";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";

const fetchFunctions = createFetchFunctions(
  wsdotWeatherReadingsApi,
  surfaceMeasurementsResource
);

export const fetchSurfaceMeasurements: (
  params?: FetchFunctionParams<SurfaceMeasurementsInput>
) => Promise<SurfaceMeasurement[]> = fetchFunctions.fetchSurfaceMeasurements;
