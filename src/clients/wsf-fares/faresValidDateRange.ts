import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  validDateRangeSchema as faresValidDateRangeSchema,
  type ValidDateRange as FaresValidDateRange,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schema & Types
//
// getFaresValidDateRangeParamsSchema
// GetFaresValidDateRangeParams
// ============================================================================

export const getFaresValidDateRangeParamsSchema = z.object({});

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// faresValidDateRangeSchema (imported from validDateRange.zod)
// FaresValidDateRange (imported from validDateRange.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { faresValidDateRangeSchema };
export type { FaresValidDateRange };

// ============================================================================
// API Function
//
// getFaresValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getFaresValidDateRange = zodFetch<
  GetFaresValidDateRangeParams, FaresValidDateRange
>(
  ENDPOINT,
  getFaresValidDateRangeParamsSchema,
  faresValidDateRangeSchema
);

// ============================================================================
// TanStack Query Hook
//
// useFaresValidDateRange
// ============================================================================

export const faresValidDateRangeOptions = createQueryOptions({
  apiFunction: getFaresValidDateRange,
  queryKey: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
