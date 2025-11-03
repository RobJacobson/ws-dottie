import { z } from "@/shared/zod-openapi-init";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./vesselStats.input";
import * as o from "./vesselStats.output";

export const vesselStatsResource: EndpointGroup = {
  name: "vessel-stats",
  documentation: {
    resourceDescription:
      "Each VesselStat item represents technical specifications and capacity data for Washington State Ferries vessels. These items include physical dimensions, engine details, passenger and vehicle capacity, and construction information for each vessel in the fleet.",
    businessContext:
      "Use to compare vessel capabilities and plan capacity by providing technical specifications and capacity data for fleet management applications. Supports vessel selection tools and maintenance planning systems for Washington State Ferry services.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getVesselStats: {
      function: "getVesselStats",
      endpoint: "/vesselStats",
      inputSchema: i.vesselStatsSchema,
      outputSchema: z.array(o.vesselStatsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselStat objects for all vessels in the fleet.",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    getVesselStatsByVesselId: {
      function: "getVesselStatsByVesselId",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      endpointDescription:
        "Returns a VesselStat object containing detailed technical specifications and performance characteristics for the specified vessel.",
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStats>,
  },
};
