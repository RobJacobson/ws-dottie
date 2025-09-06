import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  wsfScheduleCacheFlushDateSchema,
  type WsfScheduleCacheFlushDate,
} from "@/schemas/shared/cacheFlushDate.zod";

// ============================================================================
// Input Schemas & Types
//
// No input parameters required
// ============================================================================

// ============================================================================
// Output Schemas & Types
//
// wsfScheduleCacheFlushDateSchema (imported from shared/cacheFlushDate.zod)
// WsfScheduleCacheFlushDate (imported from shared/cacheFlushDate.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getCacheFlushDate (get cache flush date for schedule data)
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/cacheflushdate";

export const getScheduleCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfScheduleCacheFlushDate
>(ENDPOINT, z.object({}), wsfScheduleCacheFlushDateSchema);

// ============================================================================
// TanStack Query Hooks
//
// useCacheFlushDate
// ============================================================================

export const scheduleCacheFlushDateOptions = createQueryOptions({
  apiFunction: getScheduleCacheFlushDate,
  queryKey: ["wsf", "schedule", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
