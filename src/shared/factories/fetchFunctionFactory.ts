/**
 * @fileoverview Fetch Function Factory
 *
 * This module provides a factory function to create strongly-typed fetch functions
 * for individual endpoints that use fetchDottie internally.
 */

import { fetchDottie } from "@/shared/fetching";
import type { FetchDottieParams } from "@/shared/fetching/types";
import type { Endpoint } from "@/shared/types";

/**
 * Parameters for fetch functions created by factory
 * This type omits endpoint property since it's provided from closure
 */
export type FetchFunctionParams<TInput> = Omit<
  FetchDottieParams<TInput>,
  "endpoint"
> & {
  /** Input parameters for endpoint */
  params?: TInput;
  /** Fetch strategy - how to fetch data (default: "native") */
  fetchMode?: "native" | "jsonp";
  /** Whether to validate input/output with Zod schemas (default: false) */
  validate?: boolean;
  /** Logging verbosity level (default: "none") */
  logMode?: "none" | "info" | "debug";
};

/**
 * Creates a strongly-typed fetch function for a specific endpoint
 *
 * This factory function generates a fetch function that is strongly-typed with
 * input and output types from endpoint. The function accepts a single params
 * object with endpoint parameters and optional fetch options.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - The endpoint to create a fetch function for
 * @returns A strongly-typed fetch function
 *
 * @example
 * ```typescript
 * import { createFetchFunction } from "@/shared/utils/fetchFunctionFactory";
 * import { vesselStatsEndpoint } from "./endpoints";
 *
 * const fetchVesselStats = createFetchFunction(vesselStatsEndpoint);
 *
 * // Use the fetch function
 * const data = await fetchVesselStats({
 *   params: { VesselID: 32 },
 *   fetchMode: "native",
 *   validate: true
 * });
 * ```
 */
export function createFetchFunction<TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>
): (params: FetchFunctionParams<TInput>) => Promise<TOutput> {
  return (params: FetchFunctionParams<TInput> = {}): Promise<TOutput> => {
    return fetchDottie({
      endpoint,
      ...params,
    });
  };
}
