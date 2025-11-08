import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { surfaceMeasurementsResource } from "./surfaceMeasurements.endpoints";
import * as fetchFunctions from "./surfaceMeasurements.fetch";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";

const hooks = createHooks(
  wsdotWeatherReadingsApi,
  surfaceMeasurementsResource,
  fetchFunctions
);

export const useSurfaceMeasurements: (
  params?: FetchFunctionParams<SurfaceMeasurementsInput>,
  options?: QueryHookOptions<SurfaceMeasurement[]>
) => UseQueryResult<SurfaceMeasurement[], Error> = hooks.useSurfaceMeasurements;
