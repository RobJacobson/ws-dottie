import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./vesselStats.input";
import * as o from "./vesselStats.output";

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
    getVesselStats: {
      function: "getVesselStats",
      endpoint: "/vesselStats",
      inputSchema: i.vesselStatsInputSchema,
      outputSchema: z.array(o.vesselStatSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselStat objects for all vessels in the fleet.",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStat[]>,
    getVesselStatsByVesselId: {
      function: "getVesselStatsByVesselId",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdInputSchema,
      outputSchema: o.vesselStatSchema,
      sampleParams: { VesselID: 32 },
      endpointDescription:
        "Returns a VesselStat object containing detailed technical specifications and performance characteristics for the specified vessel.",
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStat>,
  },
} satisfies EndpointGroup;
