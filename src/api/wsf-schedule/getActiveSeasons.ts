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
  ScheduleID: z
    .number()
    .describe(
      "Unique identifier for the schedule season. Primary key for season identification across WSF systems."
    ),
  ScheduleName: z
    .string()
    .describe(
      "Human-readable name for the schedule season (e.g., 'Summer 2025', 'Fall 2025')."
    ),
  ScheduleSeason: z
    .number()
    .describe(
      "Season number identifier. Used to categorize and order schedule periods within the WSF system."
    ),
  SchedulePDFUrl: z
    .string()
    .describe(
      "URL to PDF version of the complete schedule for this season. Provides downloadable schedule information."
    ),
  ScheduleStart: zWsdotDate().describe(
    "Start date of the schedule season. Indicates when this schedule period becomes effective."
  ),
  ScheduleEnd: zWsdotDate().describe(
    "End date of the schedule season. Indicates when this schedule period expires."
  ),
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
