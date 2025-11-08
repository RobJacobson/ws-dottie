import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfVesselsApi } from "../apiDefinition";
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
