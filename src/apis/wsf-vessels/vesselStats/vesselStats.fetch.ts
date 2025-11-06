import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselStatsResource } from "./vesselStats.endpoints";
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats.input";
import type { VesselStat } from "./vesselStats.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselStatsResource
);

export const fetchVesselStats = fetchFunctions.fetchVesselStats as (
  params?: FetchFunctionParams<VesselStatsInput>
) => Promise<VesselStat[]>;

export const fetchVesselStatsByVesselId =
  fetchFunctions.fetchVesselStatsByVesselId as (
    params?: FetchFunctionParams<VesselStatsByIdInput>
  ) => Promise<VesselStat>;
