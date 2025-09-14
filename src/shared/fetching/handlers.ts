/**
 * @fileoverview Independent handler functions for endpoint fetching
 *
 * This module provides independent functions that take an Endpoint as a parameter,
 * implementing the dependency inversion principle. This makes the code more modular,
 * testable, and flexible.
 */

import { fetchZod } from "./fetchZod";
import { fetchNative } from "./execution/fetchNative";
import { buildApiUrl } from "./urlBuilder";
import { createQueryOptions } from "../tanstack/factory";
import type { Endpoint, CacheStrategy } from "../endpoints";

/**
 * Fetches data using Zod validation and full pipeline
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param endpoint - The endpoint definition
 * @param params - Parameters to send with the request
 * @returns Promise resolving to validated response data
 */
export const fetchWithZod = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: I
): Promise<O> => {
  return fetchZod({
    endpoint: endpoint.endpoint,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    params,
  });
};

/**
 * Fetches data using direct native fetch without validation
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param endpoint - The endpoint definition
 * @param params - Parameters to send with the request
 * @returns Promise resolving to raw response data
 */
export const fetchPlain = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: I
): Promise<O> => {
  const url = buildApiUrl(endpoint.urlTemplate, params, endpoint.inputSchema);
  const responseString = await fetchNative(url);
  const responseData = JSON.parse(responseString);
  return responseData as O;
};

/**
 * Creates TanStack Query options for an endpoint
 *
 * @template I - The input parameters type
 * @template O - The output response type
 * @param endpoint - The endpoint definition
 * @returns Function that creates query options for given parameters
 */
export const createEndpointQueryOptions = <I, O>(endpoint: Endpoint<I, O>) => {
  return (_params: I) =>
    createQueryOptions({
      apiFunction: (p: I) => fetchWithZod(endpoint, p),
      queryKey: [endpoint.id],
      cacheStrategy: endpoint.cacheStrategy as CacheStrategy,
    });
};
