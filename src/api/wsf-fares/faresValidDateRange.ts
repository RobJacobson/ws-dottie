import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getFaresValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getFaresValidDateRange = async (
  params: GetFaresValidDateRangeParams = {}
): Promise<FaresValidDateRange> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFaresValidDateRangeParamsSchema,
      output: faresValidDateRangeSchema,
    },
    params
  );
};

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
// faresValidDateRangeSchema
// FaresValidDateRange
// ============================================================================

export const faresValidDateRangeSchema = z.object({
  DateFrom: zWsdotDate(),
  DateThru: zWsdotDate(),
});

export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFaresValidDateRange
// ============================================================================

export const useFaresValidDateRange = createUseQueryWsf({
  queryFn: getFaresValidDateRange,
  queryKeyPrefix: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});
