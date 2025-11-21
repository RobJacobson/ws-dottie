/**
 * @fileoverview Combined Fetch and Hook Factory
 *
 * Creates both strongly-typed fetch functions and React Query hooks from
 * metadata objects. Uses lazy loading for cache strategy to avoid circular
 * dependency issues.
 */

import type { ApiMeta, EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import { createFetchFunction } from "./createFetchFunction";
import { createHook } from "./createHook";
import type { FetchFactory, HookFactory } from "./types";

/**
 * Creates both a fetch function and a React Query hook from metadata objects
 *
 * This factory combines createFetchFunction and createHook into a single call,
 * using lazy loading for the cache strategy to avoid circular dependency issues
 * when endpoint files need to reference their group's cache strategy.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param params - Configuration object containing API, endpoint, and cache strategy getter
 * @param params.api - API metadata containing base URL and configuration
 * @param params.endpoint - Endpoint metadata containing path, schemas, and function name
 * @param params.getCacheStrategy - Function that lazily returns the cache strategy (called on each hook invocation)
 * @returns Object containing both fetch function and hook function
 */
export function createFetchAndHook<I, O>(params: {
  api: ApiMeta;
  endpoint: EndpointMeta<I, O>;
  getEndpointGroup: () => EndpointGroupMeta;
}): {
  fetch: FetchFactory<I, O>;
  hook: HookFactory<I, O>;
} {
  const { api, endpoint, getEndpointGroup } = params;

  // Create the fetch function using the existing factory
  const fetch = createFetchFunction({
    api,
    endpoint,
  });

  // Create a hook factory that lazily gets the cache strategy on each call
  const hook: HookFactory<I, O> = (params, options) => {
    const cacheStrategy = getEndpointGroup().cacheStrategy;
    const hookFn = createHook({
      apiName: api.name,
      endpointName: endpoint.functionName,
      fetchFn: fetch,
      cacheStrategy,
    });
    return hookFn(params, options);
  };

  return { fetch, hook };
}
