/**
 * @fileoverview Endpoint Builder Factory
 *
 * This module provides a factory function to define individual endpoints with
 * fetch and hook methods, using a shared endpoint group.
 */

import { createFetchFunction } from "./createFetchFunction";
import { createHookFunction } from "./createHookFunction";
import type {
  DefineEndpointConfig,
  EndpointConfig,
  EndpointResult,
} from "./types";

/**
 * Defines an endpoint with fetch and hook methods
 *
 * This factory function creates an endpoint object with descriptor, fetch,
 * and useQuery methods. It builds the endpoint descriptor directly without
 * using group.collect.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param config - Configuration for endpoint
 * @returns An object with descriptor, fetch, and useQuery methods
 *
 * @example
 * ```typescript
 * const endpoint = defineEndpoint({
 *   api: wsfVesselsApi,
 *   group: vesselLocationsGroup,
 *   functionName: "fetchVesselLocations",
 *   endpoint: "/vesselLocations",
 *   inputSchema: vesselLocationsInputSchema,
 *   outputSchema: vesselLocationSchema.array(),
 * });
 * ```
 */
export const defineEndpoint = <I, O>(
  config: DefineEndpointConfig<I, O>
): EndpointResult<I, O> => {
  // Create complete endpoint configuration with computed properties
  const endpointConfig = createEndpointConfig<I, O>(config);

  const fetchFn = createFetchFunction<I, O>(endpointConfig);

  const hookFn = createHookFunction<I, O>(endpointConfig, fetchFn);

  return {
    descriptor: endpointConfig,
    fetch: fetchFn,
    useQuery: hookFn,
  } as const;
};
/**
 * Creates a complete endpoint configuration with computed properties
 *
 * This function takes a base endpoint configuration and appends the computed
 * properties (urlTemplate, id) to create a complete endpoint config.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param config - Base configuration for endpoint
 * @returns Complete endpoint configuration with computed properties
 */
export const createEndpointConfig = <I, O>(
  config: DefineEndpointConfig<I, O>
): EndpointConfig<I, O> => ({
  ...config,
  urlTemplate: `${config.api.baseUrl}${config.endpoint}`,
  id: `${config.api.name}:${config.functionName}`,
  cacheStrategy: config.group.cacheStrategy,
});
