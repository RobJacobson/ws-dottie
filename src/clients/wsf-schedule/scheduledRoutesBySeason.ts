import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduledRoutesArraySchema,
  type ScheduledRoutesArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduledRoutesBySeasonParamsSchema
// GetScheduledRoutesBySeasonParams
// ============================================================================

export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduledRoutesArraySchema (imported from scheduledRoute.zod)
// ScheduledRoutesArray (imported from scheduledRoute.zod)
// ============================================================================

export type ScheduledRoutes = ScheduledRoutesArray;

// ============================================================================
// API Functions
//
// getScheduledRoutesBySeason (scheduled routes for specific season)
// ============================================================================

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

// ============================================================================
// TanStack Query Hooks
//
// useScheduledRoutesBySeason
// ============================================================================

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
