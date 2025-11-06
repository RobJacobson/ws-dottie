import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./vesselHistories.input";
import * as o from "./vesselHistories.output";

export const vesselHistoriesResource = {
  name: "vessel-histories",
  documentation: {
    resourceDescription:
      "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time).",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselHistories: {
      function: "getVesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselHistory objects for all vessels in fleet.",
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
        "Returns multiple VesselHistory objects for the specified vessel and date range.",
    } satisfies EndpointDefinition<
      i.GetVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
  },
} satisfies EndpointGroup;
