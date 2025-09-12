import { z } from "zod";
import { timeAdjustmentsByRouteSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTimeAdjustmentsByRoute */
const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

/** GetTimeAdjustmentsByRoute params type */

/** Endpoint definition for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getTimeAdjustmentsByRoute",
  endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{routeId}",
  inputSchema: getTimeAdjustmentsByRouteParamsSchema,
  outputSchema: timeAdjustmentsByRouteSchema,
  sampleParams: { routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
