import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTodayByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

const ENDPOINT_TODAY_BY_ROUTE =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

export const getScheduleTodayByRoute = zodFetch<
  GetScheduleTodayByRouteParams,
  ScheduleResponse[]
>(
  ENDPOINT_TODAY_BY_ROUTE,
  getScheduleTodayByRouteParamsSchema,
  scheduleResponsesArraySchema
);

export const scheduleTodayByRouteOptions = createQueryOptions({
  apiFunction: getScheduleTodayByRoute,
  queryKey: ["wsf", "schedule", "scheduletoday", "getScheduleTodayByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
