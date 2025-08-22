import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { dateSchema } from "./shared-schemas";

// ============================================================================
// API FUNCTION
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
// OUTPUT SCHEMA & TYPES (based on actual API response)
// ============================================================================

// API response schema for active seasons
export const activeSeasonResponseSchema = z.object({
  ScheduleID: z.number(),
  ScheduleName: z.string(),
  ScheduleSeason: z.number(),
  SchedulePDFUrl: z.string(),
  ScheduleStart: dateSchema,
  ScheduleEnd: dateSchema,
});

export const activeSeasonsArraySchema = z.array(activeSeasonResponseSchema);

export type ActiveSeasonResponse = z.infer<typeof activeSeasonResponseSchema>;

// ============================================================================
// QUERY HOOK
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
  useQuery({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
