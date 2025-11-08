/**
 * @fileoverview Fetch Functions Factory
 *
 * This module provides factory functions to create strongly-typed fetch functions
 * for endpoints. It combines single endpoint and endpoint group functionality.
 */

import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import { fetchDottie } from "@/shared/fetching";
import type { FetchDottieParams } from "@/shared/fetching/types";
import type { Endpoint } from "@/shared/types";
import { createEndpoint } from "./createEndpoint";
import type { FetchFunctionsMap } from "./types";

/**
 * Parameters for fetch functions created by factory.
 *
 * This type extends FetchDottieParams but omits the endpoint property since
 * it's provided from closure when the fetch function is created.
 *
 * @template TInput - The input parameters type for the endpoint
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
 * @template TInput - The input parameters type for the endpoint
 * @template TOutput - The output response type for the endpoint
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

/**
 * Creates fetch functions for all endpoints in an endpoint group.
 *
 * This function uses a functional approach to transform endpoint definitions
 * into a map of strongly-typed fetch functions. It processes each endpoint
 * in the group and creates a corresponding fetch function.
 *
 * @template TApi - The API definition type (inferred from parameter)
 * @template TGroup - The endpoint group type (inferred from parameter)
 * @param api - The API definition containing base URL and name
 * @param endpointGroup - The endpoint group containing endpoints
 * @returns An object containing fetch functions for all endpoints in the group
 *
 * @example
 * ```typescript
 * const fetchFunctions = createFetchFunctions(
 *   wsdotBridgeClearancesApi,
 *   bridgeClearancesGroup
 * );
 * // fetchFunctions.fetchBridgeClearances is a typed fetch function
 * ```
 */
export const createFetchFunctions = <
  TApi extends ApiDefinition,
  TGroup extends EndpointGroup,
>(
  api: TApi,
  endpointGroup: TGroup
): FetchFunctionsMap<TGroup> => {
  return Object.entries(endpointGroup.endpoints).reduce(
    (acc, [functionName, endpointDef]) => {
      const typedEndpointDef = endpointDef as EndpointDefinition<
        unknown,
        unknown
      >;
      const endpoint = createEndpoint(
        api,
        endpointGroup,
        typedEndpointDef,
        functionName
      );
      const fetchFunction = createFetchFunction(endpoint);

      acc[functionName as keyof FetchFunctionsMap<TGroup>] =
        fetchFunction as FetchFunctionsMap<TGroup>[keyof FetchFunctionsMap<TGroup>];

      return acc;
    },
    {} as FetchFunctionsMap<TGroup>
  );
};
