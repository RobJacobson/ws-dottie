import { z } from "zod";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";
import { tanstackQueryOptions } from "@/shared/caching/config";

// ============================================================================
// API FUNCTION
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
// INPUT SCHEMA & TYPES
// ============================================================================

export const getFaresValidDateRangeParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting valid date range. The API returns the date range for which fares data is currently published and available."
  );

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const faresValidDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date of the valid date range for which fares data is currently published and available. This field indicates the earliest date for which fare information can be retrieved."
    ),
    DateThru: zWsdotDate().describe(
      "End date of the valid date range for which fares data is currently published and available. This field indicates the latest date for which fare information can be retrieved."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Date range information indicating when fares data is available. This schema provides the valid date boundaries for fare queries, ensuring that applications only request data for supported dates."
  );

export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting valid date range from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options
 * @returns React Query result containing valid date range information
 *
 * @example
 * ```typescript
 * const { data: dateRange } = useFaresValidDateRange({});
 * console.log(dateRange?.DateFrom); // "2024-01-01T00:00:00Z"
 * ```
 */
export const useFaresValidDateRange = (
  params: GetFaresValidDateRangeParams = {},
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresValidDateRange>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FaresValidDateRange, Error> => {
  return useQuery({
    queryKey: ["wsf", "fares", "validDateRange", params],
    queryFn: () => getFaresValidDateRange(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
