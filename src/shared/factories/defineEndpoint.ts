/**
 * @fileoverview Endpoint Builder Factory
 *
 * This module provides a factory function to define individual endpoints with
 * fetch and hook methods, using a shared endpoint group.
 */

import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import { createEndpoint } from "./createEndpoint";
import type { FetchFunctionParams } from "./createFetchFunction";
import { createFetchFunction } from "./createFetchFunction";
import {
  createHookFunction,
  shouldUseCacheFlushDate,
} from "./createHookFunction";

/**
 * Configuration for defining an endpoint
 */
export type DefineEndpointConfig<I, O> = {
  /** The API name (e.g., "wsf-vessels") */
  apiName: string;
  /** The base URL for the API */
  baseUrl: string;
  /** The endpoint group this endpoint belongs to */
  group: EndpointGroup;
  /** The function name for this endpoint */
  functionName: string;
  /** The endpoint path (truncated, e.g., "/vesselLocations") */
  endpoint: string;
  /** Zod schema for input validation (optional) */
  inputSchema?: EndpointDefinition<I, O>["inputSchema"];
  /** Zod schema for output validation (optional) */
  outputSchema?: EndpointDefinition<I, O>["outputSchema"];
  /** Optional sample parameters for testing */
  sampleParams?: EndpointDefinition<I, O>["sampleParams"];
  /** One-sentence description of what this specific endpoint does */
  endpointDescription?: string;
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
 * and useQuery methods. It builds the endpoint descriptor directly without
 * using group.collect.
 *
 * @param config - Configuration for endpoint
 * @returns An object with descriptor, fetch, and useQuery methods
 *
 * @example
 * ```typescript
 * const endpoint = defineEndpoint({
 *   apiName: wsfVesselsApi.name,
 *   baseUrl: wsfVesselsApi.baseUrl,
 *   group: vesselLocationsGroup,
 *   functionName: "fetchVesselLocations",
 *   endpoint: "/vesselLocations",
 *   inputSchema: vesselLocationsInputSchema,
 *   outputSchema: vesselLocationSchema.array(),
 * });
 * ```
 */
export function defineEndpoint<I, O>(
  config: DefineEndpointConfig<I, O>
): EndpointResult<I, O> {
  // Build endpoint definition from config
  const endpointDef: EndpointDefinition<I, O> = {
    endpoint: config.endpoint,
    inputSchema: config.inputSchema,
    outputSchema: config.outputSchema,
    sampleParams: config.sampleParams,
    endpointDescription: config.endpointDescription,
  };

  // Create a temporary ApiDefinition object for createEndpoint
  // (createEndpoint expects ApiDefinition but we only need name and baseUrl)
  const apiDefinition = {
    name: config.apiName,
    baseUrl: config.baseUrl,
    endpointGroups: [],
  };

  // Build endpoint descriptor using createEndpoint helper
  const endpoint = createEndpoint<I, O>(
    apiDefinition,
    config.group,
    endpointDef,
    config.functionName
  );

  const fetchFn = createFetchFunction<I, O>(endpoint);

  // Determine if cache flush should be used based on API and cache strategy
  const useCacheFlush = shouldUseCacheFlushDate(config.apiName, config.group);

  const hookFn = createHookFunction<I, O>(
    config.apiName,
    config.baseUrl,
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
