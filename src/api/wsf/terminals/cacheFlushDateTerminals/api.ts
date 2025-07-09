// Cache flush date API functions

import { fetchWsf } from "@/shared/fetching/fetch";
import type { TerminalsCacheFlushDate } from "../types";

/**
 * API function for fetching cache flush date from WSF Terminals API
 *
 * Returns the date when the terminal data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to TerminalsCacheFlushDate object or null
 */
export const getCacheFlushDateTerminals =
  (): Promise<TerminalsCacheFlushDate | null> =>
    fetchWsf<TerminalsCacheFlushDate>("terminals", "/cacheflushdate");
