import { z } from "zod";
import {
  type TimeAdjustments,
  timeAdjustmentsSchema,
} from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTimeAdjustmentsByRoute */
const timeAdjustmentsByRouteInput = z.object({
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteMeta: EndpointMeta<
  TimeAdjustmentsByRouteInput,
  TimeAdjustments
> = {
  id: "wsf-schedule/timeAdjustmentsByRoute",
  endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{routeId}",
  inputSchema: timeAdjustmentsByRouteInput,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: { routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TimeAdjustmentsByRouteInput = z.infer<
  typeof timeAdjustmentsByRouteInput
>;
