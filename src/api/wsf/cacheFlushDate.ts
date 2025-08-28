import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// Types
// ============================================================================

export type WsfApiType = "fares" | "vessels" | "terminals" | "schedule";

export type WsfCacheFlushDate = Date;

export type WsfCacheFlushDateParams = Record<string, never>;

// ============================================================================
// Schema
// ============================================================================

export const wsfCacheFlushDateParamsSchema = z.object({});

export const wsfCacheFlushDateSchema = zWsdotDate();

// ============================================================================
// Factory Function
// ============================================================================

export const createWsfCacheFlushDate = (apiType: WsfApiType) => {
  const endpoint = `/ferries/api/${apiType}/rest/cacheflushdate`;
  const queryKey = ["wsf", apiType, "cacheFlushDate"];

  // ============================================================================
  // API Function
  // ============================================================================

  const getCacheFlushDate = async (
    params: WsfCacheFlushDateParams = {}
  ): Promise<WsfCacheFlushDate> => {
    return zodFetch(
      endpoint,
      {
        input: wsfCacheFlushDateParamsSchema,
        output: wsfCacheFlushDateSchema,
      },
      params
    );
  };

  // ============================================================================
  // TanStack Query Hook
  // ============================================================================

  const useCacheFlushDate = (
    params: WsfCacheFlushDateParams = {},
    options?: Omit<UseQueryOptions, "queryKey" | "queryFn">
  ) => {
    return useQuery({
      queryKey: [...queryKey, params],
      queryFn: () => getCacheFlushDate(params),
      ...tanstackQueryOptions.DAILY_UPDATES,
      ...options,
    });
  };

  return {
    getCacheFlushDate,
    useCacheFlushDate,
    endpoint,
    queryKey,
  };
};

// ============================================================================
// Pre-configured Instances
// ============================================================================

export const {
  getCacheFlushDate: getFaresCacheFlushDate,
  useCacheFlushDate: useFaresCacheFlushDate,
} = createWsfCacheFlushDate("fares");

export const {
  getCacheFlushDate: getCacheFlushDateVessels,
  useCacheFlushDate: useCacheFlushDateVessels,
} = createWsfCacheFlushDate("vessels");

export const {
  getCacheFlushDate: getCacheFlushDateTerminals,
  useCacheFlushDate: useCacheFlushDateTerminals,
} = createWsfCacheFlushDate("terminals");

export const {
  getCacheFlushDate: getCacheFlushDateSchedule,
  useCacheFlushDate: useCacheFlushDateSchedule,
} = createWsfCacheFlushDate("schedule");
