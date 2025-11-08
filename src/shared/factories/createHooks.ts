/**
 * @fileoverview React Query Hooks Factory
 *
 * This module provides a utility function to create React Query hooks for all
 * endpoints in an endpoint group. It wraps fetch functions with React Query
 * hooks and optionally applies cache flush date invalidation for WSF APIs.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type {
  ApiDefinition,
  EndpointDefinition,
  EndpointGroup,
} from "@/apis/types";
import type { Endpoint } from "@/shared/types";
import { useQueryWithCacheFlushDate } from "./createCacheFlushDateHook";
import { createEndpoint } from "./createEndpoint";
import type { FetchFunctionParams } from "./createFetchFunctions";
import { cacheStrategies } from "./queryOptions";
import type { HooksMap } from "./types";

/**
 * Helper type to simplify query hook options.
 *
 * Excludes queryKey and queryFn which are handled internally by the factory.
 *
 * @template TData - The data type returned by the query
 */
export type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

/**
 * Determines if an endpoint should use cache flush date invalidation.
 *
 * Cache invalidation is only applied to endpoints with STATIC cache strategy
 * that belong to WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
 * and are NOT REALTIME endpoints.
 *
 * This is a pure predicate function that makes the decision based solely on
 * the API name and endpoint group properties.
 *
 * @param apiName - The name of the API (e.g., "wsf-vessels")
 * @param endpointGroup - The endpoint group containing cache strategy
 * @returns True if cache flush date invalidation should be used
 */
const shouldUseCacheFlushDate = (
  apiName: string,
  endpointGroup: EndpointGroup
): boolean => {
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(apiName);

  if (
    endpointGroup.name === "cache-flush-date" ||
    endpointGroup.name === "schedule-cache-flush-date"
  ) {
    return false;
  }

  return isWsfApi && endpointGroup.cacheStrategy === "STATIC";
};

/**
 * Converts endpoint function name to hook name.
 *
 * This is a pure function that transforms function names following the pattern:
 * - "fetchXyz" -> "useXyz"
 * - "xyz" -> "useXyz" (capitalized)
 *
 * @param functionName - The original function name (e.g., "fetchVesselStats")
 * @returns The corresponding hook name (e.g., "useVesselStats")
 */
const functionNameToHookName = (functionName: string): string => {
  return functionName.startsWith("fetch")
    ? `use${functionName.substring(5)}`
    : `use${functionName.charAt(0).toUpperCase() + functionName.slice(1)}`;
};

/**
 * Creates a typed hook function for an endpoint.
 *
 * This is a higher-order function that returns a React Query hook configured
 * for a specific endpoint. The hook selection (cache flush vs regular) is
 * determined at factory time to satisfy React's rules of hooks.
 *
 * @template TInput - The input parameters type for the endpoint
 * @template TOutput - The output response type for the endpoint
 * @param api - The API definition (needed for cache flush date lookup)
 * @param endpoint - The endpoint to create a hook for
 * @param fetchFunction - The fetch function to wrap with React Query
 * @param useCacheFlush - Whether to use cache flush date invalidation
 * @returns A React Query hook function for the endpoint
 */
const createHookFunction = <TInput, TOutput>(
  api: ApiDefinition,
  endpoint: Endpoint<TInput, TOutput>,
  fetchFunction: (params?: FetchFunctionParams<unknown>) => Promise<unknown>,
  useCacheFlush: boolean
): ((
  params?: FetchFunctionParams<TInput>,
  options?: QueryHookOptions<TOutput>
) => UseQueryResult<TOutput, Error>) => {
  const typedFetchFunction = fetchFunction as (
    params?: FetchFunctionParams<TInput>
  ) => Promise<TOutput>;

  if (useCacheFlush) {
    return (
      params?: FetchFunctionParams<TInput>,
      options?: QueryHookOptions<TOutput>
    ): UseQueryResult<TOutput, Error> => {
      return useQueryWithCacheFlushDate(
        api,
        endpoint,
        typedFetchFunction,
        params,
        options
      );
    };
  }

  return (
    params?: FetchFunctionParams<TInput>,
    options?: QueryHookOptions<TOutput>
  ): UseQueryResult<TOutput, Error> => {
    return useQuery({
      queryKey: [endpoint.id, params?.params ?? null],
      queryFn: () => typedFetchFunction(params),
      ...cacheStrategies[endpoint.cacheStrategy],
      refetchOnWindowFocus: false,
      ...options,
    });
  };
};

/**
 * Creates React Query hooks for all endpoints in an endpoint group.
 *
 * This function uses a functional approach to transform endpoint definitions
 * and fetch functions into a map of strongly-typed React Query hooks. It
 * processes each endpoint in the group and creates a corresponding hook.
 *
 * @template TApi - The API definition type (inferred from parameter)
 * @template TGroup - The endpoint group type (inferred from parameter)
 * @param api - The API definition containing base URL and name
 * @param endpointGroup - The endpoint group containing endpoints
 * @param fetchFunctions - Object containing fetch functions from *.fetch.ts
 * @returns An object containing React Query hooks for all endpoints in the group
 *
 * @throws {Error} If a fetch function is missing for an endpoint
 *
 * @example
 * ```typescript
 * const hooks = createHooks(
 *   wsdotBridgeClearancesApi,
 *   bridgeClearancesGroup,
 *   fetchFunctions
 * );
 * // hooks.useBridgeClearances is a typed React Query hook
 * ```
 */
export const createHooks = <
  TApi extends ApiDefinition,
  TGroup extends EndpointGroup,
>(
  api: TApi,
  endpointGroup: TGroup,
  fetchFunctions: Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
): HooksMap<TGroup> => {
  const useCacheFlush = shouldUseCacheFlushDate(api.name, endpointGroup);

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
      const fetchFunction = fetchFunctions[functionName];

      if (!fetchFunction) {
        throw new Error(
          `Fetch function "${functionName}" not found for endpoint "${functionName}"`
        );
      }

      const hookName = functionNameToHookName(functionName);
      const hookFunction = createHookFunction(
        api,
        endpoint as Endpoint<unknown, unknown>,
        fetchFunction,
        useCacheFlush
      );

      acc[hookName as keyof HooksMap<TGroup>] =
        hookFunction as HooksMap<TGroup>[keyof HooksMap<TGroup>];

      return acc;
    },
    {} as HooksMap<TGroup>
  );
};
