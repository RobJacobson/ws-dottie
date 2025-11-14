/**
 * @fileoverview React Query Hook Factory
 *
 * This module provides a utility function to create React Query hooks for
 * individual endpoints. It wraps fetch functions with React Query
 * hooks and optionally applies cache flush date invalidation for WSF APIs.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { EndpointGroup } from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import { useQueryWithCacheFlushDate } from "./createCacheFlushDateHook";
import type { FetchFunctionParams } from "./createFetchFunction";
import { cacheStrategies } from "./queryOptions";

/**
 * Helper type to simplify query hook options.
 *
 * Excludes queryKey and queryFn which are handled internally by the factory.
 *
 * @template TData - The data type returned by the query
 */
export type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

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
 * @param apiName - The name of the API (e.g., "wsf-vessels")
 * @param endpointGroup - The endpoint group containing cache strategy
 * @returns True if cache flush date invalidation should be used
 */
export const shouldUseCacheFlushDate = (
  apiName: string,
  endpointGroup: EndpointGroup
): boolean => {
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(apiName);

  if (
    endpointGroup.name === "cache-flush-date" ||
    endpointGroup.name === "schedule-cache-flush-date"
  ) {
    return false;
  }

  return isWsfApi && endpointGroup.cacheStrategy === "STATIC";
};

/**
 * Creates a typed hook function for an endpoint.
 *
 * This is a higher-order function that returns a React Query hook configured
 * for a specific endpoint. The hook selection (cache flush vs regular) is
 * determined at factory time to satisfy React's rules of hooks.
 *
 * @template TInput - The input parameters type for endpoint
 * @template TOutput - The output response type for endpoint
 * @param apiName - The API name (e.g., "wsf-vessels")
 * @param baseUrl - The base URL for the API
 * @param endpoint - The endpoint to create a hook for
 * @param fetchFunction - The fetch function to wrap with React Query
 * @param useCacheFlush - Whether to use cache flush date invalidation
 * @returns A React Query hook function for the endpoint
 */
export const createHookFunction = <TInput, TOutput>(
  apiName: string,
  baseUrl: string,
  endpoint: Endpoint<TInput, TOutput>,
  fetchFunction: (params?: FetchFunctionParams<TInput>) => Promise<TOutput>,
  useCacheFlush: boolean
): ((
  params?: FetchFunctionParams<TInput>,
  options?: QueryHookOptions<TOutput>
) => UseQueryResult<TOutput, Error>) => {
  if (useCacheFlush) {
    return (
      params?: FetchFunctionParams<TInput>,
      options?: QueryHookOptions<TOutput>
    ): UseQueryResult<TOutput, Error> => {
      return useQueryWithCacheFlushDate(
        apiName,
        baseUrl,
        endpoint,
        fetchFunction,
        params,
        options
      );
    };
  }

  return (
    params?: FetchFunctionParams<TInput>,
    options?: QueryHookOptions<TOutput>
  ): UseQueryResult<TOutput, Error> => {
    return useQuery({
      queryKey: [endpoint.id, params?.params ?? null],
      queryFn: () => fetchFunction(params),
      ...cacheStrategies[endpoint.cacheStrategy],
      refetchOnWindowFocus: false,
      ...options,
    });
  };
};
