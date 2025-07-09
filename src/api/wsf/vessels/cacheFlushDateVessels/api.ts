// Cache flush date API functions

import { fetchWsf } from "@/shared/fetching/fetch";
import type { VesselsCacheFlushDate } from "../types";

/**
 * API function for fetching cache flush date from WSF Vessels API
 *
 * Returns the date when the vessel data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to VesselCacheFlushDate object or null
 */
export const getCacheFlushDateVessels =
  (): Promise<VesselsCacheFlushDate | null> =>
    fetchWsf<VesselsCacheFlushDate>("vessels", "/cacheflushdate");
