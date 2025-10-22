import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./vesselStats.input";
import * as o from "./vesselStats.output";

export const vesselStatsResource: EndpointGroup = {
  name: "vessel-stats",
  documentation: {
    resourceDescription:
      "Each VesselStat item represents detailed vessel specifications including physical dimensions (length, beam, draft), engine specifications (count, horsepower, propulsion type), capacity information (passenger count, vehicle space), and historical details (year built, vessel history). Data updates infrequently.",
    businessContext: "",
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
        "Returns a list of VesselStat data for all vesselStats.",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    getVesselStatsByVesselId: {
      function: "getVesselStatsByVesselId",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      endpointDescription:
        "Returns VesselStat data for the vesselstat with the given identifier.",
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStats>,
  },
};
