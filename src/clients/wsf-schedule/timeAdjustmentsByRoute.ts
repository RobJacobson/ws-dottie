import { z } from "zod";

import {
  type TimeAdjustments,
  timeAdjustmentsSchema,
} from "@/schemas/wsf-schedule/timeAdjustment.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTimeAdjustmentsByRoute */
const timeAdjustmentsByRouteInput = z.object({
  RouteID: z.number().int().positive(),
});

/** Endpoint metadata for getTimeAdjustmentsByRoute */
export const getTimeAdjustmentsByRouteMeta: EndpointDefinition<
  TimeAdjustmentsByRouteInput,
  TimeAdjustments
> = {
  api: "wsf-schedule",
  function: "timeAdjustmentsByRoute",
  endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{RouteID}",
  inputSchema: timeAdjustmentsByRouteInput,
  outputSchema: timeAdjustmentsSchema,
  sampleParams: { RouteID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TimeAdjustmentsByRouteInput = z.infer<
  typeof timeAdjustmentsByRouteInput
>;
