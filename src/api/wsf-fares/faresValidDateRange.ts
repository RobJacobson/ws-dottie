/**
 * WSF Fares API - Valid Date Range
 *
 * Provides access to the valid date range for Washington State Ferries fare data.
 * This endpoint returns the date range for which fares data is currently published
 * and available, allowing applications to determine valid trip dates for fare queries.
 *
 * The valid date range typically spans from today's date through the end of the most
 * recently posted sailing season or tariff schedule. This information is essential
 * for validating user input and ensuring that fare requests are made for dates
 * where pricing data is available.
 *
 * API Functions:
 * - getFaresValidDateRange: Returns the valid date range for fare data
 *
 * Input/Output Overview:
 * - getFaresValidDateRange: Input: {} (no parameters required), Output: FaresValidDateRange
 *
 * Base Type: FaresValidDateRange
 *
 * interface FaresValidDateRange {
 *   DateFrom: Date;
 *   DateThru: Date;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/validdaterange?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "DateFrom": "/Date(1756191600000-0700)/",
 *   "DateThru": "/Date(1766822400000-0800)/"
 * }
 * ```
 *
 * Note: The API returns .NET timestamp format that is automatically converted to
 * JavaScript Date objects. The date range indicates when fare data is valid and
 * should be used to validate trip date inputs before making fare queries.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getFaresValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

/**
 * Retrieves the valid date range for WSF fare data.
 *
 * This endpoint returns the date range for which fares data is currently published
 * and available. Applications should use this information to validate trip date
 * inputs and ensure that fare queries are made for dates where pricing data exists.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<FaresValidDateRange> - Object containing start and end dates for valid fare data
 *
 * @example
 * const dateRange = await getFaresValidDateRange();
 * console.log(dateRange.DateFrom); // Date object for start of valid range
 * console.log(dateRange.DateThru); // Date object for end of valid range
 *
 * @throws {Error} When API is unavailable or returns invalid response
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

/**
 * Parameters for retrieving valid date range (no parameters required)
 */
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

/**
 * Valid date range schema - represents the date range for which fare data is available
 */
export const faresValidDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
  })
  
  .describe("");

/**
 * FaresValidDateRange type - represents the valid date range for fare data
 */
export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFaresValidDateRange
// ============================================================================

/**
 * TanStack Query hook for valid date range with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<FaresValidDateRange, Error> - Query result with valid date range
 *
 * @example
 * const { data: dateRange, isLoading } = useFaresValidDateRange();
 * if (dateRange) {
 *   console.log(dateRange.DateFrom); // Start of valid range
 *   console.log(dateRange.DateThru); // End of valid range
 * }
 */
export const useFaresValidDateRange = (
  params: GetFaresValidDateRangeParams = {},
  options?: Omit<
    UseQueryOptions<FaresValidDateRange, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "validDateRange"],
    queryFn: () => getFaresValidDateRange(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
