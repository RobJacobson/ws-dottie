import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
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
