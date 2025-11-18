/**
 * @fileoverview React Query Hook Factory
 *
 * Creates strongly-typed React Query hooks from metadata objects.
 * Handles both regular hooks and cache-flush-date-aware hooks.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type {
  ApiDefinition,
  EndpointGroupMeta,
  EndpointMeta,
} from "@/apis/types";
import { useCacheFlushDate, useInvalidateOnFlushChange } from "@/shared/cache";
import { buildDescriptor } from "./buildDescriptor";
import { createFetchFunction } from "./createFetchFunction";
import { cacheStrategies } from "./strategies";
import type { FetchFunctionParams, QueryHookOptions } from "./types";

/**
 * Determines if an endpoint should use cache flush date invalidation.
 */
function shouldUseCacheFlushDate(
  apiDefinition: ApiDefinition,
  group: EndpointGroupMeta
): boolean {
  const isWsfApi = apiDefinition.api.name.startsWith("wsf-");

  if (
    group.name === "cache-flush-date" ||
    group.name === "schedule-cache-flush-date"
  ) {
    return false;
  }

  return isWsfApi && group.cacheStrategy === "STATIC";
}

/**
 * Creates a strongly-typed React Query hook from three metadata objects.
 */
export function createHook<I, O>(
  apiDefinition: ApiDefinition,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): (
  params?: FetchFunctionParams<I>,
  options?: QueryHookOptions<O>
) => UseQueryResult<O, Error> {
  const descriptor = buildDescriptor(apiDefinition, group, endpoint);
  const fetchFn = createFetchFunction(apiDefinition, group, endpoint);
  const useCacheFlush = shouldUseCacheFlushDate(apiDefinition, group);

  if (useCacheFlush) {
    return (
      params?: FetchFunctionParams<I>,
      options?: QueryHookOptions<O>
    ): UseQueryResult<O, Error> => {
      const flushDateQuery = useCacheFlushDate(
        apiDefinition.api.name,
        params?.fetchMode
      );
      useInvalidateOnFlushChange(descriptor.id, flushDateQuery);

      return useQuery({
        queryKey: [descriptor.id, params?.params ?? null],
        queryFn: () => fetchFn(params),
        ...cacheStrategies.STATIC,
        refetchOnWindowFocus: false,
        ...options,
      });
    };
  }

  return (
    params?: FetchFunctionParams<I>,
    options?: QueryHookOptions<O>
  ): UseQueryResult<O, Error> => {
    return useQuery({
      queryKey: [descriptor.id, params?.params ?? null],
      queryFn: () => fetchFn(params),
      ...cacheStrategies[group.cacheStrategy as keyof typeof cacheStrategies],
      refetchOnWindowFocus: false,
      ...options,
    });
  };
}
