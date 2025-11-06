import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselHistoriesResource } from "./vesselHistories.endpoints";
import type {
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistoriesInput,
} from "./vesselHistories.input";
import type { VesselHistory } from "./vesselHistories.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselHistoriesResource
);

export const fetchVesselHistories = fetchFunctions.fetchVesselHistories as (
  params?: FetchFunctionParams<VesselHistoriesInput>
) => Promise<VesselHistory[]>;

export const fetchVesselHistoriesByVesselNameAndDateRange =
  fetchFunctions.fetchVesselHistoriesByVesselNameAndDateRange as (
    params?: FetchFunctionParams<VesselHistoriesByVesselNameAndDateRangeInput>
  ) => Promise<VesselHistory[]>;
