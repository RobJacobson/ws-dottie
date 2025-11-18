/**
 * @fileoverview React Query Hook Factory
 *
 * This module provides a utility function to create React Query hooks for
 * individual endpoints. It wraps fetch functions with React Query
 * hooks and optionally applies cache flush date invalidation for WSF APIs.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { EndpointGroupMeta } from "@/apis/types";
import {
  useCacheFlushDate,
  useInvalidateOnFlushChange,
} from "@/shared/cache/cacheManager";
import { cacheStrategies } from "@/shared/factories/types";
import type {
  EndpointConfig,
  FetchFunctionParams,
  QueryHookOptions,
} from "./types";

/**
 * Creates a typed hook function for an endpoint.
 *
 * This is a higher-order function that returns a React Query hook configured
 * for a specific endpoint. The hook selection (cache flush vs regular) is
 * determined automatically based on the endpoint configuration (API name and
 * cache strategy).
 *
 * @template TInput - The input parameters type for endpoint
 * @template TOutput - The output response type for endpoint
 * @param config - The endpoint configuration object
 * @param fetchFunction - The fetch function to wrap with React Query
 * @returns A React Query hook function for endpoint
 */
export const createHookFunction = <TInput, TOutput>(
  config: EndpointConfig<TInput, TOutput>,
  fetchFunction: (params?: FetchFunctionParams<TInput>) => Promise<TOutput>
): ((
  params?: FetchFunctionParams<TInput>,
  options?: QueryHookOptions<TOutput>
) => UseQueryResult<TOutput, Error>) => {
  // Determine if cache flush should be used based on API and cache strategy
  // This is the single source of truth for cache flush date invalidation
  const useCacheFlush = shouldUseCacheFlushDate(config);

  if (useCacheFlush) {
    return (
      params?: FetchFunctionParams<TInput>,
      options?: QueryHookOptions<TOutput>
    ): UseQueryResult<TOutput, Error> => {
      const flushDateQuery = useCacheFlushDate(config.api.name);
      useInvalidateOnFlushChange(config.id, flushDateQuery);

      return useQuery({
        queryKey: [config.id, params?.params ?? null],
        queryFn: () => fetchFunction(params),
        ...cacheStrategies.STATIC,
        refetchOnWindowFocus: false,
        ...options,
      });
    };
  }

  return (
    params?: FetchFunctionParams<TInput>,
    options?: QueryHookOptions<TOutput>
  ): UseQueryResult<TOutput, Error> => {
    return useQuery({
      queryKey: [config.id, params?.params ?? null],
      queryFn: () => fetchFunction(params),
      ...cacheStrategies[config.cacheStrategy as keyof typeof cacheStrategies],
      refetchOnWindowFocus: false,
      ...options,
    });
  };
};

/**
 * Determines if an endpoint should use cache flush date invalidation.
 *
 * Cache invalidation is only applied to endpoints with STATIC cache strategy
 * that belong to WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
 * and are NOT REALTIME endpoints.
 *
 * This is a pure predicate function that makes the decision based solely on
 * API name and endpoint group properties.
 *
 * @param config - Configuration object containing api.name and group
 * @returns True if cache flush date invalidation should be used
 */
export const shouldUseCacheFlushDate = (config: {
  api: { name: string };
  group: EndpointGroupMeta;
}): boolean => {
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(config.api.name);

  if (
    config.group.name === "cache-flush-date" ||
    config.group.name === "schedule-cache-flush-date"
  ) {
    return false;
  }

  return isWsfApi && config.group.cacheStrategy === "STATIC";
};
