/**
 * @fileoverview Fetch Function Factory
 *
 * This module provides a factory function to create strongly-typed fetch functions
 * for individual endpoints. It combines endpoint configuration with fetchDottie
 * to provide type-safe API calls.
 */

import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import type { FetchFunctionParams } from "./types";

/**
 * Creates a strongly-typed fetch function for a specific endpoint.
 *
 * This is a higher-order function that returns a configured fetch function
 * bound to a specific endpoint. The returned function accepts optional
 * parameters and fetch options.
 *
 * @template TInput - The input parameters type for endpoint
 * @template TOutput - The output response type for endpoint
 * @param endpoint - The endpoint to create a fetch function for
 * @returns A strongly-typed fetch function that accepts params and options
 *
 * @example
 * ```typescript
 * const fetchVesselStats = createFetchFunction(vesselStatsEndpoint);
 * const data = await fetchVesselStats({
 *   params: { VesselID: 32 },
 *   fetchMode: "native",
 *   validate: true
 * });
 * ```
 */
export const createFetchFunction = <TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>
): ((params?: FetchFunctionParams<TInput>) => Promise<TOutput>) => {
  return (params: FetchFunctionParams<TInput> = {}): Promise<TOutput> => {
    return fetchDottie({
      endpoint,
      ...params,
    });
  };
};
