import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const sailingsResource = {
  name: "sailings",
  resourceDescription:
    "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.",
  cacheStrategy: "STATIC" as const,
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
