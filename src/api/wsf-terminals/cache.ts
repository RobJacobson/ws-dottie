// Terminal Cache Provider Component
// Monitors terminal cache flush dates and automatically invalidates terminal queries when data changes

import { CacheProvider } from "@/shared/caching/CacheProvider";

import { useCacheFlushDateTerminals } from "./queries";

/**
 * Terminal Cache Provider Component
 *
 * This component monitors terminal cache flush dates and automatically
 * invalidates terminal queries when the cache flush date changes, indicating
 * that the underlying terminal data has been updated on the server.
 *
 * This component should be placed in your component tree where terminal data
 * is used, or at the root if terminal data is used throughout the app.
 */
export const TerminalCacheProvider = () => {
  return CacheProvider(["terminals"], useCacheFlushDateTerminals);
};
