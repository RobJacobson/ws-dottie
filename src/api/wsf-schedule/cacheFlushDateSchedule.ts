import type { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getCacheFlushDateSchedule
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/cacheflushdate";

/**
 * API function for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the cache flush date for the schedule API. This endpoint helps
 * determine when cached data should be refreshed. When the date returned
 * from this operation is modified, drop your application cache and retrieve
 * fresh data from the service.
 *
 * @returns Promise resolving to Date object containing cache flush information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const flushDate = await getCacheFlushDateSchedule();
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getCacheFlushDateSchedule = async (): Promise<Date> => {
  return zodFetch(ENDPOINT, {
    output: scheduleCacheFlushDateSchema,
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
// scheduleCacheFlushDateSchema
// ScheduleCacheFlushDate
// ============================================================================

export const scheduleCacheFlushDateSchema = zWsdotDate().describe("");

export type ScheduleCacheFlushDate = z.infer<
  typeof scheduleCacheFlushDateSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useCacheFlushDateSchedule
// ============================================================================

/**
 * React Query hook for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the cache flush date for the schedule API. This endpoint helps
 * determine when cached data should be refreshed. When the date returned
 * from this operation is modified, drop your application cache and retrieve
 * fresh data from the service.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing cache flush date information
 *
 * @example
 * ```typescript
 * const { data: flushDate } = useCacheFlushDateSchedule();
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const useCacheFlushDateSchedule = (options?: TanStackOptions<Date>) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateSchedule(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: async () => new Date(),
  });
