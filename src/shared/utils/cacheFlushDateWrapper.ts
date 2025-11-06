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
import { useEffect } from "react";
import type { ApiDefinition, EndpointGroup } from "@/apis/types";
import { cacheStrategies } from "@/shared/tanstack/queryOptions";
import type { Endpoint } from "@/shared/types";
import { createEndpoint } from "./endpointFactory";

/**
 * Wraps a React Query hook with cache flush date polling and invalidation
 *
 * This hook polls the cache flush date endpoint every 5 minutes and invalidates
 * the data query when the flush date changes. It stores the last flush date
 * in localStorage to detect changes.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param apiDefinition - The API definition (to find cache flush endpoint)
 * @param endpointGroup - The endpoint group (to get cache strategy)
 * @param endpoint - The endpoint to create a hook for
 * @param fetchFunction - The fetch function to wrap
 * @param params - Parameters to pass to the fetch function
 * @param options - Additional React Query options
 * @returns A React Query result with cache invalidation support
 */
export function useQueryWithCacheFlushDate<TInput, TOutput>(
  apiDefinition: ApiDefinition,
  _endpointGroup: EndpointGroup,
  endpoint: Endpoint<TInput, TOutput>,
  fetchFunction: (params?: { params?: TInput }) => Promise<TOutput>,
  params?: TInput,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">
): UseQueryResult<TOutput, Error> {
  const queryClient = useQueryClient();
  const apiName = apiDefinition.name;

  // Find the cache flush date endpoint
  const cacheFlushDateGroup = apiDefinition.endpointGroups.find(
    (group) =>
      group.name === "cache-flush-date" ||
      group.name === "schedule-cache-flush-date"
  );

  const cacheFlushDateEndpointDef =
    cacheFlushDateGroup?.endpoints.getCacheFlushDate;
  const cacheFlushEndpoint = cacheFlushDateEndpointDef
    ? createEndpoint(
        apiDefinition,
        cacheFlushDateGroup,
        cacheFlushDateEndpointDef
      )
    : null;

  const flushDateKey = cacheFlushEndpoint ? `${endpoint.id}-flushDate` : null;

  // Query to poll the cacheFlushDate endpoint
  const flushDateQuery = useQuery({
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

  // Effect to handle cache invalidation when flush date changes
  useEffect(() => {
    if (cacheFlushEndpoint && flushDateQuery.data && flushDateKey) {
      const lastFlushDate = localStorage.getItem(flushDateKey);
      const currentFlushDate =
        flushDateQuery.data instanceof Date
          ? flushDateQuery.data.toISOString()
          : String(flushDateQuery.data);

      // If flush date has changed, invalidate the data query
      if (currentFlushDate !== lastFlushDate) {
        queryClient.invalidateQueries({ queryKey: [endpoint.id] });
        localStorage.setItem(flushDateKey, currentFlushDate);
      }
    }
  }, [
    flushDateQuery.data,
    queryClient,
    endpoint.id,
    flushDateKey,
    cacheFlushEndpoint,
  ]);

  // Return the data query with FREQUENT strategy (not STATIC) when using cache flush
  return useQuery({
    queryKey: [endpoint.id, params],
    queryFn: () => fetchFunction({ params }),
    // Use FREQUENT strategy for data that has cacheFlushDate, otherwise use endpoint strategy
    ...(cacheFlushEndpoint
      ? cacheStrategies.FREQUENT
      : cacheStrategies[endpoint.cacheStrategy]),
    refetchOnWindowFocus: false,
    ...options,
  });
}
