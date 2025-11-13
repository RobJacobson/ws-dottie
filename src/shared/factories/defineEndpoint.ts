/**
 * @fileoverview Endpoint Builder Factory
 *
 * This module provides a factory function to define individual endpoints with
 * fetch and hook methods, using a shared endpoint group.
 */

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import type { FetchFunctionParams } from "./createFetchFunction";
import { createFetchFunction } from "./createFetchFunction";
import {
  createHookFunction,
  shouldUseCacheFlushDate,
} from "./createHookFunction";

/**
 * Configuration for defining an endpoint
 */
type EndpointConfig<I, O> = {
  /** The endpoint group this endpoint belongs to */
  group: {
    /** The API definition this group belongs to */
    api: ApiDefinition;
    /** The endpoint group descriptor */
    descriptor: EndpointGroup;
    collect: <I, O>(
      def: EndpointDefinition<I, O>,
      fn: string
    ) => { endpoint: Endpoint<I, O> };
  };
  /** The function name for this endpoint */
  functionName: string;
  /** The endpoint definition */
  definition: EndpointDefinition<I, O>;
};

/**
 * Result of defining an endpoint
 */
type EndpointResult<I, O> = {
  /** The endpoint descriptor for documentation */
  descriptor: Endpoint<I, O>;
  /** Fetch function for this endpoint */
  fetch: (params?: FetchFunctionParams<I>) => Promise<O>;
  /** React Query hook for this endpoint */
  useQuery: (
    params?: FetchFunctionParams<I>,
    options?: Record<string, unknown>
  ) => unknown;
};

/**
 * Defines an endpoint with fetch and hook methods
 *
 * This factory function creates an endpoint object with descriptor, fetch,
 * and useQuery methods. It uses the endpoint group's collect method
 * to register the endpoint for documentation generation.
 *
 * @param config - Configuration for endpoint
 * @returns An object with descriptor, fetch, and useQuery methods
 *
 * @example
 * ```typescript
 * const endpoint = defineEndpoint({
 *   group,
 *   functionName: "fetchVesselLocations",
 *   definition: {
 *     endpoint: "/vesselLocations",
 *     inputSchema: vesselLocationsInputSchema,
 *     outputSchema: vesselLocationSchema.array(),
 *   },
 * });
 * ```
 */
export function defineEndpoint<I, O>(
  config: EndpointConfig<I, O>
): EndpointResult<I, O> {
  const { endpoint } = config.group.collect(
    config.definition,
    config.functionName
  );

  const fetchFn = createFetchFunction<I, O>(endpoint);

  // Use the full API definition from the group
  const apiDefinition = config.group.api;

  // Determine if cache flush should be used based on API and cache strategy
  const useCacheFlush = shouldUseCacheFlushDate(
    apiDefinition.name,
    config.group.descriptor
  );

  const hookFn = createHookFunction<I, O>(
    apiDefinition,
    endpoint,
    fetchFn,
    useCacheFlush
  );

  return {
    descriptor: endpoint,
    fetch: fetchFn,
    useQuery: hookFn,
  } as const;
}
