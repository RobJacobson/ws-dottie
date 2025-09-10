import { z } from "zod";
import { scheduledRoutesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduledRoutes */
export const getScheduledRoutesParamsSchema = z.object({});

/** GetScheduledRoutes params type */
export type GetScheduledRoutesParams = z.infer<
  typeof getScheduledRoutesParamsSchema
>;

/** Endpoint definition for getScheduledRoutes */
export const getScheduledRoutesDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/scheduledroutes",
  inputSchema: getScheduledRoutesParamsSchema,
  outputSchema: scheduledRoutesArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
