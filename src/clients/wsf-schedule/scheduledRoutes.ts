import { z } from "zod";
import { scheduledRoutesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduledRoutes */
const getScheduledRoutesParamsSchema = z.object({});

/** GetScheduledRoutes params type */
export type GetScheduledRoutesParams = z.infer<
  typeof getScheduledRoutesParamsSchema
>;

/** Endpoint definition for getScheduledRoutes */
export const getScheduledRoutesDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduledRoutes",
  endpoint: "/ferries/api/schedule/rest/schedroutes",
  inputSchema: getScheduledRoutesParamsSchema,
  outputSchema: scheduledRoutesArraySchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});
