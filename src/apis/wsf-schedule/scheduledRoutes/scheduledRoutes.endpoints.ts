import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./scheduledRoutes.input";
import * as o from "./scheduledRoutes.output";

export const scheduledRoutesResource = {
  name: "scheduled-routes",
  documentation: {
    resourceDescription:
      "Scheduled routes represent the predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduledRoutes: {
      function: "getScheduledRoutes",
      endpoint: "/schedroutes",
      inputSchema: i.scheduledRoutesInputSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: {},
      endpointDescription: "Returns all scheduled routes.",
    } satisfies EndpointDefinition<i.ScheduledRoutesInput, o.SchedRoute[]>,
    getScheduledRoutesById: {
      function: "getScheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: i.scheduledRoutesByIdInputSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      endpointDescription:
        "Returns scheduled routes for the specified schedule ID.",
    } satisfies EndpointDefinition<i.ScheduledRoutesByIdInput, o.SchedRoute[]>,
  },
} satisfies EndpointGroup;
