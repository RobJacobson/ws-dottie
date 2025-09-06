import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
  type ScheduledRoute,
  type ScheduledRoutesArray,
} from "@/schemas/wsf-schedule";
import {
  contingencyAdjustmentSchema,
  type ContingencyAdjustment,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduledRoutesParamsSchema
// GetScheduledRoutesParams
// getScheduledRoutesBySeasonParamsSchema
// GetScheduledRoutesBySeasonParams
// ============================================================================

export const getScheduledRoutesParamsSchema = z.object({});

export type GetScheduledRoutesParams = z.infer<
  typeof getScheduledRoutesParamsSchema
>;

export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// contingencyAdjustmentSchema (imported from contingencyAdjustment.zod)
// scheduledRouteSchema (imported from scheduledRoute.zod)
// scheduledRoutesArraySchema (imported from scheduledRoute.zod)
// ScheduledRoute (imported from scheduledRoute.zod)
// ============================================================================

// Re-export schemas and types for convenience
export {
  contingencyAdjustmentSchema,
  scheduledRouteSchema,
  scheduledRoutesArraySchema,
};
export type { ContingencyAdjustment, ScheduledRoute };
export type ScheduledRoutes = ScheduledRoutesArray;

// ============================================================================
// API Functions
//
// getScheduledRoutes (all scheduled routes)
// getScheduledRoutesBySeason (scheduled routes for specific season)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/schedroutes";
const ENDPOINT_BY_SEASON =
  "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}";

export const getScheduledRoutes = zodFetch<
  GetScheduledRoutesParams, ScheduledRoutes
>(
  ENDPOINT_ALL,
  getScheduledRoutesParamsSchema,
  scheduledRoutesArraySchema
);

export const getScheduledRoutesBySeason = zodFetch<
  GetScheduledRoutesBySeasonParams, ScheduledRoutes
>(
  ENDPOINT_BY_SEASON,
  getScheduledRoutesBySeasonParamsSchema,
  scheduledRoutesArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useScheduledRoutes
// useScheduledRoutesBySeason
// ============================================================================

export const scheduledRoutesOptions = createQueryOptions({
  apiFunction: getScheduledRoutes,
  queryKey: ["wsf", "schedule", "scheduledRoutes", "getScheduledRoutes"],
  cacheStrategy: "DAILY_STATIC",
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
