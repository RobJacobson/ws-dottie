import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  wsfFaresCacheFlushDateSchema,
  type WsfFaresCacheFlushDate,
} from "@/schemas/shared/cacheFlushDate.zod";

// ============================================================================
// Input Schemas & Types
//
// No input parameters required
// ============================================================================

// ============================================================================
// Output Schemas & Types
//
// wsfFaresCacheFlushDateSchema (imported from shared/cacheFlushDate.zod)
// WsfFaresCacheFlushDate (imported from shared/cacheFlushDate.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getCacheFlushDate (get cache flush date for fares data)
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/cacheflushdate";

export const getFaresCacheFlushDate = zodFetch<
  Record<string, never>,
  WsfFaresCacheFlushDate
>(ENDPOINT, z.object({}), wsfFaresCacheFlushDateSchema);

// ============================================================================
// TanStack Query Hooks
//
// useCacheFlushDate
// ============================================================================

export const faresCacheFlushDateOptions = createQueryOptions({
  apiFunction: getFaresCacheFlushDate,
  queryKey: ["wsf", "fares", "cacheflushdate", "getCacheFlushDate"],
  cacheStrategy: "DAILY_STATIC",
});
