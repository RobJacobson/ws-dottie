import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// API Function
//
// getFaresCacheFlushDate
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/cacheflushdate";

/**
 * Get cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to cache flush date
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const flushDate = await getFaresCacheFlushDate({});
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getFaresCacheFlushDate = async (
  params: GetFaresCacheFlushDateParams = {}
): Promise<Date> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFaresCacheFlushDateParamsSchema,
      output: faresCacheFlushDateSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFaresCacheFlushDateParamsSchema
// GetFaresCacheFlushDateParams
// ============================================================================

export const getFaresCacheFlushDateParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting cache flush date. The API returns the date when fares data was last updated, which can be used to determine if cached data should be refreshed."
  );

export type GetFaresCacheFlushDateParams = z.infer<
  typeof getFaresCacheFlushDateParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// faresCacheFlushDateSchema
// ============================================================================

export const faresCacheFlushDateSchema = zWsdotDate().describe(
  "Timestamp indicating when the fares data was last updated in the WSF system. This field can be used to determine if cached fare data should be refreshed. When this date changes, applications should drop their cache and retrieve fresh data."
);

// ============================================================================
// TanStack Query Hook
//
// useFaresCacheFlushDate
// ============================================================================

/**
 * Hook for getting cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options
 * @returns React Query result containing cache flush date
 *
 * @example
 * ```typescript
 * const { data: flushDate } = useFaresCacheFlushDate({});
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const useFaresCacheFlushDate = (
  params: GetFaresCacheFlushDateParams = {},
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresCacheFlushDate>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<Date, Error> => {
  return useQuery({
    queryKey: ["wsf", "fares", "cacheFlushDate", params],
    queryFn: () => getFaresCacheFlushDate(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
