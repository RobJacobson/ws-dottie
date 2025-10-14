import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.";

export const vesselHistoriesResource = {
  name: "vessel-histories",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselHistory data for all vesselHistories. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetAllVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    filtered: {
      function: "getVesselHistoriesByVesselNameAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselHistory data for all vesselHistories, filtered by vessel name, start date, and end date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
  },
};
