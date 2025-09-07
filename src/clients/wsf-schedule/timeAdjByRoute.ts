import { z } from "zod";
import {
  type TimeAdjustmentByRoute,
  timeAdjustmentByRouteSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

export const getTimeAdjustmentsByRoute = async (
  params: GetTimeAdjustmentsByRouteParams
): Promise<TimeAdjustmentByRoute> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/timeadjbyroute/{routeId}",
    inputSchema: getTimeAdjustmentsByRouteParamsSchema,
    outputSchema: timeAdjustmentByRouteSchema,
    params,
  });

export const timeAdjustmentsByRouteOptions = createQueryOptions({
  apiFunction: getTimeAdjustmentsByRoute,
  queryKey: ["wsf", "schedule", "timeadjbyroute", "getTimeAdjustmentsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
