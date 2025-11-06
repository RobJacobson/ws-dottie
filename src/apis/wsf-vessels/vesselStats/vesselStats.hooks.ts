import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselStatsResource } from "./vesselStats.endpoints";
import * as fetchFunctions from "./vesselStats.fetch";
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats.input";
import type { VesselStat } from "./vesselStats.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselStatsResource,
  fetchFunctions
);

export const useVesselStats = hooks.useVesselStats as (
  params?: VesselStatsInput,
  options?: QueryHookOptions<VesselStat[]>
) => UseQueryResult<VesselStat[], Error>;

export const useVesselStatsByVesselId = hooks.useVesselStatsByVesselId as (
  params?: VesselStatsByIdInput,
  options?: QueryHookOptions<VesselStat>
) => UseQueryResult<VesselStat, Error>;
