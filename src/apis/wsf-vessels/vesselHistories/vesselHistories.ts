import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./vesselHistories.input";
import * as o from "./vesselHistories.output";

export const export const vesselHistoriesResource = {: EndpointGroup 
  name: "vessel-histories",
  resourceDescription:
    "Each VesselHistory item represents a historical record for a single sailing between terminals,
  documentation: {
    resourceDescription: "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselHistories: {
      function: "getVesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of VesselHistory data for all vesselHistories.",
    } satisfies EndpointDefinition<
      i.GetAllVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    getVesselHistoriesByVesselNameAndDateRange: {
      function: "getVesselHistoriesByVesselNameAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      endpointDescription:
        "Returns a list of VesselHistory data for all vesselHistories, filtered by vessel name, start date, and end date.",
    } satisfies EndpointDefinition<
      i.GetVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
  },
};
