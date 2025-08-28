import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/validdaterange";

export const getValidDateRange = async (): Promise<ValidDateRange> => {
  return zodFetch(ENDPOINT, {
    output: validDateRangeSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// No input parameters required for this endpoint
// ============================================================================

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

export const useValidDateRange = (options?: TanStackOptions<ValidDateRange>) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
