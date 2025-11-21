/**
 * @fileoverview Endpoint Registry
 *
 * This module provides a centralized registry of all endpoints from the new
 * API structure. It automatically discovers all endpoints by iterating through
 * the API graph: apis -> endpointGroups -> endpoints, creating a flat array of
 * Endpoint objects for CLI and e2e test consumption.
 *
 * IMPORTANT: This module imports zod-openapi-init FIRST to ensure Zod schemas
 * have `.openapi()` method available before any API modules are imported.
 */

// Import Zod OpenAPI initialization FIRST, before any schema creation
// This ensures all schemas imported from API modules have .openapi() method
import "@/shared/zod";
import { apis } from "@/apis/shared/apis";
import type { ApiMeta, EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import type { Endpoint } from "./types";

/**
 * All endpoints from all APIs as a flat array
 *
 * This array contains all endpoints from all APIs flattened into a single
 * array for easy iteration and processing by CLI and e2e tests.
 * Endpoints are automatically discovered by iterating through the API graph:
 * apis -> endpointGroups -> endpoints.
 */
export const endpoints: Endpoint<unknown, unknown>[] = Object.values(
  apis
).flatMap((apiDefinition) =>
  apiDefinition.endpointGroups.flatMap((group) =>
    group.endpoints.map((endpoint) =>
      buildDescriptor(apiDefinition.api, group, endpoint)
    )
  )
);

/**
 * Builds a complete endpoint descriptor from metadata objects
 *
 * Combines API, group, and endpoint metadata into a single descriptor
 * with computed properties like urlTemplate and id.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param api - API metadata containing base URL and name
 * @param group - Endpoint group metadata containing cache strategy
 * @param endpoint - Endpoint metadata containing path, schemas, and function name
 * @returns A complete Endpoint object with all metadata and computed properties
 */
function buildDescriptor<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): Endpoint<I, O> {
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

// Re-export apis from the single source of truth for backward compatibility
export { apis } from "@/apis/shared/apis";
