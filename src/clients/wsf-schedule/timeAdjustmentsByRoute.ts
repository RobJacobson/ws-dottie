import { z } from "zod";
import { timeAdjustmentsByRouteSchema } from "@/schemas/wsf-schedule";
import type { TimeAdjustment } from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTimeAdjustmentsByRoute */
const timeAdjustmentsByRouteInput = z.object({
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteMeta: Endpoint<
  TimeAdjustmentsByRouteInput,
  TimeAdjustment[]
> = {
  api: "wsf-schedule",
  function: "getTimeAdjustmentsByRoute",
  endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{routeId}",
  inputSchema: timeAdjustmentsByRouteInput,
  outputSchema: timeAdjustmentsByRouteSchema,
  sampleParams: { routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TimeAdjustmentsByRouteInput = z.infer<
  typeof timeAdjustmentsByRouteInput
>;
