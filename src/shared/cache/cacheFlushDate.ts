/**
 * @fileoverview Cache Flush Date Hooks for WS-Dottie
 *
 * Provides React Query hooks for polling cache flush dates and invalidating
 * queries when flush dates change. This is specifically for WSF APIs that
 * use cache flush dates to indicate when static data has been updated.
 *
 * Uses internal fetch functions created with createFetchFunction to break
 * circular dependencies. These are separate from the public-facing fetch
 * functions exported from API modules.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { apis } from "@/apis/shared/apis";
import type { CacheFlushDateOutput } from "@/apis/shared/cacheFlushDate";
import {
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta,
} from "@/apis/wsf-fares/cacheFlushDate/shared/cacheFlushDate.endpoints";
import {
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta,
} from "@/apis/wsf-schedule/cacheFlushDate/shared/cacheFlushDate.endpoints";
import {
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta,
} from "@/apis/wsf-terminals/cacheFlushDate/shared/cacheFlushDate.endpoints";
import {
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta,
} from "@/apis/wsf-vessels/cacheFlushDate/shared/cacheFlushDate.endpoints";
import { createFetchFunction } from "@/shared/factories/createFetchFunction";
import type { FetchFunctionParams } from "@/shared/factories/types";

type CacheFlushApiName =
  | "wsf-fares"
  | "wsf-schedule"
  | "wsf-terminals"
  | "wsf-vessels";

type CacheFlushFetchFn = () => Promise<string>;

// Internal fetch functions created using createFetchFunction
// These are separate from the public-facing functions exported from API modules
// This breaks the circular dependency because createFetchFunction has no
// dependencies on cache or React hooks
const internalFetchCacheFlushDateFares = createFetchFunction(
  apis.wsfFares,
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta
);

const internalFetchCacheFlushDateSchedule = createFetchFunction(
  apis.wsfSchedule,
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta
);

const internalFetchCacheFlushDateTerminals = createFetchFunction(
  apis.wsfTerminals,
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta
);

const internalFetchCacheFlushDateVessels = createFetchFunction(
  apis.wsfVessels,
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta
);

// Strategy pattern: map API names to fetch functions
const CACHE_FLUSH_STRATEGIES: Record<CacheFlushApiName, CacheFlushFetchFn> = {
  "wsf-fares": async () => {
    const result = await internalFetchCacheFlushDateFares({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    } as FetchFunctionParams<Record<string, never>>);
    return normalizeFlushDate(result);
  },
  "wsf-schedule": async () => {
    const result = await internalFetchCacheFlushDateSchedule({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    } as FetchFunctionParams<Record<string, never>>);
    return normalizeFlushDate(result);
  },
  "wsf-terminals": async () => {
    const result = await internalFetchCacheFlushDateTerminals({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    } as FetchFunctionParams<Record<string, never>>);
    return normalizeFlushDate(result);
  },
  "wsf-vessels": async () => {
    const result = await internalFetchCacheFlushDateVessels({
      fetchMode: "native",
      validate: false,
      logMode: "none",
    } as FetchFunctionParams<Record<string, never>>);
    return normalizeFlushDate(result);
  },
} as const;

// Getter that retrieves the fetch function from the strategy map
const getCachedFetchFunction = (
  apiName: CacheFlushApiName
): CacheFlushFetchFn => {
  const strategy = CACHE_FLUSH_STRATEGIES[apiName];
  if (!strategy) {
    throw new Error(`No cache flush strategy found for API: ${apiName}`);
  }
  return strategy;
};

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
  const isCacheFlushApi: boolean =
    apiName === "wsf-fares" ||
    apiName === "wsf-schedule" ||
    apiName === "wsf-terminals" ||
    apiName === "wsf-vessels";

  const fetchFn = isCacheFlushApi
    ? getCachedFetchFunction(apiName as CacheFlushApiName)
    : undefined;

  const endpointId =
    CACHE_FLUSH_ENDPOINT_IDS[apiName as CacheFlushApiName] || "no-cache-flush";

  return useQuery({
    queryKey: [endpointId],
    queryFn: fetchFn ?? (() => Promise.resolve("")),
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
