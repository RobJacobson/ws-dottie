/**
 * @fileoverview Cache Management for WS-Dottie
 *
 * This module provides cache management functionality without depending
 * on endpoint definitions, avoiding circular dependencies.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { apis } from "@/apis/shared/apis";
import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";
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
import { createFetchFunction } from "@/shared/factories/metaEndpointFactory";

const CACHE_FLUSH_CONFIGS = {
  "wsf-fares": {
    api: apis.wsfFares,
    group: cacheFlushDateFaresGroup,
    meta: cacheFlushDateFaresMeta,
  },
  "wsf-schedule": {
    api: apis.wsfSchedule,
    group: cacheFlushDateScheduleGroup,
    meta: cacheFlushDateScheduleMeta,
  },
  "wsf-terminals": {
    api: apis.wsfTerminals,
    group: cacheFlushDateTerminalsGroup,
    meta: cacheFlushDateTerminalsMeta,
  },
  "wsf-vessels": {
    api: apis.wsfVessels,
    group: cacheFlushDateVesselsGroup,
    meta: cacheFlushDateVesselsMeta,
  },
} as const;

type CacheFlushApiName = keyof typeof CACHE_FLUSH_CONFIGS;

const getCacheFlushConfig = (
  apiName: string
): (typeof CACHE_FLUSH_CONFIGS)[CacheFlushApiName] | undefined => {
  return CACHE_FLUSH_CONFIGS[apiName as CacheFlushApiName];
};

const normalizeFlushDate = (
  value: CacheFlushDateOutput | undefined
): string => {
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
  const config = getCacheFlushConfig(apiName);
  const fetchCacheFlushDate =
    config &&
    createFetchFunction<CacheFlushDateInput, CacheFlushDateOutput>(
      config.api,
      config.group,
      config.meta
    );

  const descriptorId = config
    ? `${config.api.name}:${config.meta.functionName}`
    : "no-cache-flush";

  return useQuery({
    queryKey: [descriptorId],
    queryFn: fetchCacheFlushDate
      ? async () => {
          const result = await fetchCacheFlushDate({
            fetchMode: "native",
            validate: false,
            logMode: "none",
          });
          return normalizeFlushDate(result);
        }
      : () => Promise.resolve(""),
    refetchInterval: config ? 5 * 60 * 1000 : undefined,
    staleTime: config ? 5 * 60 * 1000 : undefined,
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
