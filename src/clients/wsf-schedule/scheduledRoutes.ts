import { z } from "zod";

import {
  type ScheduledRoute,
  scheduledRoutesSchema,
} from "@/schemas/wsf-schedule/scheduledRoute.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduledRoutes */
const scheduledRoutesInput = z.object({}).strict();

/** Endpoint metadata for getScheduledRoutes */
export const getScheduledRoutesMeta: EndpointDefinition<
  ScheduledRoutesInput,
  ScheduledRoute[]
> = {
  api: "wsf-schedule",
  function: "scheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: scheduledRoutesInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInput>;
