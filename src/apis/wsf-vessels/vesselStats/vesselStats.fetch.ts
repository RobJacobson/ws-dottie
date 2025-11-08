import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { vesselStatsResource } from "./vesselStats.endpoints";
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats.input";
import type { VesselStat } from "./vesselStats.output";

const fetchFunctions = createFetchFunctions(wsfVesselsApi, vesselStatsResource);

export const fetchVesselStats: (
  params?: FetchFunctionParams<VesselStatsInput>
) => Promise<VesselStat[]> = fetchFunctions.fetchVesselStats;

export const fetchVesselStatsByVesselId: (
  params?: FetchFunctionParams<VesselStatsByIdInput>
) => Promise<VesselStat> = fetchFunctions.fetchVesselStatsByVesselId;
