import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
export const fetchVesselHistoriesByVesselNameAndDateRange: FetchFactory<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesByVesselNameAndDateRangeMeta,
});

/**
 * React Query hook for retrieving historical sailing records for a vessel within a date range
 */
export const useVesselHistoriesByVesselNameAndDateRange: HookFactory<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselHistoriesByVesselNameAndDateRangeMeta.functionName,
  fetchFn: fetchVesselHistoriesByVesselNameAndDateRange,
  cacheStrategy: vesselHistoriesGroup.cacheStrategy,
});
