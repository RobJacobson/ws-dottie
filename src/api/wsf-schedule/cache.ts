// Schedule Cache Provider Component
// Monitors schedule cache flush dates and automatically invalidates schedule queries when data changes

import { CacheProvider } from "@/shared/caching/CacheProvider";

import { useCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

/**
 * Schedule Cache Provider Component
 *
 * This component monitors schedule cache flush dates and automatically
 * invalidates schedule queries when the cache flush date changes, indicating
 * that the underlying schedule data has been updated on the server.
 *
 * This component should be placed in your component tree where schedule data
 * is used, or at the root if schedule data is used throughout the app.
 */
export const ScheduleCacheProvider = () => {
  return CacheProvider(["schedule"], useCacheFlushDateSchedule);
};
