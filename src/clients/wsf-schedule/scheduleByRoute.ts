import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// ============================================================================

export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleResponsesArraySchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getScheduleByRoute (schedule for specific route)
// ============================================================================

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

// ============================================================================
// TanStack Query Hooks
//
// useScheduleByRoute
// ============================================================================

export const scheduleByRouteOptions = createQueryOptions({
  apiFunction: getScheduleByRoute,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
