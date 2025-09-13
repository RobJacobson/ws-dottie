import { z } from "zod";
import {
  type ScheduledRoute,
  scheduledRoutesSchema,
} from "@/schemas/wsf-schedule/scheduledRoute.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getScheduledRoutes */
const scheduledRoutesInput = z.object({});

/** Endpoint metadata for getScheduledRoutes */
export const getScheduledRoutesMeta: Endpoint<
  ScheduledRoutesInput,
  ScheduledRoute[]
> = {
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: scheduledRoutesInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInput>;
