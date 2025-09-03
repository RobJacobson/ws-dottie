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

export const faresValidDateRangeOptions = (
  params: GetFaresValidDateRangeParams = {}
) =>
  queryOptions({
    queryKey: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
    queryFn: () => getFaresValidDateRange(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
