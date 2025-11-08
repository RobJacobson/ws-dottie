import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  VesselHistoriesByVesselNameAndDateRangeInput,
  VesselHistoriesInput,
} from "./vesselHistories.input";
import {
  vesselHistoriesByVesselNameAndDateRangeInputSchema,
  vesselHistoriesInputSchema,
} from "./vesselHistories.input";
import type { VesselHistory } from "./vesselHistories.output";
import { vesselHistorySchema } from "./vesselHistories.output";

export const vesselHistoriesResource = {
  name: "vessel-histories",
  documentation: {
    resourceDescription:
      "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time).",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchVesselHistories: {
      endpoint: "/vesselHistory",
      inputSchema: vesselHistoriesInputSchema,
      outputSchema: z.array(vesselHistorySchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselHistory objects for all vessels in fleet.",
    } satisfies EndpointDefinition<VesselHistoriesInput, VesselHistory[]>,
    fetchVesselHistoriesByVesselNameAndDateRange: {
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: vesselHistoriesByVesselNameAndDateRangeInputSchema,
      outputSchema: z.array(vesselHistorySchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      endpointDescription:
        "Returns multiple VesselHistory objects for the specified vessel and date range.",
    } satisfies EndpointDefinition<
      VesselHistoriesByVesselNameAndDateRangeInput,
      VesselHistory[]
    >,
  },
} satisfies EndpointGroup;
