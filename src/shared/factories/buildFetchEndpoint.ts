/**
 * @fileoverview Fetch Endpoint Builder
 *
 * Builds minimal fetch endpoint objects from metadata objects.
 * Only includes fields necessary for fetching operations.
 */

import type { ApiMeta, EndpointMeta } from "@/apis/types";
import type { FetchEndpoint } from "@/shared/types";

/**
 * Builds a minimal fetch endpoint from metadata objects
 *
 * Returns only the fields necessary for fetching operations,
 * excluding housekeeping metadata used by hooks and other system components.
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param api - API metadata containing base URL
 * @param endpoint - Endpoint metadata containing path and schemas
 * @returns A FetchEndpoint object with urlTemplate, endpoint path, and optional schemas
 */
export function buildFetchEndpoint<I, O>(
  api: ApiMeta,
  endpoint: EndpointMeta<I, O>
): FetchEndpoint<I, O> {
  return {
    urlTemplate: `${api.baseUrl}${endpoint.endpoint}`,
    endpoint: endpoint.endpoint,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
  };
}
