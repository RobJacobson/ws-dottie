/**
 * @fileoverview Cache Management for WS-Dottie
 *
 * This module provides cache management functionality without depending
 * on endpoint definitions, avoiding circular dependencies.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchDottie } from "@/shared/fetching";
import type { FetchDottieParams } from "@/shared/fetching/types";
import type { Endpoint } from "@/shared/types";

// Cache flush endpoint configurations using existing API definitions
const CACHE_FLUSH_ENDPOINTS = {
  "wsf-vessels": {
    apiName: "wsf-vessels",
    endpoint: "/cacheflushdate",
    functionName: "fetchCacheFlushDateVessels",
    id: "wsf-vessels:cacheFlushDate",
  },
  "wsf-fares": {
    apiName: "wsf-fares",
    endpoint: "/cacheflushdate",
    functionName: "fetchCacheFlushDateFares",
    id: "wsf-fares:cacheFlushDate",
  },
  "wsf-schedule": {
    apiName: "wsf-schedule",
    endpoint: "/cacheflushdate",
    functionName: "fetchCacheFlushDateSchedule",
    id: "wsf-schedule:cacheFlushDate",
  },
  "wsf-terminals": {
    apiName: "wsf-terminals",
    endpoint: "/cacheflushdate",
    functionName: "fetchCacheFlushDateTerminals",
    id: "wsf-terminals:cacheFlushDate",
  },
} as const;

type CacheFlushEndpointConfig =
  (typeof CACHE_FLUSH_ENDPOINTS)[keyof typeof CACHE_FLUSH_ENDPOINTS];

/**
 * Creates a mock endpoint object for cache flush date endpoints
 * This avoids importing from the endpoints registry
 */
const createCacheFlushEndpoint = (
  config: CacheFlushEndpointConfig
): Endpoint<unknown, unknown> => {
  // Import API definitions dynamically to avoid circular dependencies
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { apis } = require("@/apis/shared/apis");
  const api = apis[config.apiName as keyof typeof apis];

  return {
    api,
    endpoint: config.endpoint,
    functionName: config.functionName,
    id: config.id,
    urlTemplate: `${api.baseUrl}${config.endpoint}`,
    cacheStrategy: "STATIC" as const,
  };
};

/**
 * Determines if an endpoint should use cache flush date invalidation
 */
export const shouldUseCacheFlushDate = (
  apiName: string,
  cacheStrategy: string
): boolean => {
  const isWsfApi = Object.keys(CACHE_FLUSH_ENDPOINTS).includes(apiName);
  return isWsfApi && cacheStrategy === "STATIC";
};

/**
 * Hook to poll cache flush date endpoint
 */
export const useCacheFlushDateQuery = (
  apiName: string
): UseQueryResult<string, Error> => {
  const endpointConfig =
    CACHE_FLUSH_ENDPOINTS[apiName as keyof typeof CACHE_FLUSH_ENDPOINTS];

  return useQuery({
    queryKey: endpointConfig ? [endpointConfig.id] : ["no-cache-flush"],
    queryFn: endpointConfig
      ? async () => {
          const endpoint = createCacheFlushEndpoint(endpointConfig);
          const params: FetchDottieParams<unknown, unknown> = {
            endpoint,
            fetchMode: "native",
            validate: false,
            logMode: "none",
          };
          const result = await fetchDottie(params);
          // Convert result to string for consistency
          return result instanceof Date ? result.toISOString() : String(result);
        }
      : () => Promise.resolve(""),
    enabled: !!endpointConfig,
    refetchInterval: endpointConfig ? 5 * 60 * 1000 : undefined, // 5 minutes
    staleTime: endpointConfig ? 5 * 60 * 1000 : undefined,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to handle cache invalidation when flush date changes
 */
export const useCacheInvalidation = (
  endpointId: string,
  flushDateQuery: UseQueryResult<string, Error>
): void => {
  const queryClient = useQueryClient();
  const previousFlushDateRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (flushDateQuery.data) {
      const currentFlushDate = flushDateQuery.data;
      if (
        previousFlushDateRef.current !== null &&
        previousFlushDateRef.current !== currentFlushDate
      ) {
        queryClient.invalidateQueries({ queryKey: [endpointId] });
      }
      previousFlushDateRef.current = currentFlushDate;
    }
  }, [flushDateQuery.data, queryClient, endpointId]);
};
