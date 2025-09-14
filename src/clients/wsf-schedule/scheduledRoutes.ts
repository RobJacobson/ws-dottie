import { z } from "zod";
import {
  type ScheduledRoute,
  scheduledRoutesSchema,
} from "@/schemas/wsf-schedule/scheduledRoute.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getScheduledRoutes */
const scheduledRoutesInput = z.object({});

/** Endpoint metadata for getScheduledRoutes */
export const getScheduledRoutesMeta: EndpointMeta<
  ScheduledRoutesInput,
  ScheduledRoute[]
> = {
  id: "wsf-schedule/scheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: scheduledRoutesInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInput>;
