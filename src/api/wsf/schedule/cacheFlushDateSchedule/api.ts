// Schedule cache flush date API functions

import { fetchWsf } from "@/shared/fetching/fetch";
import type { ScheduleCacheFlushDate } from "../types";

/**
 * API function for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This endpoint
 * is used to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns Promise resolving to ScheduleCacheFlushDate object or null if fetch fails
 */
export const getCacheFlushDateSchedule =
  (): Promise<ScheduleCacheFlushDate | null> =>
    fetchWsf<ScheduleCacheFlushDate>("schedule", "/cacheflushdate");
