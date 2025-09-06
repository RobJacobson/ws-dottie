import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  wsfCacheFlushDateSchema,
  type WsfCacheFlushDate,
} from "@/schemas/shared/cacheFlushDate.zod";

// ============================================================================
// Input Schemas & Types
//
// No input parameters required
// ============================================================================

// ============================================================================
// Output Schemas & Types
//
// wsfCacheFlushDateSchema (imported from shared/cacheFlushDate.zod)
// WsfCacheFlushDate (imported from shared/cacheFlushDate.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getCacheFlushDate (get cache flush date for terminals data)
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/cacheflushdate";

export const getTerminalsCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfCacheFlushDate
>(ENDPOINT, z.object({}), wsfCacheFlushDateSchema);

// ============================================================================
// TanStack Query Hooks
//
// useCacheFlushDate
// ============================================================================

export const terminalsCacheFlushDateOptions = createQueryOptions({
  apiFunction: getTerminalsCacheFlushDate,
  queryKey: ["wsf", "terminals", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
