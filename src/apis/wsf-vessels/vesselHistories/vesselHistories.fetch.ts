import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { vesselHistoriesResource } from "./vesselHistories.endpoints";
import type {
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistoriesInput,
} from "./vesselHistories.input";
import type { VesselHistory } from "./vesselHistories.output";

const fetchFunctions = createFetchFunctions(
  wsfVesselsApi,
  vesselHistoriesResource
);

export const fetchVesselHistories: (
  params?: FetchFunctionParams<VesselHistoriesInput>
) => Promise<VesselHistory[]> = fetchFunctions.fetchVesselHistories;

export const fetchVesselHistoriesByVesselNameAndDateRange: (
  params?: FetchFunctionParams<VesselHistoriesByVesselNameAndDateRangeInput>
) => Promise<VesselHistory[]> =
  fetchFunctions.fetchVesselHistoriesByVesselNameAndDateRange;
