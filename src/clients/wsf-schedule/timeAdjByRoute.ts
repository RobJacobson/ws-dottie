import { z } from "zod";
import {
  type TimeAdjustmentByRoute,
  timeAdjustmentByRouteSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

const ENDPOINT = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

export const getTimeAdjustmentsByRoute = zodFetch<
  GetTimeAdjustmentsByRouteParams,
  TimeAdjustmentByRoute
>(ENDPOINT, getTimeAdjustmentsByRouteParamsSchema, timeAdjustmentByRouteSchema);

export const timeAdjustmentsByRouteOptions = createQueryOptions({
  apiFunction: getTimeAdjustmentsByRoute,
  queryKey: ["wsf", "schedule", "timeadjbyroute", "getTimeAdjustmentsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
