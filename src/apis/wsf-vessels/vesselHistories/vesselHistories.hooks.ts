import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselHistoriesResource } from "./vesselHistories.endpoints";
import * as fetchFunctions from "./vesselHistories.fetch";
import type {
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistoriesInput,
} from "./vesselHistories.input";
import type { VesselHistory } from "./vesselHistories.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselHistoriesResource,
  fetchFunctions
);

export const useVesselHistories = hooks.useVesselHistories as (
  params?: VesselHistoriesInput,
  options?: QueryHookOptions<VesselHistory[]>
) => UseQueryResult<VesselHistory[], Error>;

export const useVesselHistoriesByVesselNameAndDateRange =
  hooks.useVesselHistoriesByVesselNameAndDateRange as (
    params?: VesselHistoriesByVesselNameAndDateRangeInput,
    options?: QueryHookOptions<VesselHistory[]>
  ) => UseQueryResult<VesselHistory[], Error>;
