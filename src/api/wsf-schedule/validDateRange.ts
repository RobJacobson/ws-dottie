import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const validDateRangeOptions = (params: GetValidDateRangeParams = {}) =>
  queryOptions({
    queryKey: ["wsf", "schedule", "validDateRange", "getValidDateRange"],
    queryFn: () => getValidDateRange(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
