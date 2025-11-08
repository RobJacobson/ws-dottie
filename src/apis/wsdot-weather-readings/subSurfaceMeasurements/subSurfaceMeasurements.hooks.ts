import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotWeatherReadingsApi } from "@/apis/wsdot-weather-readings/apiDefinition";
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
