// Fares Cache Provider Component
// Monitors fares cache flush dates and automatically invalidates fares queries when data changes

import { CacheProvider } from "@/shared/caching/CacheProvider";

import { useFaresCacheFlushDate } from "./getFaresCacheFlushDate";

/**
 * Fares Cache Provider Component
 *
 * This component monitors fares cache flush dates and automatically
 * invalidates fares queries when the cache flush date changes, indicating
 * that the underlying fares data has been updated on the server.
 *
 * This component should be placed in your component tree where fares data
 * is used, or at the root if fares data is used throughout the app.
 */
export const FaresCacheProvider = () => {
  return CacheProvider(["fares"], useFaresCacheFlushDate);
};
