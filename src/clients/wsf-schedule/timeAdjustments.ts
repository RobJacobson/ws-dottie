import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  timeAdjustmentResponseSchema,
  timeAdjustmentResponsesArraySchema,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsParamsSchema
// GetTimeAdjustmentsParams
// getTimeAdjustmentsByRouteParamsSchema
// GetTimeAdjustmentsByRouteParams
// ============================================================================

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentResponseSchema (imported from timeAdjustmentResponse.zod)
// timeAdjustmentsArraySchema (imported from timeAdjustmentResponse.zod)
// TimeAdjustmentResponse (imported from timeAdjustmentResponse.zod)
// timeAdjustmentSchema (legacy schema for backward compatibility)
// timeAdjustmentsByRouteArraySchema (legacy schema for backward compatibility)
// TimeAdjustment (legacy type for backward compatibility)
// ============================================================================

// Re-export schemas and types for convenience
export {
  timeAdjustmentResponseSchema,
  timeAdjustmentResponsesArraySchema,
  type TimeAdjustmentResponse,
} from "@/schemas/wsf-schedule";
export const timeAdjustmentsArraySchema = timeAdjustmentResponsesArraySchema;

// Legacy schemas for backward compatibility
export const timeAdjustmentSchema = z.object({
  AdjustmentID: z.number(),
  SchedRouteID: z.number(),
  AdjustmentMinutes: z.number(),
  StartDate: z.date(), // Using z.date() instead of zWsdotDate() for compatibility
  EndDate: z.date(), // Using z.date() instead of zWsdotDate() for compatibility
  Reason: z.string(),
});

export const timeAdjustmentsByRouteArraySchema = z.array(timeAdjustmentSchema);

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;
export type TimeAdjustments = z.infer<typeof timeAdjustmentsArraySchema>;
export type TimeAdjustmentsByRoute = z.infer<
  typeof timeAdjustmentsByRouteArraySchema
>;

// ============================================================================
// API Functions
//
// getTimeAdjustments (all time adjustments)
// getTimeAdjustmentsByRoute (time adjustments for specific route)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/timeadj";
const ENDPOINT_BY_ROUTE = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

export const getTimeAdjustments = zodFetch<
  GetTimeAdjustmentsParams,
  TimeAdjustments
>(ENDPOINT_ALL, getTimeAdjustmentsParamsSchema, timeAdjustmentsArraySchema);

export const getTimeAdjustmentsByRoute = zodFetch<
  GetTimeAdjustmentsByRouteParams,
  TimeAdjustmentsByRoute
>(
  ENDPOINT_BY_ROUTE,
  getTimeAdjustmentsByRouteParamsSchema,
  timeAdjustmentsByRouteArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustments
// useTimeAdjustmentsByRoute
// ============================================================================

export const timeAdjustmentsOptions = createQueryOptions({
  apiFunction: getTimeAdjustments,
  queryKey: ["wsf", "schedule", "timeAdjustments", "getTimeAdjustments"],
  cacheStrategy: "DAILY_STATIC",
});

export const timeAdjustmentsByRouteOptions = createQueryOptions({
  apiFunction: getTimeAdjustmentsByRoute,
  queryKey: ["wsf", "schedule", "timeAdjustments", "getTimeAdjustmentsByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
