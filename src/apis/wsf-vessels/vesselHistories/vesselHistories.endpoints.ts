import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfVesselsApi } from "../apiDefinition";
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

const group = defineEndpointGroup({
  api: wsfVesselsApi,
  name: "vessel-histories",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time).",
    businessContext: "",
  },
});

export const fetchVesselHistories = defineEndpoint<
  VesselHistoriesInput,
  VesselHistory[]
>({
  group,
  functionName: "fetchVesselHistories",
  definition: {
    endpoint: "/vesselHistory",
    inputSchema: vesselHistoriesInputSchema,
    outputSchema: vesselHistorySchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple VesselHistory objects for all vessels in fleet.",
  },
});

export const fetchVesselHistoriesByVesselNameAndDateRange = defineEndpoint<
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistory[]
>({
  group,
  functionName: "fetchVesselHistoriesByVesselNameAndDateRange",
  definition: {
    endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
    inputSchema: vesselHistoriesByVesselNameAndDateRangeInputSchema,
    outputSchema: vesselHistorySchema.array(),
    sampleParams: {
      VesselName: "Tacoma",
      DateStart: "2025-09-01",
      DateEnd: "2025-10-01",
    },
    endpointDescription:
      "Returns multiple VesselHistory objects for the specified vessel and date range.",
  },
});

export const vesselHistoriesResource = group.descriptor;
