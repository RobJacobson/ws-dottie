import { z } from "zod";
import { scheduledRoutesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduledRoutes */
const scheduledRoutesInput = z.object({});

/** Endpoint metadata for getScheduledRoutes */
export const getScheduledRoutesMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: scheduledRoutesInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInput>;
