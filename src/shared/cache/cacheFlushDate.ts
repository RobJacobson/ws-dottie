/**
 * @fileoverview Cache Flush Date Hooks for WS-Dottie
 *
 * Provides React Query hooks for polling cache flush dates and invalidating
 * queries when flush dates change. This is specifically for WSF APIs that
 * use cache flush dates to indicate when static data has been updated.
 *
 * Does not create fetch functions - accepts them as dependencies to avoid
 * circular dependencies.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import type { CacheFlushDateOutput } from "@/apis/shared/cacheFlushDate";

// Cache flush date fetch functions are imported from their respective API modules
// This breaks the circular dependency
import { fetchCacheFlushDateFares } from "@/apis/wsf-fares/cacheFlushDate/cacheFlushDateFares";
import { fetchCacheFlushDateSchedule } from "@/apis/wsf-schedule/cacheFlushDate/cacheFlushDateSchedule";
import { fetchCacheFlushDateTerminals } from "@/apis/wsf-terminals/cacheFlushDate/cacheFlushDateTerminals";
import { fetchCacheFlushDateVessels } from "@/apis/wsf-vessels/cacheFlushDate/cacheFlushDateVessels";

type CacheFlushApiName =
  | "wsf-fares"
  | "wsf-schedule"
  | "wsf-terminals"
  | "wsf-vessels";

type CacheFlushFetchFn = () => Promise<string>;

const CACHE_FLUSH_FUNCTIONS: Record<CacheFlushApiName, CacheFlushFetchFn> = {
  "wsf-fares": async () => {
    const result = await fetchCacheFlushDateFares({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    });
    return normalizeFlushDate(result);
  },
  "wsf-schedule": async () => {
    const result = await fetchCacheFlushDateSchedule({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    });
    return normalizeFlushDate(result);
  },
  "wsf-terminals": async () => {
    const result = await fetchCacheFlushDateTerminals({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    });
    return normalizeFlushDate(result);
  },
  "wsf-vessels": async () => {
    const result = await fetchCacheFlushDateVessels({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    });
    return normalizeFlushDate(result);
  },
} as const;

const CACHE_FLUSH_ENDPOINT_IDS: Record<CacheFlushApiName, string> = {
  "wsf-fares": "wsf-fares:fetchCacheFlushDateFares",
  "wsf-schedule": "wsf-schedule:fetchCacheFlushDateSchedule",
  "wsf-terminals": "wsf-terminals:fetchCacheFlushDateTerminals",
  "wsf-vessels": "wsf-vessels:fetchCacheFlushDateVessels",
} as const;

const normalizeFlushDate = (value: CacheFlushDateOutput): string => {
  if (!value) {
    return "";
  }
  return value instanceof Date ? value.toISOString() : String(value);
};

/**
 * Hook to poll cache flush date endpoint
 */
export const useCacheFlushDate = (
  apiName: string
): UseQueryResult<string, Error> => {
  const isCacheFlushApi = apiName in CACHE_FLUSH_FUNCTIONS;
  const fetchFn = CACHE_FLUSH_FUNCTIONS[apiName as CacheFlushApiName];
  const endpointId =
    CACHE_FLUSH_ENDPOINT_IDS[apiName as CacheFlushApiName] || "no-cache-flush";

  return useQuery({
    queryKey: [endpointId],
    queryFn: isCacheFlushApi ? fetchFn : () => Promise.resolve(""),
    refetchInterval: isCacheFlushApi ? 5 * 60 * 1000 : undefined,
    staleTime: isCacheFlushApi ? 5 * 60 * 1000 : undefined,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to handle cache invalidation when flush date changes
 */
export const useInvalidateOnFlushChange = (
  endpointId: string,
  flushDateQuery?: UseQueryResult<string, Error>
): void => {
  const queryClient = useQueryClient();
  const previousFlushDateRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (!flushDateQuery?.data) {
      return;
    }

    const currentFlushDate = flushDateQuery.data;
    if (
      previousFlushDateRef.current !== null &&
      previousFlushDateRef.current !== currentFlushDate
    ) {
      queryClient.invalidateQueries({ queryKey: [endpointId] });
    }
    previousFlushDateRef.current = currentFlushDate;
  }, [flushDateQuery?.data, queryClient, endpointId]);
};

/**
 * @deprecated Use useInvalidateOnFlushChange instead.
 */
export const useCacheInvalidation = useInvalidateOnFlushChange;
