import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/validdaterange";

/**
 * API function for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * Please consider using cacheflushdate to coordinate the caching of this data in your application.
 *
 * @returns Promise resolving to ValidDateRange object containing valid date range information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const dateRange = await getValidDateRange();
 * console.log(dateRange.DateFrom); // Date object
 * ```
 */
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

export const validDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date for the valid date range. Indicates the earliest date for which schedule data is available."
    ),
    DateThru: zWsdotDate().describe(
      "End date for the valid date range. Indicates the latest date for which schedule data is available."
    ),
  })
  .describe(
    "Valid date range for schedule data availability. This schema indicates the period during which schedule information is current and reliable."
  );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useValidDateRange
// ============================================================================

/**
 * React Query hook for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * Please consider using cacheflushdate to coordinate the caching of this data in your application.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing valid date range
 *
 * @example
 * ```typescript
 * const { data: dateRange } = useValidDateRange();
 * console.log(dateRange?.DateFrom); // Date object
 * ```
 */
export const useValidDateRange = (options?: TanStackOptions<ValidDateRange>) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
