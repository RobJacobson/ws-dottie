import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type AllSailingsBySchedRouteIDInput,
  allSailingsBySchedRouteIDInputSchema,
  type SailingsByRouteIDInput,
  sailingsByRouteIDInputSchema,
} from "./sailings.input";
import { type Sailing, sailingSchema } from "./sailings.output";

export const sailingsResource = {
  name: "sailings",
  documentation: {
    resourceDescription:
      "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.",
    businessContext: "",
  },
  // Using FREQUENT strategy because sailings can change throughout the day as schedules are adjusted
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchAllSailingsBySchedRouteID: {
      endpoint: "/allsailings/{SchedRouteID}",
      inputSchema: allSailingsBySchedRouteIDInputSchema,
      outputSchema: z.array(sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns all sailing data for the specified scheduled route ID.",
    } satisfies EndpointDefinition<AllSailingsBySchedRouteIDInput, Sailing[]>,
    fetchSailingsByRouteID: {
      endpoint: "/sailings/{SchedRouteID}",
      inputSchema: sailingsByRouteIDInputSchema,
      outputSchema: z.array(sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      endpointDescription:
        "Returns sailing data for the specified scheduled route ID.",
    } satisfies EndpointDefinition<SailingsByRouteIDInput, Sailing[]>,
  },
} satisfies EndpointGroup;
