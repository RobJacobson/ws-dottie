import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

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

export const useValidDateRange = (
  params: GetValidDateRangeParams = {},
  options?: UseQueryOptions
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(params),
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
