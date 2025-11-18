/**
 * @fileoverview Fetch Function Factory
 *
 * Creates strongly-typed fetch functions from metadata objects.
 * This is a pure factory with no React Query dependencies.
 */

import type { ApiMeta, EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import type { FetchFunctionParams } from "./types";

/**
 * Builds a complete endpoint descriptor from three metadata objects.
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
    sampleParams: meta.sampleParams,
    endpointDescription: meta.endpointDescription,
    cacheStrategy: group.cacheStrategy,
    urlTemplate: `${api.baseUrl}${meta.endpoint}`,
    id: `${api.name}:${meta.functionName}`,
  };
}

/**
 * Creates a strongly-typed fetch function from three metadata objects.
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
