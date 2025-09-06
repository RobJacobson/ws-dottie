import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}";

export const getScheduleByRoute = zodFetch<
  GetScheduleByRouteParams,
  ScheduleResponse[]
>(
  ENDPOINT_BY_ROUTE,
  getScheduleByRouteParamsSchema,
  scheduleResponseArraySchema
);

export const scheduleByRouteOptions = createQueryOptions({
  apiFunction: getScheduleByRoute,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
