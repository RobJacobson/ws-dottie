import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleResponsesArraySchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleTodayByRouteParamsSchema
// GetScheduleTodayByRouteParams
// ============================================================================

export const getScheduleTodayByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
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
// getScheduleTodayByRoute (today's schedule for specific route)
// ============================================================================

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

// ============================================================================
// TanStack Query Hooks
//
// useScheduleTodayByRoute
// ============================================================================

export const scheduleTodayByRouteOptions = createQueryOptions({
  apiFunction: getScheduleTodayByRoute,
  queryKey: ["wsf", "schedule", "scheduletoday", "getScheduleTodayByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
