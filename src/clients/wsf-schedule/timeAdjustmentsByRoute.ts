import { z } from "zod";
import { timeAdjustmentsByRouteSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

/** GetTimeAdjustmentsByRoute params type */
export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

/** Endpoint definition for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getTimeAdjustmentsByRoute",
  endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{routeId}",
  inputSchema: getTimeAdjustmentsByRouteParamsSchema,
  outputSchema: timeAdjustmentsByRouteSchema,
  sampleParams: { routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
