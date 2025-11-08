import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { alertAreasGroup } from "./alertAreas.endpoints";
import * as fetchFunctions from "./alertAreas.fetch";
import type { MapAreasInput } from "./alertAreas.input";
import type { Area } from "./alertAreas.output";

const hooks = createHooks(
  wsdotHighwayAlertsApi,
  alertAreasGroup,
  fetchFunctions
);

export const useMapAreas: (
  params?: FetchFunctionParams<MapAreasInput>,
  options?: QueryHookOptions<Area[]>
) => UseQueryResult<Area[], Error> = hooks.useMapAreas;
