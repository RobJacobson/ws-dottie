/**
 * @fileoverview Fetch Function Factory
 *
 * This module provides a factory function to create strongly-typed fetch functions
 * for individual endpoints. It combines endpoint configuration with fetchDottie
 * to provide type-safe API calls.
 */

import { fetchDottie } from "@/shared/fetching";
import type { FetchDottieParams } from "@/shared/fetching/types";
import type { Endpoint } from "@/shared/types";

/**
 * Parameters for fetch functions created by factory.
 *
 * This type extends FetchDottieParams but omits endpoint property since
 * it's provided from closure when fetch function is created.
 *
 * @template TInput - The input parameters type for endpoint
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
