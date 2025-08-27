/**
 * WSF Schedule Valid Date Range API
 *
 * Provides valid date range information for the Washington State Ferries schedule system.
 * This endpoint returns the date range for which schedule data is currently published
 * and available, helping applications determine valid trip dates.
 *
 * API Functions:
 * - getValidDateRange: Returns the valid date range for schedule data
 * - useValidDateRange: TanStack Query hook for valid date range with automatic updates
 *
 * Input/Output Overview:
 * - getValidDateRange: Input: none, Output: ValidDateRange
 * - useValidDateRange: Input: none, Output: UseQueryResult<ValidDateRange, Error>
 *
 * Base Type: ValidDateRange
 *
 * interface ValidDateRange {
 *   DateFrom: Date;
 *   DateThru: Date;
 * }
 *
 * Note: The API returns .NET timestamp strings that are automatically converted to
 * JavaScript Date objects by the zodFetch utility. DateFrom represents the earliest
 * valid trip date, while DateThru represents the latest valid trip date for which
 * schedule data is available.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/validdaterange?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "DateFrom": "/Date(1756263900277-0700)/",
 *   "DateThru": "/Date(1756859700277-0700)/"
 * }
 *
 * Note: The API returns .NET timestamp strings that get converted to JavaScript Date
 * objects. DateFrom represents the earliest valid trip date, while DateThru represents
 * the latest valid trip date for schedule data.
 * ```
 */

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

/**
 * Retrieves a date range for which schedule data is currently published and available.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<ValidDateRange> - Object containing valid date range for schedule data
 *
 * @example
 * const dateRange = await getValidDateRange();
 * console.log(dateRange.DateFrom);  // 2024-01-15T00:00:00.000Z
 * console.log(dateRange.DateThru);  // 2024-01-22T00:00:00.000Z
 *
 * @throws {Error} When API is unavailable
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

/**
 * Valid date range schema - includes start and end dates for available schedule data
 */
export const validDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
  })
  .describe("");

/**
 * ValidDateRange type - represents the valid date range for schedule data
 */
export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useValidDateRange
// ============================================================================

/**
 * TanStack Query hook for valid date range with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ValidDateRange, Error> - Query result with valid date range data
 *
 * @example
 * const { data: dateRange, isLoading } = useValidDateRange();
 * if (dateRange) {
 *   console.log(dateRange.DateFrom);  // 2024-01-15T00:00:00.000Z
 *   console.log(dateRange.DateThru);  // 2024-01-22T00:00:00.000Z
 * }
 */
export const useValidDateRange = (options?: TanStackOptions<ValidDateRange>) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
