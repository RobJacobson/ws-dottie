/**
 * @fileoverview Cache Flush Date Wrapper for React Query Hooks
 *
 * This module provides a wrapper hook that polls cache flush date endpoints
 * and invalidates queries when the flush date changes. This is used for
 * WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels) with
 * STATIC cache strategy endpoints.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import { createEndpoint } from "./createEndpoint";
import { cacheStrategies } from "./queryOptions";

/**
 * Finds the cache flush date endpoint for an API
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
 * Hook to poll the cache flush date endpoint
 *
 * @param cacheFlushEndpoint - The cache flush date endpoint to poll
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
 * Hook to handle cache invalidation when flush date changes
 *
 * @param endpointId - The ID of endpoint to invalidate
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

      // If flush date has changed from the previous value, invalidate the data query
      if (
        previousFlushDateRef.current !== null &&
        previousFlushDateRef.current !== currentFlushDate
      ) {
        queryClient.invalidateQueries({ queryKey: [endpointId] });
      }

      // Update the previous flush date reference
      previousFlushDateRef.current = currentFlushDate;
    }
  }, [flushDateQuery.data, queryClient, endpointId]);
};

/**
 * Creates a data query with appropriate cache strategy
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - The endpoint to create a query for
 * @param fetchFunction - The fetch function to use
 * @param params - Parameters to pass to the fetch function
 * @param hasCacheFlush - Whether the endpoint has cache flush date support
 * @param options - Additional React Query options
 * @returns Query result with the data
 */
const useDataQuery = <TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>,
  fetchFunction: (params?: { params?: TInput }) => Promise<TOutput>,
  params?: TInput,
  hasCacheFlush?: boolean,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">
): UseQueryResult<TOutput, Error> => {
  return useQuery({
    queryKey: [endpoint.id, params],
    queryFn: () => fetchFunction({ params }),
    // Use STATIC strategy for data that has cacheFlushDate, otherwise use endpoint strategy
    ...(hasCacheFlush
      ? cacheStrategies.STATIC
      : cacheStrategies[endpoint.cacheStrategy]),
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Wraps a React Query hook with cache flush date polling and invalidation
 *
 * This hook polls the cache flush date endpoint every 5 minutes and invalidates
 * data query when the flush date changes. It stores the last flush date
 * in a ref to detect changes.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
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
  fetchFunction: (params?: { params?: TInput }) => Promise<TOutput>,
  params?: TInput,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">
): UseQueryResult<TOutput, Error> => {
  // Find the cache flush date endpoint
  const cacheFlushEndpoint = findCacheFlushEndpoint(apiDefinition);

  // Query to poll the cacheFlushDate endpoint
  const flushDateQuery = useCacheFlushDateQuery(cacheFlushEndpoint);

  // Handle cache invalidation when flush date changes
  useCacheInvalidation(endpoint.id, flushDateQuery);

  // Return the data query with appropriate cache strategy
  return useDataQuery(
    endpoint,
    fetchFunction,
    params,
    !!cacheFlushEndpoint,
    options
  );
};
