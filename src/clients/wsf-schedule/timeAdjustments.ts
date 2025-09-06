import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { timeAdjustmentResponsesArraySchema } from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsParamsSchema
// GetTimeAdjustmentsParams
// ============================================================================

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentResponseSchema (imported from timeAdjustmentResponse.zod)
// timeAdjustmentResponsesArraySchema (imported from timeAdjustmentResponse.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTimeAdjustments (all time adjustments)
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/timeadj";

export const getTimeAdjustments = zodFetch<
  GetTimeAdjustmentsParams,
  z.infer<typeof timeAdjustmentResponsesArraySchema>
>(ENDPOINT, getTimeAdjustmentsParamsSchema, timeAdjustmentResponsesArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustments
// ============================================================================

export const timeAdjustmentsOptions = createQueryOptions({
  apiFunction: getTimeAdjustments,
  queryKey: ["wsf", "schedule", "timeadj", "getTimeAdjustments"],
  cacheStrategy: "DAILY_STATIC",
});
