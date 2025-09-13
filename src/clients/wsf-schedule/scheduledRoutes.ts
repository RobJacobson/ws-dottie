import { z } from "zod";
import { scheduledRoutesSchema } from "@/schemas/wsf-schedule";
import type { ScheduledRoute } from "@/schemas/wsf-schedule/scheduledRoute.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getScheduledRoutes */
const scheduledRoutesInput = z.object({});

/** Endpoint metadata for getScheduledRoutes */
export const getScheduledRoutesMeta: Endpoint<
  ScheduledRoutesInput,
  ScheduledRoute[]
> = {
  api: "wsf-schedule",
  function: "getScheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: scheduledRoutesInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInput>;
