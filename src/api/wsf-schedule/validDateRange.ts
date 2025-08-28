import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/validdaterange";

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
// validDateRangeSchema
// ValidDateRange
// ============================================================================

export const validDateRangeSchema = z.object({
  DateFrom: zWsdotDate(),
  DateThru: zWsdotDate(),
});

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useValidDateRange
// ============================================================================

export const getValidDateRange = async (
  params: GetValidDateRangeParams = {}
): Promise<ValidDateRange> => {
  return zodFetch(
    ENDPOINT,
    {
      output: validDateRangeSchema,
    },
    params
  );
};

export const useValidDateRange = createUseQueryWsf({
  queryFn: getValidDateRange,
  queryKeyPrefix: ["wsf", "schedule", "validDateRange", "getValidDateRange"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateSchedule,
});
