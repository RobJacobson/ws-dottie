import { z } from "zod";
import {
  type ScheduledRoutesArray,
  scheduledRoutesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

export const getScheduledRoutesBySeason = async (
  params: GetScheduledRoutesBySeasonParams
): Promise<ScheduledRoutesArray> =>
  zodFetch({
    endpoint: "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}",
    inputSchema: getScheduledRoutesBySeasonParamsSchema,
    outputSchema: scheduledRoutesArraySchema,
    params,
  });

export const scheduledRoutesBySeasonOptions = createQueryOptions({
  apiFunction: getScheduledRoutesBySeason,
  queryKey: [
    "wsf",
    "schedule",
    "scheduledRoutes",
    "getScheduledRoutesBySeason",
  ],
  cacheStrategy: "DAILY_STATIC",
});
