// Schedule cache flush date hooks

import { useQuery } from "@tanstack/react-query";

import { createCacheFlushOptions } from "@/shared/caching/config";
import type { ScheduleCacheFlushDate } from "../types";
import { getCacheFlushDateSchedule } from "./api";

/**
 * Hook for fetching cache flush date from WSF Schedule API with React Query
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This hook is used
 * to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns React Query result with ScheduleCacheFlushDate data
 */
export const useCacheFlushDateSchedule = () => {
  return useQuery({
    queryKey: ["schedule", "cacheFlushDate"],
    queryFn: getCacheFlushDateSchedule,
    ...createCacheFlushOptions(),
  });
};
