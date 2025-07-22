// Vessel Cache Provider Component
// Monitors vessel cache flush dates and automatically invalidates vessel queries when data changes

import { CacheProvider } from "@/shared/caching/CacheProvider";

import { useCacheFlushDateVessels } from "./queries";

/**
 * Vessel Cache Provider Component
 *
 * This component monitors vessel cache flush dates and automatically
 * invalidates vessel queries when the cache flush date changes, indicating
 * that the underlying vessel data has been updated on the server.
 *
 * This component should be placed in your component tree where vessel data
 * is used, or at the root if vessel data is used throughout the app.
 */
export const VesselCacheProvider = () => {
  return CacheProvider(["vessels"], useCacheFlushDateVessels);
};
