/**
 * @fileoverview Cache Flush Date Hook for React Query
 *
 * This module provides a hook that polls cache flush date endpoints and
 * invalidates queries when flush date changes. Used for WSF APIs
 * (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels) with STATIC cache
 * strategy endpoints.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { cacheStrategies } from "@/shared/factories/types";
import type { Endpoint } from "@/shared/types";
import type { EndpointConfig, FetchFunctionParams } from "./types";

/**
 * Finds the cache flush date endpoint for an API from the endpoints registry.
 *
 * This function looks up the cache flush date endpoint by constructing the
 * expected function name based on the API name and searching the endpoints registry.
 *
 * @param apiName - The API name (e.g., "wsf-vessels")
 * @returns The cache flush date endpoint, or null if not found
 */
const findCacheFlushEndpoint = (
  apiName: string
): Endpoint<unknown, unknown> | null => {
  // Import endpoints registry dynamically to avoid circular dependency
  // The registry imports endpoint files which may import hooks that use this function
  try {
    // Construct expected function name based on API name
    const functionNameMap: Record<string, string> = {
      "wsf-vessels": "fetchCacheFlushDateVessels",
      "wsf-fares": "fetchCacheFlushDateFares",
      "wsf-schedule": "fetchCacheFlushDateSchedule",
      "wsf-terminals": "fetchCacheFlushDateTerminals",
    };

    const functionName = functionNameMap[apiName];
    if (!functionName) {
      return null;
    }

    // Dynamically import endpoints registry to avoid circular dependency
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { endpoints } = require("@/shared/endpoints");

    // Look up endpoint from registry using api name and function name
    const endpoint = endpoints.find(
      (ep: Endpoint<unknown, unknown>) =>
        ep.api.name === apiName && ep.functionName === functionName
    );

    return endpoint || null;
  } catch {
    return null;
  }
};

/**
 * Hook to poll cache flush date endpoint.
 *
 * This hook queries the cache flush date endpoint every 5 minutes to detect
 * when the cache has been invalidated on the server side.
 *
 * @param cacheFlushEndpoint - The cache flush date endpoint to poll, or null
 * @returns Query result with cache flush date
 */
const useCacheFlushDateQuery = (
  cacheFlushEndpoint: Endpoint<unknown, unknown> | null
): UseQueryResult<unknown, Error> => {
  return useQuery({
    queryKey: cacheFlushEndpoint ? [cacheFlushEndpoint.id] : ["no-cache-flush"],
    queryFn: cacheFlushEndpoint
      ? async () => {
          const fetchFn = await import("@/shared/fetching");
          return fetchFn.fetchDottie({ endpoint: cacheFlushEndpoint });
        }
      : () => Promise.resolve(null),
    enabled: !!cacheFlushEndpoint,
    refetchInterval: cacheFlushEndpoint ? 5 * 60 * 1000 : undefined, // 5 minutes
    staleTime: cacheFlushEndpoint ? 5 * 60 * 1000 : undefined,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to handle cache invalidation when flush date changes.
 *
 * This hook monitors the cache flush date query and invalidates the data
 * query when the flush date changes. It uses a ref to track the previous
 * flush date value.
 *
 * @param endpointId - The ID of the endpoint to invalidate
 * @param flushDateQuery - Query result with cache flush date
 */
const useCacheInvalidation = (
  endpointId: string,
  flushDateQuery: UseQueryResult<unknown, Error>
): void => {
  const queryClient = useQueryClient();
  const previousFlushDateRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (flushDateQuery.data) {
      const currentFlushDate =
        flushDateQuery.data instanceof Date
          ? flushDateQuery.data.toISOString()
          : String(flushDateQuery.data);

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

/**
 * Wraps a React Query hook with cache flush date polling and invalidation.
 *
 * This hook polls the cache flush date endpoint every 5 minutes and invalidates
 * data query when the flush date changes. It stores the last flush date
 * in a ref to detect changes.
 *
 * @template TInput - The input parameters type for endpoint
 * @template TOutput - The output response type for endpoint
 * @param config - The endpoint configuration object
 * @param fetchFunction - The fetch function to wrap
 * @param params - Parameters to pass to the fetch function
 * @param options - Additional React Query options
 * @returns A React Query result with cache invalidation support
 */
export const useQueryWithCacheFlushDate = <TInput, TOutput>(
  config: EndpointConfig<TInput, TOutput>,
  fetchFunction: (params?: FetchFunctionParams<TInput>) => Promise<TOutput>,
  params?: FetchFunctionParams<TInput>,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">
): UseQueryResult<TOutput, Error> => {
  const cacheFlushEndpoint = findCacheFlushEndpoint(config.api.name);
  const flushDateQuery = useCacheFlushDateQuery(cacheFlushEndpoint);

  useCacheInvalidation(config.id, flushDateQuery);

  return useQuery({
    queryKey: [config.id, params?.params ?? null],
    queryFn: () => fetchFunction(params),
    ...(cacheFlushEndpoint
      ? cacheStrategies.STATIC
      : cacheStrategies[config.cacheStrategy as keyof typeof cacheStrategies]),
    refetchOnWindowFocus: false,
    ...options,
  }) as UseQueryResult<TOutput, Error>;
};
