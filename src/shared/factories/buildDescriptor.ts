/**
 * @fileoverview Endpoint Descriptor Builder
 *
 * Builds complete endpoint descriptors from metadata objects.
 * Combines API, group, and endpoint metadata into a single descriptor.
 */

import type {
  ApiDefinition,
  EndpointGroupMeta,
  EndpointMeta,
} from "@/apis/types";
import type { Endpoint } from "@/shared/types";

/**
 * Builds a complete endpoint descriptor from three metadata objects.
 */
export function buildDescriptor<I, O>(
  apiDefinition: ApiDefinition,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): Endpoint<I, O> {
  const api = apiDefinition.api;
  return {
    api,
    group,
    endpoint: endpoint.endpoint,
    functionName: endpoint.functionName,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    sampleParams: endpoint.sampleParams,
    endpointDescription: endpoint.endpointDescription,
    cacheStrategy: group.cacheStrategy,
    urlTemplate: `${api.baseUrl}${endpoint.endpoint}`,
    id: `${api.name}:${endpoint.functionName}`,
  };
}
