import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { subSurfaceMeasurementsResource } from "./subSurfaceMeasurements.endpoints";
import * as fetchFunctions from "./subSurfaceMeasurements.fetch";
import type { SubSurfaceMeasurementsInput } from "./subSurfaceMeasurements.input";
import type { SubsurfaceMeasurement } from "./subSurfaceMeasurements.output";

const hooks = createEndpointGroupHooks(
  wsdotWeatherReadingsApi,
  subSurfaceMeasurementsResource,
  fetchFunctions
);

export const useSubSurfaceMeasurements: (
  params?: SubSurfaceMeasurementsInput,
  options?: QueryHookOptions<SubsurfaceMeasurement[]>
) => UseQueryResult<SubsurfaceMeasurement[], Error> = hooks.useSubSurfaceMeasurements;
