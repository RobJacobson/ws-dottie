import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  type VesselHistoriesByVesselNameAndDateRangeInput,
  type VesselHistoriesInput,
  vesselHistoriesByVesselNameAndDateRangeInputSchema,
  vesselHistoriesInputSchema,
} from "./vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./vesselHistories.output";

export const vesselHistoriesGroup: EndpointGroup = {
  name: "vessel-histories",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Historical sailing records for WSF vessels.",
    description:
      "Historical voyage data including departure and arrival terminals, scheduled and actual departure times, and estimated arrival times. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Analyze on-time performance and voyage patterns.",
      "Track historical vessel movements and routes.",
      "Generate reports on operational history.",
    ],
  },
};

export const fetchVesselHistories = createEndpoint<
  VesselHistoriesInput,
  VesselHistory[]
>({
  api: apis.wsfVessels,
  group: vesselHistoriesGroup,
  functionName: "fetchVesselHistories",
  endpoint: "/vesselHistory",
  inputSchema: vesselHistoriesInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {},
  endpointDescription: "List historical sailing records for all vessels.",
});

export const fetchVesselHistoriesByVesselNameAndDateRange = createEndpoint<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>({
  api: apis.wsfVessels,
  group: vesselHistoriesGroup,
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
});
