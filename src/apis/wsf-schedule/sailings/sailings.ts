import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./sailings.input";
import * as o from "./sailings.output";

export const export const sailingsResource = {: EndpointGroup 
  name: "sailings",
  resourceDescription:
    "Sailing information represents individual ferry trips with departure and arrival times,
  documentation: {
    resourceDescription: "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
  endpoints: {
    getAllSailingsBySchedRouteID: {
      function: "getSailingsBySchedRouteID",
      endpoint: "/allsailings/{SchedRouteID}",
      inputSchema: i.allSchedSailingsBySchedRouteSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns all sailing data for the specified scheduled route ID.",
    } satisfies EndpointDefinition<
      i.AllSchedSailingsBySchedRouteInput,
      o.Sailing[]
    >,
    getSailingsByRouteID: {
      function: "getSailingsBySchedRouteID",
      endpoint: "/sailings/{SchedRouteID}",
      inputSchema: i.sailingsByRouteIdSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns sailing data for the specified scheduled route ID.",
    } satisfies EndpointDefinition<i.SailingsByRouteIdInput, o.Sailing[]>,
  },
};
