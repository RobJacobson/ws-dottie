import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
 * Factory result for vessel histories by vessel name and date range
 */
const vesselHistoriesByVesselNameAndDateRangeFactory = createFetchAndHook<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesByVesselNameAndDateRangeMeta,
  getEndpointGroup: () =>
    require("./shared/vesselHistories.endpoints").vesselHistoriesGroup,
});

/**
 * Fetch function and React Query hook for retrieving historical sailing records for a vessel within a date range
 */
export const {
  fetch: fetchVesselHistoriesByVesselNameAndDateRange,
  hook: useVesselHistoriesByVesselNameAndDateRange,
} = vesselHistoriesByVesselNameAndDateRangeFactory;
