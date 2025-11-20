/**
 * @fileoverview Fetch Function Factory
 *
 * Creates strongly-typed fetch functions from metadata objects.
 * This is a pure factory with no React Query dependencies.
 */

import type { ApiMeta, EndpointMeta } from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import { buildFetchEndpoint } from "./buildFetchEndpoint";
import type { FetchFactory, FetchFunctionParams } from "./types";

/**
 * Creates a strongly-typed fetch function from metadata objects
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param params - Configuration object containing API and endpoint metadata
 * @param params.api - API metadata containing base URL and configuration
 * @param params.endpoint - Endpoint metadata containing path, schemas, and function name
 * @returns A fetch function that accepts optional parameters and returns a Promise resolving to the output type
 */
export function createFetchFunction<I, O>(params: {
  api: ApiMeta;
  endpoint: EndpointMeta<I, O>;
}): FetchFactory<I, O> {
  const fetchEndpoint = buildFetchEndpoint(params.api, params.endpoint);

  return (params?: FetchFunctionParams<I>): Promise<O> =>
    fetchDottie<I, O>({
      endpoint: fetchEndpoint,
      ...params,
    });
}
