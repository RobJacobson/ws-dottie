/**
 * @fileoverview Create Endpoint Group Hooks Utility
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
import { cacheStrategies } from "@/shared/tanstack/queryOptions";
import type { Endpoint } from "@/shared/types";
import { useQueryWithCacheFlushDate } from "./cacheFlushDateWrapper";
import { createEndpoint } from "./createEndpoint";
import type { FetchFunctionParams } from "./fetchFunctionFactory";

/**
 * Helper type to simplify query hook options
 * Excludes queryKey and queryFn which are handled internally
 */
export type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

/**
 * Determines if an endpoint should use cache flush date invalidation
 *
 * Cache invalidation is only applied to endpoints with STATIC cache strategy
 * that belong to WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
 * and are NOT REALTIME endpoints (e.g., VesselLocations).
 *
 * @param apiName - The API name
 * @param endpointGroup - The endpoint group
 * @param endpointDef - The endpoint definition
 * @returns Whether cache invalidation should be used
 */
function shouldUseCacheFlushDate(
  apiName: string,
  endpointGroup: EndpointGroup,
  _endpointDef: EndpointDefinition<unknown, unknown>
): boolean {
  // Check if it's a WSF API
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(apiName);

  // Don't use cache flush for the cache flush date endpoint itself
  if (
    endpointGroup.name === "cache-flush-date" ||
    endpointGroup.name === "schedule-cache-flush-date"
  ) {
    return false;
  }

  // Only use cache invalidation for WSF APIs with STATIC cache strategy
  // and NOT for REALTIME endpoints (check group cache strategy)
  return isWsfApi && endpointGroup.cacheStrategy === "STATIC";
}

/**
 * Creates React Query hooks for all endpoints in an endpoint group
 *
 * This utility function iterates through all endpoints in an endpoint group,
 * creates typed Endpoint objects, and generates React Query hooks that wrap
 * the provided fetch functions. It converts "fetchXyz" function names to
 * "useXyz" hook names for consistency.
 *
 * @template TApi - The API definition type (inferred from parameter)
 * @template TGroup - The endpoint group type (inferred from parameter)
 * @param api - The API definition containing base URL and name
 * @param endpointGroup - The endpoint group containing endpoints
 * @param fetchFunctions - Object containing fetch functions from *.fetch.ts
 * @returns An object containing React Query hooks for all endpoints in the group
 *
 * @example
 * ```typescript
 * import { wsdotBridgeClearancesApi } from "../apiDefinition";
 * import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
 * import * as fetchFunctions from "./bridgeClearances.fetch";
 *
 * const hooks = createEndpointGroupHooks(
 *   wsdotBridgeClearancesApi,
 *   bridgeClearancesGroup,
 *   fetchFunctions
 * );
 * // hooks.useBridgeClearances is a typed React Query hook
 * ```
 */
export function createEndpointGroupHooks<
  TApi extends ApiDefinition,
  TGroup extends EndpointGroup,
>(
  api: TApi,
  endpointGroup: TGroup,
  // Using unknown here is necessary because fetch functions have different input/output types
  // per endpoint. The type safety is restored via type assertions in the hook files.
  // unknown is safer than any as it requires explicit type checking before use.
  fetchFunctions: Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
): Record<string, unknown> {
  const hooks: Record<string, unknown> = {};

  // Process each endpoint in the group
  for (const [_, endpointDef] of Object.entries(endpointGroup.endpoints)) {
    // Type assertion: endpointDef is EndpointDefinition<unknown, unknown>
    const typedEndpointDef = endpointDef as EndpointDefinition<
      unknown,
      unknown
    >;
    // Create a typed endpoint object
    const endpoint = createEndpoint(api, endpointGroup, typedEndpointDef);
    const functionName = typedEndpointDef.function;

    // Convert "getXyz" to "fetchXyz" to match fetch function names
    const fetchFunctionName = functionName.startsWith("get")
      ? `fetch${functionName.substring(3)}`
      : functionName;

    // Get the fetch function
    const fetchFunction = fetchFunctions[fetchFunctionName];
    if (!fetchFunction) {
      throw new Error(
        `Fetch function "${fetchFunctionName}" not found for endpoint "${functionName}"`
      );
    }

    // Convert "fetchXyz" to "useXyz" for hook name
    const hookName = fetchFunctionName.startsWith("fetch")
      ? `use${fetchFunctionName.substring(5)}`
      : `use${fetchFunctionName.charAt(0).toUpperCase() + fetchFunctionName.slice(1)}`;

    // Determine if we should use cache flush date invalidation
    const useCacheFlush = shouldUseCacheFlushDate(
      api.name,
      endpointGroup,
      typedEndpointDef
    );

    // Create the hook
    if (useCacheFlush) {
      // Hook with cache flush date wrapper
      hooks[hookName] = <TInput, TOutput>(
        params?: TInput,
        options?: QueryHookOptions<TOutput>
      ): UseQueryResult<TOutput, Error> => {
        return useQueryWithCacheFlushDate(
          api,
          endpointGroup,
          endpoint as Endpoint<TInput, TOutput>,
          (fetchParams?: { params?: TInput }) => {
            return fetchFunction({
              params: fetchParams?.params,
            } as FetchFunctionParams<TInput>) as Promise<TOutput>;
          },
          params,
          options
        );
      };
    } else {
      // Regular hook without cache flush date
      hooks[hookName] = <TInput, TOutput>(
        params?: TInput,
        options?: QueryHookOptions<TOutput>
      ): UseQueryResult<TOutput, Error> => {
        return useQuery({
          queryKey: [endpoint.id, params],
          queryFn: () =>
            fetchFunction({
              params,
            } as FetchFunctionParams<TInput>) as Promise<TOutput>,
          ...cacheStrategies[endpoint.cacheStrategy],
          refetchOnWindowFocus: false,
          ...options,
        });
      };
    }
  }

  return hooks;
}
