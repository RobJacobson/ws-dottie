import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  timeAdjustmentByRouteSchema,
  type TimeAdjustmentByRoute,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsByRouteParamsSchema
// GetTimeAdjustmentsByRouteParams
// ============================================================================

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentByRouteSchema (imported from timeAdjustmentByRoute.zod)
// TimeAdjustmentByRoute (imported from timeAdjustmentByRoute.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTimeAdjustmentsByRoute (time adjustments for specific route)
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

export const getTimeAdjustmentsByRoute = zodFetch<
  GetTimeAdjustmentsByRouteParams,
  TimeAdjustmentByRoute
>(ENDPOINT, getTimeAdjustmentsByRouteParamsSchema, timeAdjustmentByRouteSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustmentsByRoute
// ============================================================================

export const timeAdjustmentsByRouteOptions = createQueryOptions({
  apiFunction: getTimeAdjustmentsByRoute,
  queryKey: ["wsf", "schedule", "timeadjbyroute", "getTimeAdjustmentsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
