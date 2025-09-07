import { z } from "zod";
import {
  type ScheduleResponse,
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

export const getScheduleByRoute = async (
  params: GetScheduleByRouteParams
): Promise<ScheduleResponse[]> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}",
    inputSchema: getScheduleByRouteParamsSchema,
    outputSchema: scheduleResponseArraySchema,
    params,
  });

export const scheduleByRouteOptions = createQueryOptions({
  apiFunction: getScheduleByRoute,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
