import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  validDateRangeSchema,
  type ValidDateRange,
} from "@/schemas/wsf-schedule";

// ============================================================================
// API Function
//
// getValidDateRange
// ============================================================================

// ============================================================================
// Input Schema & Types
//
// getValidDateRangeParamsSchema
// GetValidDateRangeParams
// ============================================================================

export const getValidDateRangeParamsSchema = z.object({});

export type GetValidDateRangeParams = z.infer<
  typeof getValidDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// validDateRangeSchema (imported from validDateRange.zod)
// ValidDateRange (imported from validDateRange.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { validDateRangeSchema };
export type { ValidDateRange };

// ============================================================================
// TanStack Query Hook
//
// useValidDateRange
// ============================================================================

export const getValidDateRange = zodFetch<
  GetValidDateRangeParams,
  ValidDateRange
>(
  "/ferries/api/schedule/rest/validdaterange",
  getValidDateRangeParamsSchema,
  validDateRangeSchema
);

export const validDateRangeOptions = createQueryOptions({
  apiFunction: getValidDateRange,
  queryKey: ["wsf", "schedule", "validDateRange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
