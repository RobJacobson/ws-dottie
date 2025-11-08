import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
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
