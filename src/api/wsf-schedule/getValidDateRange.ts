import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { dateSchema } from "./shared-schemas";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/validdaterange";

/**
 * API function for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
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
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const validDateRangeSchema = z
  .object({
    DateFrom: dateSchema.describe(
      "Start date for the valid date range. Indicates the earliest date for which schedule data is available."
    ),
    DateThru: dateSchema.describe(
      "End date for the valid date range. Indicates the latest date for which schedule data is available."
    ),
  })
  .describe(
    "Valid date range for schedule data availability. This schema indicates the period during which schedule information is current and reliable."
  );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
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
  useQuery({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
