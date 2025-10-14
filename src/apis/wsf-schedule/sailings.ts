import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.";

export const sailingsResource = {
  name: "sailings",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    allBySchedRoute: {
      function: "getSailingsBySchedRouteID",
      endpoint: "/allsailings/{SchedRouteID}",
      inputSchema: i.allSchedSailingsBySchedRouteSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: `Returns all sailing data for the specified scheduled route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.AllSchedSailingsBySchedRouteInput,
      o.Sailing[]
    >,
    bySchedRoute: {
      function: "getSailingsBySchedRouteID",
      endpoint: "/sailings/{SchedRouteID}",
      inputSchema: i.sailingsByRouteIdSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: `Returns sailing data for the specified scheduled route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.SailingsByRouteIdInput, o.Sailing[]>,
  },
};
