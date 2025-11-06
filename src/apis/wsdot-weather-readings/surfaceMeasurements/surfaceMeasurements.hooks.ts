import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { surfaceMeasurementsResource } from "./surfaceMeasurements.endpoints";
import * as fetchFunctions from "./surfaceMeasurements.fetch";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";

const hooks = createEndpointGroupHooks(
  wsdotWeatherReadingsApi,
  surfaceMeasurementsResource,
  fetchFunctions
);

export const useSurfaceMeasurements = hooks.useSurfaceMeasurements as (
  params?: SurfaceMeasurementsInput,
  options?: QueryHookOptions<SurfaceMeasurement[]>
) => UseQueryResult<SurfaceMeasurement[], Error>;
