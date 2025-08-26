import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getActiveSeasons
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/activeseasons";

/**
 * API function for fetching active seasons from WSF Schedule API
 *
 * Retrieves active schedule seasons. This endpoint helps determine which
 * schedule periods are currently available and active.
 *
 * @returns Promise resolving to an array of ActualActiveSeasonResponse objects containing season information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const seasons = await getActiveSeasons();
 * console.log(seasons[0].ScheduleName); // "Summer 2024"
 * ```
 */
export const getActiveSeasons = async (): Promise<ActiveSeasonResponse[]> => {
  return zodFetch(ENDPOINT, {
    output: activeSeasonsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// No input parameters required for this endpoint
// ============================================================================

// ============================================================================
// Output Schema & Types (based on actual API response)
//
// activeSeasonResponseSchema
// activeSeasonsArraySchema
// ActiveSeasonResponse
// ============================================================================

// API response schema for active seasons
export const activeSeasonResponseSchema = z.object({
  ScheduleID: z.number().describe(""),
  ScheduleName: z.string().describe(""),
  ScheduleSeason: z.number().describe(""),
  SchedulePDFUrl: z.string().describe(""),
  ScheduleStart: zWsdotDate().describe(""),
  ScheduleEnd: zWsdotDate().describe(""),
});

export const activeSeasonsArraySchema = z.array(activeSeasonResponseSchema);

export type ActiveSeasonResponse = z.infer<typeof activeSeasonResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useActiveSeasons
// ============================================================================

/**
 * React Query hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves active schedule seasons. This endpoint helps determine which
 * schedule periods are currently available and active.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing season information
 *
 * @example
 * ```typescript
 * const { data: seasons } = useActiveSeasons();
 * console.log(seasons?.[0]?.ScheduleName); // "Summer 2024"
 * ```
 */
export const useActiveSeasons = (
  options?: TanStackOptions<ActiveSeasonResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
