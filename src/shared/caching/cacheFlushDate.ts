import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery, useQueryClient, queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetchCustom } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation";
import {
  FIVE_MINUTES,
  FIVE_SECONDS,
  ONE_DAY,
} from "@/shared/constants/queryOptions";
import { useEffect, useRef } from "react";

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
    return zodFetchCustom(
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
      staleTime: FIVE_MINUTES,
      gcTime: ONE_DAY,
      refetchInterval: FIVE_MINUTES,
      retry: 3,
      retryDelay: FIVE_SECONDS,
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

// ==========================================================================
// Query Options + Auto-Invalidation Helper
// ==========================================================================

export const wsfCacheFlushDateOptions = (apiType: WsfApiType) => {
  const endpoint = `/ferries/api/${apiType}/rest/cacheflushdate`;
  const key = ["wsf", apiType, "cacheFlushDate"] as const;
  return queryOptions({
    queryKey: key,
    queryFn: () =>
      zodFetchCustom(
        endpoint,
        {
          input: wsfCacheFlushDateParamsSchema,
          output: wsfCacheFlushDateSchema,
        },
        {}
      ),
    staleTime: FIVE_MINUTES,
    gcTime: ONE_DAY,
    refetchInterval: FIVE_MINUTES,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
};

/**
 * useWsfAutoInvalidateOnUpdate
 * Mount this in your app to automatically invalidate WSF queries when the
 * cache flush date changes for a given apiType.
 *
 * @param apiType - "fares" | "vessels" | "terminals" | "schedule"
 *
 * Behavior: invalidates all queries whose keys start with ["wsf", apiType]
 */
export const useWsfAutoInvalidateOnUpdate = (apiType: WsfApiType) => {
  const queryClient = useQueryClient();
  const { data: lastFlushDate } = useQuery(wsfCacheFlushDateOptions(apiType));
  const previous = useRef<Date | null>(null);

  useEffect(() => {
    if (!lastFlushDate) return;
    if (
      previous.current &&
      previous.current.getTime() === lastFlushDate.getTime()
    )
      return;
    previous.current = lastFlushDate;
    queryClient.invalidateQueries({ queryKey: ["wsf", apiType] });
  }, [lastFlushDate, queryClient, apiType]);
};
