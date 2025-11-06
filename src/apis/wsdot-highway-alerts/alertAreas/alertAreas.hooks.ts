import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { alertAreasGroup } from "./alertAreas.endpoints";
import * as fetchFunctions from "./alertAreas.fetch";
import type { MapAreasInput } from "./alertAreas.input";
import type { Area } from "./alertAreas.output";

const hooks = createEndpointGroupHooks(
  wsdotHighwayAlertsApi,
  alertAreasGroup,
  fetchFunctions
);

export const useMapAreas = hooks.useMapAreas as (
  params?: MapAreasInput,
  options?: QueryHookOptions<Area[]>
) => UseQueryResult<Area[], Error>;
