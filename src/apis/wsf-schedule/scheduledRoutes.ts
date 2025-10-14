import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Scheduled routes represent the predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.";

export const scheduledRoutesResource = {
  name: "scheduled-routes",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getScheduledRoutes",
      endpoint: "/schedroutes",
      inputSchema: i.scheduledRoutesSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns all scheduled routes. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.ScheduledRoutesInput, o.Route[]>,
    byScheduleId: {
      function: "getScheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: i.scheduledRoutesByScheduleIdSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      cacheStrategy: "STATIC",
      description: `Returns scheduled routes for the specified schedule ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.ScheduledRoutesByScheduleIdInput,
      o.Route[]
    >,
  },
};
