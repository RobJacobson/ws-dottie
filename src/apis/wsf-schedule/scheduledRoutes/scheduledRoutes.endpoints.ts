import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  ScheduledRoutesByIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes.input";
import {
  scheduledRoutesByIdInputSchema,
  scheduledRoutesInputSchema,
} from "./scheduledRoutes.input";
import type { SchedRoute } from "./scheduledRoutes.output";
import { schedRouteSchema } from "./scheduledRoutes.output";

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
      inputSchema: scheduledRoutesInputSchema,
      outputSchema: z.array(schedRouteSchema),
      sampleParams: {},
      endpointDescription: "Returns all scheduled routes.",
    } satisfies EndpointDefinition<ScheduledRoutesInput, SchedRoute[]>,
    getScheduledRoutesById: {
      function: "getScheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: scheduledRoutesByIdInputSchema,
      outputSchema: z.array(schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      endpointDescription:
        "Returns scheduled routes for the specified schedule ID.",
    } satisfies EndpointDefinition<ScheduledRoutesByIdInput, SchedRoute[]>,
  },
} satisfies EndpointGroup;
