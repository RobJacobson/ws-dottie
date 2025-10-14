import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const scheduledRoutesResource = {
  name: "scheduled-routes",
  resourceDescription:
    "Scheduled routes represent the predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduledRoutes: {
      function: "getScheduledRoutes",
      endpoint: "/schedroutes",
      inputSchema: i.scheduledRoutesSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: {},
      endpointDescription: "Returns all scheduled routes.",
    } satisfies EndpointDefinition<i.ScheduledRoutesInput, o.Route[]>,
    getScheduledRoutesById: {
      function: "getScheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: i.scheduledRoutesByScheduleIdSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      endpointDescription:
        "Returns scheduled routes for the specified schedule ID.",
    } satisfies EndpointDefinition<
      i.ScheduledRoutesByScheduleIdInput,
      o.Route[]
    >,
  },
};
