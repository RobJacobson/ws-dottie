import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import { vesselHistoriesResource } from "./vesselHistories.endpoints";
import * as fetchFunctions from "./vesselHistories.fetch";
import type {
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistoriesInput,
} from "./vesselHistories.input";
import type { VesselHistory } from "./vesselHistories.output";

const hooks = createHooks(
  wsfVesselsApi,
  vesselHistoriesResource,
  fetchFunctions
);

export const useVesselHistories: (
  params?: FetchFunctionParams<VesselHistoriesInput>,
  options?: QueryHookOptions<VesselHistory[]>
) => UseQueryResult<VesselHistory[], Error> = hooks.useVesselHistories;

export const useVesselHistoriesByVesselNameAndDateRange: (
  params?: FetchFunctionParams<VesselHistoriesByVesselNameAndDateRangeInput>,
  options?: QueryHookOptions<VesselHistory[]>
) => UseQueryResult<VesselHistory[], Error> =
  hooks.useVesselHistoriesByVesselNameAndDateRange;
