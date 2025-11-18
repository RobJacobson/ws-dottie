/**
 * @fileoverview Metadata-Driven Endpoint Factory
 *
 * This module provides factory functions for creating fetch functions and React
 * hooks from three separate metadata objects: API metadata, endpoint group
 * metadata, and endpoint-specific metadata. This metadata-driven approach
 * provides a clean separation of concerns and enables better type safety.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiMeta, EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { createHookFunction } from "./createHookFunction";
import type {
  EndpointConfig,
  FetchFunctionParams,
  QueryHookOptions,
} from "./types";

/**
 * Builds a complete endpoint descriptor from three metadata objects.
 *
 * This internal helper constructs an Endpoint<I, O> (for registry/docs compatibility) by
 * combining:
 * - API metadata (name, baseUrl)
 * - Endpoint group metadata (cache strategy, documentation)
 * - Endpoint-specific metadata (function name, endpoint path, schemas, etc.)
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param api - API metadata
 * @param group - Endpoint group metadata
 * @param meta - Endpoint-specific metadata
 * @returns Complete endpoint descriptor for registry and documentation
 */
export function buildDescriptor<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  meta: EndpointMeta<I, O>
): Endpoint<I, O> {
  return {
    api,
    endpoint: meta.endpoint,
    functionName: meta.functionName,
    inputSchema: meta.inputSchema,
    outputSchema: meta.outputSchema,
    // EndpointMeta uses Partial<I> for sampleParams, which matches Endpoint
    sampleParams: meta.sampleParams,
    endpointDescription: meta.endpointDescription,
    cacheStrategy: group.cacheStrategy,
    urlTemplate: `${api.baseUrl}${meta.endpoint}`,
    id: `${api.name}:${meta.functionName}`,
  };
}

/**
 * Builds an EndpointConfig from three metadata objects for internal use.
 *
 * This is used by createFetchFunction and createHook to create EndpointConfig
 * objects that include the group property needed for hook factory compatibility.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param api - API metadata
 * @param group - Endpoint group metadata
 * @param meta - Endpoint-specific metadata
 * @returns EndpointConfig for internal factory use
 */
function buildEndpointConfig<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  meta: EndpointMeta<I, O>
): EndpointConfig<I, O> {
  return {
    api,
    group,
    endpoint: meta.endpoint,
    functionName: meta.functionName,
    inputSchema: meta.inputSchema,
    outputSchema: meta.outputSchema,
    // EndpointMeta uses Partial<I> for sampleParams, but EndpointConfig expects I
    // This is safe because sampleParams are only used for examples/documentation
    sampleParams: meta.sampleParams as I | (() => Promise<I>) | undefined,
    endpointDescription: meta.endpointDescription,
    cacheStrategy: group.cacheStrategy,
    urlTemplate: `${api.baseUrl}${meta.endpoint}`,
    id: `${api.name}:${meta.functionName}`,
  };
}

/**
 * Creates a strongly-typed fetch function from three metadata objects.
 *
 * This factory function takes API metadata, endpoint group metadata, and
 * endpoint-specific metadata, and returns a fetch function that can be used
 * to retrieve data from the endpoint.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param api - API metadata (name, baseUrl)
 * @param group - Endpoint group metadata (cache strategy, documentation)
 * @param meta - Endpoint-specific metadata (function name, endpoint path, schemas)
 * @returns A typed fetch function that accepts FetchFunctionParams and returns Promise<O>
 *
 * @example
 * ```typescript
 * const fetchVesselsVerbose = createFetchFunction(
 *   apis.wsfVessels,
 *   vesselVerboseGroup,
 *   vesselsVerboseMeta
 * );
 *
 * const data = await fetchVesselsVerbose({
 *   fetchMode: 'native',
 *   validate: true
 * });
 * ```
 */
export function createFetchFunction<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  meta: EndpointMeta<I, O>
): (params?: FetchFunctionParams<I>) => Promise<O> {
  const descriptor = buildDescriptor(api, group, meta);

  return (params?: FetchFunctionParams<I>): Promise<O> => {
    return fetchDottie<I, O>({
      endpoint: descriptor,
      ...params,
    });
  };
}

/**
 * Creates a strongly-typed React Query hook from three metadata objects.
 *
 * This factory function takes API metadata, endpoint group metadata, and
 * endpoint-specific metadata, and returns a React Query hook that wraps a
 * fetch function. The hook includes appropriate caching strategies and
 * cache flush date invalidation for WSF APIs when applicable.
 *
 * @template I - Input type for endpoint
 * @template O - Output type for endpoint
 * @param api - API metadata (name, baseUrl)
 * @param group - Endpoint group metadata (cache strategy, documentation)
 * @param meta - Endpoint-specific metadata (function name, endpoint path, schemas)
 * @returns A React Query hook function that accepts FetchFunctionParams and optional QueryHookOptions
 *
 * @example
 * ```typescript
 * const useVesselsVerbose = createHook(
 *   apis.wsfVessels,
 *   vesselVerboseGroup,
 *   vesselsVerboseMeta
 * );
 *
 * function MyComponent() {
 *   const { data, isLoading } = useVesselsVerbose({
 *     fetchMode: 'native',
 *     validate: true
 *   });
 *   // ...
 * }
 * ```
 */
export function createHook<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  meta: EndpointMeta<I, O>
): (
  params?: FetchFunctionParams<I>,
  options?: QueryHookOptions<O>
) => UseQueryResult<O, Error> {
  const config = buildEndpointConfig(api, group, meta);
  const descriptor = buildDescriptor(api, group, meta);

  // Create the fetch function that the hook will wrap
  const fetchFn = (params?: FetchFunctionParams<I>): Promise<O> => {
    return fetchDottie<I, O>({
      endpoint: descriptor,
      ...params,
    });
  };

  // Wrap with createHookFunction to preserve existing cache strategy and
  // cache flush date invalidation behavior
  return createHookFunction<I, O>(config, fetchFn);
}
