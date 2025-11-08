import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements.endpoints";
import * as fetchFunctions from "./subSurfaceMeasurements.fetch";
import type { SubSurfaceMeasurementsInput } from "./subSurfaceMeasurements.input";
import type { SubsurfaceMeasurement } from "./subSurfaceMeasurements.output";

const hooks = createHooks(
  wsdotWeatherReadingsApi,
  subSurfaceMeasurementsResource,
  fetchFunctions
);

export const useSubSurfaceMeasurements: (
  params?: FetchFunctionParams<SubSurfaceMeasurementsInput>,
  options?: QueryHookOptions<SubsurfaceMeasurement[]>
) => UseQueryResult<SubsurfaceMeasurement[], Error> =
  hooks.useSubSurfaceMeasurements;
