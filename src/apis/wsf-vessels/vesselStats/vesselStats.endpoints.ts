import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  VesselStatsByIdInput,
  VesselStatsInput,
} from "./vesselStats.input";
import {
  vesselStatsByIdInputSchema,
  vesselStatsInputSchema,
} from "./vesselStats.input";
import type { VesselStat } from "./vesselStats.output";
import { vesselStatSchema } from "./vesselStats.output";

export const vesselStatsResource = {
  name: "vessel-stats",
  documentation: {
    resourceDescription:
      "Each VesselStat item represents technical specifications and capacity data for Washington State Ferries vessels. These items include physical dimensions, engine details, passenger and vehicle capacity, and construction information for each vessel in the fleet.",
    businessContext:
      "Use to compare vessel capabilities and plan capacity by providing technical specifications and capacity data for fleet management applications. Supports vessel selection tools and maintenance planning systems for Washington State Ferry services.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchVesselStats: {
      endpoint: "/vesselStats",
      inputSchema: vesselStatsInputSchema,
      outputSchema: z.array(vesselStatSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselStat objects for all vessels in the fleet.",
    } satisfies EndpointDefinition<VesselStatsInput, VesselStat[]>,
    fetchVesselStatsByVesselId: {
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: vesselStatsByIdInputSchema,
      outputSchema: vesselStatSchema,
      sampleParams: { VesselID: 32 },
      endpointDescription:
        "Returns a VesselStat object containing detailed technical specifications and performance characteristics for the specified vessel.",
    } satisfies EndpointDefinition<VesselStatsByIdInput, VesselStat>,
  },
} satisfies EndpointGroup;
