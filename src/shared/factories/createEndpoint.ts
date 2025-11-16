/**
 * @fileoverview Unified Endpoint Factory
 *
 * This module provides a single factory function to create endpoints with
 * fetch and hook methods, combining functionality of defineEndpoint
 * and createFetchFunction.
 */

import { fetchDottie } from "@/shared/fetching";
import { createHookFunction } from "./createHookFunction";
import type {
  DefineEndpointConfig,
  EndpointConfig,
  EndpointResult,
  FetchFunctionParams,
} from "./types";

/**
 * Creates a complete endpoint with fetch and hook methods
 *
 * This factory function creates an endpoint object with descriptor, fetch,
 * and useQuery methods in a single step, reducing abstraction layers.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param config - Configuration for endpoint
 * @returns An object with descriptor, fetch, and useQuery methods
 *
 * @example
 * ```typescript
 * const endpoint = createEndpoint({
 *   api: wsfVesselsApi,
 *   group: vesselLocationsGroup,
 *   functionName: "fetchVesselLocations",
 *   endpoint: "/vesselLocations",
 *   inputSchema: vesselLocationsInputSchema,
 *   outputSchema: vesselLocationSchema.array(),
 * });
 * ```
 */
export const createEndpoint = <I, O>(
  config: DefineEndpointConfig<I, O>
): EndpointResult<I, O> => {
  // Create complete endpoint configuration with computed properties
  const endpointConfig: EndpointConfig<I, O> = {
    ...config,
    urlTemplate: `${config.api.baseUrl}${config.endpoint}`,
    id: `${config.api.name}:${config.functionName}`,
    cacheStrategy: config.group.cacheStrategy,
  };

  // Create fetch function directly without additional abstraction layer
  const fetchFn = (params: FetchFunctionParams<I> = {}): Promise<O> => {
    return fetchDottie({
      endpoint: endpointConfig,
      ...params,
    });
  };

  // Create hook function
  const hookFn = createHookFunction<I, O>(endpointConfig, fetchFn);

  return {
    descriptor: endpointConfig,
    fetch: fetchFn,
    useQuery: hookFn,
  } as const;
};
