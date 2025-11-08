import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type ScheduledRoutesByIdInput,
  type ScheduledRoutesInput,
  scheduledRoutesByIdInputSchema,
  scheduledRoutesInputSchema,
} from "./scheduledRoutes.input";
import { type SchedRoute, schedRouteSchema } from "./scheduledRoutes.output";

export const scheduledRoutesResource = {
  name: "scheduled-routes",
  documentation: {
    resourceDescription:
      "Scheduled routes represent the predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
    businessContext: "",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchScheduledRoutes: {
      endpoint: "/schedroutes",
      inputSchema: scheduledRoutesInputSchema,
      outputSchema: z.array(schedRouteSchema),
      sampleParams: {},
      endpointDescription: "Returns all scheduled routes.",
    } satisfies EndpointDefinition<ScheduledRoutesInput, SchedRoute[]>,
    fetchScheduledRoutesById: {
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: scheduledRoutesByIdInputSchema,
      outputSchema: z.array(schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      endpointDescription:
        "Returns scheduled routes for the specified schedule ID.",
    } satisfies EndpointDefinition<ScheduledRoutesByIdInput, SchedRoute[]>,
  },
} satisfies EndpointGroup;
