/**
 * @fileoverview React Query Hook Factory
 *
 * Creates strongly-typed React Query hooks from metadata objects.
 * Handles both regular hooks and cache-flush-date-aware hooks.
 */

import { useQuery } from "@tanstack/react-query";
import type { CacheStrategy } from "@/apis/types";
import { useCacheFlushDate, useInvalidateOnFlushChange } from "@/shared/cache";
import { cacheStrategies } from "./strategies";
import type {
  FetchFunctionParams,
  HookFactory,
  QueryHookOptions,
} from "./types";

/**
 * Creates a strongly-typed React Query hook from parameter objects
 *
 * Automatically handles cache flush date polling and invalidation for WSF APIs
 * with STATIC cache strategy. For other APIs or strategies, creates a standard
 * React Query hook with the specified cache strategy.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param params - Configuration object for hook creation
 * @param params.apiName - The name of the API (e.g., "wsf-vessels")
 * @param params.endpointName - The function name of the endpoint (e.g., "vesselBasics")
 * @param params.fetchFn - The fetch function created by createFetchFunction
 * @param params.cacheStrategy - The cache strategy to use (REALTIME, FREQUENT, MODERATE, STATIC)
 * @returns A React Query hook function that accepts optional parameters and query options, returning UseQueryResult
 */
export function createHook<I, O>(params: {
  apiName: string;
  endpointName: string;
  fetchFn: (params?: FetchFunctionParams<I>) => Promise<O>;
  cacheStrategy: CacheStrategy;
}): HookFactory<I, O> {
  const { apiName, endpointName, fetchFn, cacheStrategy } = params;
  const useCacheFlush =
    apiName.startsWith("wsf-") && cacheStrategy === "STATIC";

  if (useCacheFlush) {
    return (params?: FetchFunctionParams<I>, options?: QueryHookOptions<O>) => {
      const flushDateQuery = useCacheFlushDate(apiName, params?.fetchMode);
      useInvalidateOnFlushChange(endpointName, flushDateQuery);

      return useQuery({
        queryKey: [endpointName, params?.params ?? null],
        queryFn: () => fetchFn(params),
        ...cacheStrategies.STATIC,
        refetchOnWindowFocus: false,
        ...options,
      });
    };
  }

  return (params?: FetchFunctionParams<I>, options?: QueryHookOptions<O>) =>
    useQuery({
      queryKey: [endpointName, params?.params ?? null],
      queryFn: () => fetchFn(params),
      ...cacheStrategies[cacheStrategy],
      refetchOnWindowFocus: false,
      ...options,
    });
}
