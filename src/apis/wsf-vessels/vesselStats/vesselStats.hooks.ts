import type { UseQueryResult } from "@tanstack/react-query";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { vesselStatsResource } from "./vesselStats.endpoints";
import * as fetchFunctions from "./vesselStats.fetch";
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats.input";
import type { VesselStat } from "./vesselStats.output";

const hooks = createHooks(wsfVesselsApi, vesselStatsResource, fetchFunctions);

export const useVesselStats: (
  params?: FetchFunctionParams<VesselStatsInput>,
  options?: QueryHookOptions<VesselStat[]>
) => UseQueryResult<VesselStat[], Error> = hooks.useVesselStats;

export const useVesselStatsByVesselId: (
  params?: FetchFunctionParams<VesselStatsByIdInput>,
  options?: QueryHookOptions<VesselStat>
) => UseQueryResult<VesselStat, Error> = hooks.useVesselStatsByVesselId;
