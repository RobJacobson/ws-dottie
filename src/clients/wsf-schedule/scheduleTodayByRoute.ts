import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleTodayByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

export const getScheduleTodayByRoute = async (
  params: GetScheduleTodayByRouteParams
): Promise<ScheduleResponse[]> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}",
    inputSchema: getScheduleTodayByRouteParamsSchema,
    outputSchema: scheduleResponsesArraySchema,
    params,
  });

export const scheduleTodayByRouteOptions = createQueryOptions({
  apiFunction: getScheduleTodayByRoute,
  queryKey: ["wsf", "schedule", "scheduletoday", "getScheduleTodayByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
