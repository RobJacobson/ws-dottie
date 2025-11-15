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
    resourceDescription:
      "Each VesselHistory item represents a historical record for a single sailing between terminals, including vessel, departure details (including departure terminal, scheduled departure time, and actual departure time), and arrival details (including arrival terminal and estimated arrival time).",
    businessContext: "",
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
  endpointDescription:
    "Returns multiple VesselHistory objects for all vessels in fleet.",
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
    "Returns multiple VesselHistory objects for specified vessel and date range.",
});
