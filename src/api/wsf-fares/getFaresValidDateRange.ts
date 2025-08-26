import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";

// ============================================================================
// API Function
//
// getFaresValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

/**
 * Get valid date range for fares data from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to valid date range information
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const dateRange = await getFaresValidDateRange({});
 * console.log(dateRange.DateFrom); // "2024-01-01T00:00:00Z"
 * ```
 */
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

export const getFaresValidDateRangeParamsSchema = z.object({}).describe("");

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// faresValidDateRangeSchema
// FaresValidDateRange
// ============================================================================

export const faresValidDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFaresValidDateRange
// ============================================================================

/**
 * Hook for getting valid date range from WSF Fares API
 *
 * Retrieves the valid date range for fares data. This endpoint provides
 * information about when fare data is available and valid.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options
 * @returns React Query result containing valid date range
 */
export const useFaresValidDateRange = (
  params: GetFaresValidDateRangeParams = {},
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresValidDateRange>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FaresValidDateRange, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "validDateRange"],
    queryFn: () => getFaresValidDateRange(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
