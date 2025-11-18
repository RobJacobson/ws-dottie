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
  type VesselHistoriesByVesselNameAndDateRangeInput,
  vesselHistoriesByVesselNameAndDateRangeInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistoriesByVesselNameAndDateRange endpoint
 */
export const vesselHistoriesByVesselNameAndDateRangeMeta = {
  functionName: "fetchVesselHistoriesByVesselNameAndDateRange",
  endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
  inputSchema: vesselHistoriesByVesselNameAndDateRangeInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {
    VesselName: "Tacoma",
    DateStart: "2025-09-01",
    DateEnd: "2025-10-01",
  },
  endpointDescription:
    "Get historical sailing records for a vessel within a date range.",
} satisfies EndpointMeta<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>;

/**
 * Fetch function for retrieving historical sailing records for a vessel within a date range
 */
export const fetchVesselHistoriesByVesselNameAndDateRange: (
  params?: FetchFunctionParams<VesselHistoriesByVesselNameAndDateRangeInput>
) => Promise<VesselHistory[]> = createFetchFunction(
  wsfVesselsApi.api,
  vesselHistoriesGroup,
  vesselHistoriesByVesselNameAndDateRangeMeta
);

/**
 * React Query hook for retrieving historical sailing records for a vessel within a date range
 */
export const useVesselHistoriesByVesselNameAndDateRange: (
  params?: FetchFunctionParams<VesselHistoriesByVesselNameAndDateRangeInput>,
  options?: QueryHookOptions<VesselHistory[]>
) => UseQueryResult<VesselHistory[], Error> = createHook(
  wsfVesselsApi.api,
  vesselHistoriesGroup,
  vesselHistoriesByVesselNameAndDateRangeMeta
);
