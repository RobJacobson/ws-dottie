import { z } from "zod";
import {
  type ScheduledRoutesArray,
  scheduledRoutesArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

export type ScheduledRoutes = ScheduledRoutesArray;

const ENDPOINT_BY_SEASON =
  "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}";

export const getScheduledRoutesBySeason = zodFetch<
  GetScheduledRoutesBySeasonParams,
  ScheduledRoutes
>(
  ENDPOINT_BY_SEASON,
  getScheduledRoutesBySeasonParamsSchema,
  scheduledRoutesArraySchema
);

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
