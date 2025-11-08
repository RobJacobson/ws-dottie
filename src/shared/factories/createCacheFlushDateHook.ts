/**
 * @fileoverview Cache Flush Date Hook for React Query
 *
 * This module provides a hook that polls cache flush date endpoints and
 * invalidates queries when the flush date changes. Used for WSF APIs
 * (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels) with STATIC cache
 * strategy endpoints.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import { createEndpoint } from "./createEndpoint";
import type { FetchFunctionParams } from "./createFetchFunctions";
import { cacheStrategies } from "./queryOptions";

/**
 * Finds the cache flush date endpoint for an API.
 *
 * This is a pure function that searches through endpoint groups to find
 * the cache flush date endpoint. Returns null if not found.
 *
 * @param apiDefinition - The API definition to search
 * @returns The cache flush date endpoint, or null if not found
 */
const findCacheFlushEndpoint = (
  apiDefinition: ApiDefinition
): Endpoint<unknown, unknown> | null => {
  const cacheFlushDateGroup = apiDefinition.endpointGroups.find(
    (group) =>
      group.name === "cache-flush-date" ||
      group.name === "schedule-cache-flush-date"
  );

  if (!cacheFlushDateGroup) {
    return null;
  }

  const [functionName, cacheFlushDateEndpointDef] =
    Object.entries(cacheFlushDateGroup.endpoints)[0] ?? [];

  if (!functionName || !cacheFlushDateEndpointDef) {
    return null;
  }

  return createEndpoint(
    apiDefinition,
    cacheFlushDateGroup,
    cacheFlushDateEndpointDef as EndpointDefinition<unknown, unknown>,
    functionName
  );
};

/**
 * Hook to poll the cache flush date endpoint.
 *
 * This hook queries the cache flush date endpoint every 5 minutes to detect
 * when the cache has been invalidated on the server side.
 *
 * @param cacheFlushEndpoint - The cache flush date endpoint to poll, or null
 * @returns Query result with the cache flush date
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
 * @param flushDateQuery - Query result with the cache flush date
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
 * the data query when the flush date changes. It stores the last flush date
 * in a ref to detect changes.
 *
 * @template TInput - The input parameters type for the endpoint
 * @template TOutput - The output response type for the endpoint
 * @param apiDefinition - The API definition (to find cache flush endpoint)
 * @param endpoint - The endpoint to create a hook for
 * @param fetchFunction - The fetch function to wrap
 * @param params - Parameters to pass to the fetch function
 * @param options - Additional React Query options
 * @returns A React Query result with cache invalidation support
 */
export const useQueryWithCacheFlushDate = <TInput, TOutput>(
  apiDefinition: ApiDefinition,
  endpoint: Endpoint<TInput, TOutput>,
  fetchFunction: (params?: FetchFunctionParams<TInput>) => Promise<TOutput>,
  params?: FetchFunctionParams<TInput>,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">
): UseQueryResult<TOutput, Error> => {
  const cacheFlushEndpoint = findCacheFlushEndpoint(apiDefinition);
  const flushDateQuery = useCacheFlushDateQuery(cacheFlushEndpoint);

  useCacheInvalidation(endpoint.id, flushDateQuery);

  return useQuery({
    queryKey: [endpoint.id, params?.params ?? null],
    queryFn: () => fetchFunction(params),
    ...(cacheFlushEndpoint
      ? cacheStrategies.STATIC
      : cacheStrategies[endpoint.cacheStrategy]),
    refetchOnWindowFocus: false,
    ...options,
  });
};
