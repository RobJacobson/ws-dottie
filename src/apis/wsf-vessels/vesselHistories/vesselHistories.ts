import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
import { vesselHistoriesGroup } from "./shared/vesselHistories.endpoints";
import {
  type VesselHistoriesInput,
  vesselHistoriesInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistories endpoint
 */
export const vesselHistoriesMeta = {
  functionName: "fetchVesselHistories",
  endpoint: "/vesselHistory",
  inputSchema: vesselHistoriesInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {},
  endpointDescription: "List historical sailing records for all vessels.",
} satisfies EndpointMeta<VesselHistoriesInput, VesselHistory[]>;

/**
 * Fetch function for retrieving historical sailing records for all vessels
 */
export const fetchVesselHistories: (
  params?: FetchFunctionParams<VesselHistoriesInput>
) => Promise<VesselHistory[]> = createFetchFunction(
  wsfVesselsApi.api,
  vesselHistoriesGroup,
  vesselHistoriesMeta
);

/**
 * React Query hook for retrieving historical sailing records for all vessels
 */
export const useVesselHistories: (
  params?: FetchFunctionParams<VesselHistoriesInput>,
  options?: QueryHookOptions<VesselHistory[]>
) => UseQueryResult<VesselHistory[], Error> = createHook(
  wsfVesselsApi.api,
  vesselHistoriesGroup,
  vesselHistoriesMeta
);
