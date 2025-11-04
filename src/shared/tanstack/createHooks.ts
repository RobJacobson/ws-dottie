/**
 * @fileoverview TanStack Query Hooks Factory
 *
 * This module provides a factory function that generates preconfigured TanStack Query hooks
 * for all endpoints in WS-Dottie API. It supports both regular hooks and
 * cache-invalidated hooks for static data endpoints, with proper TypeScript generics and
 * tree-shaking friendly exports.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { endpoints } from "@/shared/endpoints";
import { fetchDottie } from "@/shared/fetching";
import type { Endpoint } from "@/shared/types";
import { cacheStrategies } from "./queryOptions";

/**
 * Type for determining if an endpoint requires cache invalidation
 */
type RequiresCacheInvalidation<TInput, TOutput> = boolean;

/**
 * Determines if an endpoint should use cache invalidation
 *
 * Cache invalidation is only applied to endpoints with STATIC cache strategy
 * that belong to WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
 *
 * @param endpoint - The endpoint to check
 * @returns Whether cache invalidation should be used
 */
function shouldUseCacheInvalidation(
  endpoint: Endpoint<unknown, unknown>
): boolean {
  // Extract API name from endpoint ID (format: "api-name:functionName")
  const apiName = endpoint.id.split(":")[0] as string;

  // Check if it's a WSF API
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(apiName);

  // Only use cache invalidation for WSF APIs with STATIC cache strategy
  return isWsfApi && endpoint.cacheStrategy === "STATIC";
}

/**
 * Custom hook that handles both regular queries and cache invalidated queries
 * This ensures we follow the Rule of Hooks by always calling the same hooks
 */
const useQueryWithOptionalCacheInvalidation = <TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">,
  useCacheInvalidationFlag?: boolean
) => {
  const queryClient = useQueryClient();

  // Extract API name from endpoint ID (format: "api-name:functionName")
  const apiName = endpoint.id.split(":")[0];

  // Check if this API supports cache invalidation
  const isWsfApi = [
    "wsf-fares",
    "wsf-schedule",
    "wsf-terminals",
    "wsf-vessels",
  ].includes(apiName);

  // Only use cache invalidation for WSF APIs with STATIC cache strategy
  const shouldUseCacheInvalidation =
    useCacheInvalidationFlag && isWsfApi && endpoint.cacheStrategy === "STATIC";

  // Get the cache flush endpoint if needed
  const cacheFlushEndpoint = shouldUseCacheInvalidation
    ? (() => {
        const endpointId = `${apiName}:getCacheFlushDate`;
        const endpoint = endpoints.find((e) => e.id === endpointId) as
          | Endpoint<unknown, Date>
          | undefined;

        if (!endpoint) {
          throw new Error(`Cache flush endpoint not found for API: ${apiName}`);
        }

        return endpoint;
      })()
    : null;

  // Create a unique key for storing the last flush date in localStorage
  const flushDateKey =
    shouldUseCacheInvalidation && cacheFlushEndpoint
      ? `${endpoint.id}-flushDate`
      : null;

  // Query to poll the cacheFlushDate endpoint (only if needed)
  const flushDateQuery = useQuery({
    queryKey: cacheFlushEndpoint ? [cacheFlushEndpoint.id] : ["no-cache-flush"],
    queryFn: cacheFlushEndpoint
      ? () => fetchDottie({ endpoint: cacheFlushEndpoint })
      : () => Promise.resolve(null),
    enabled: shouldUseCacheInvalidation && !!cacheFlushEndpoint,
    refetchInterval: shouldUseCacheInvalidation ? 5 * 60 * 1000 : undefined, // 5 minutes
    staleTime: shouldUseCacheInvalidation ? 5 * 60 * 1000 : undefined,
    refetchOnWindowFocus: false,
  });

  // Effect to handle cache invalidation when flush date changes
  useEffect(() => {
    if (shouldUseCacheInvalidation && flushDateQuery.data && flushDateKey) {
      const lastFlushDate = localStorage.getItem(flushDateKey);
      const currentFlushDate =
        flushDateQuery.data instanceof Date
          ? flushDateQuery.data.toISOString()
          : String(flushDateQuery.data);

      // If flush date has changed, invalidate the data query
      if (currentFlushDate !== lastFlushDate) {
        queryClient.invalidateQueries({ queryKey: [endpoint.id] });
        localStorage.setItem(flushDateKey, currentFlushDate);
      }
    }
  }, [
    flushDateQuery.data,
    queryClient,
    endpoint.id,
    flushDateKey,
    shouldUseCacheInvalidation,
  ]);

  // Return the data query with appropriate cache strategy
  return useQuery({
    queryKey: [endpoint.id, params],
    queryFn: () => fetchDottie({ endpoint, params }),
    // Use FREQUENT strategy for data that has cacheFlushDate, otherwise use endpoint strategy
    ...(shouldUseCacheInvalidation
      ? cacheStrategies.FREQUENT
      : cacheStrategies[endpoint.cacheStrategy]),
    refetchOnWindowFocus: false,
    ...options,
  });
};

/**
 * Creates a TanStack Query hook for a given endpoint
 *
 * This factory function generates a preconfigured TanStack Query hook that wraps
 * fetchDottie function with proper query keys and cache strategies.
 * For static WSF endpoints, it automatically uses cache invalidation.
 *
 * @template TInput - The input parameters type for endpoint
 * @template TOutput - The output response type for endpoint
 * @param endpoint - The endpoint to create a hook for
 * @param params - Parameters to pass to the endpoint
 * @param options - Additional options for hook creation
 * @returns A React hook that can be used in components
 * @example
 * ```typescript
 * // Create a regular hook
 * const useBridgeClearances = createHook(getBridgeClearancesEndpoint, {});
 *
 * // Create a hook with automatic cache invalidation
 * const useVesselBasics = createHook(getVesselBasicsEndpoint, {});
 * ```
 */
export function createHook<TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: {
    /** Whether to use cache invalidation (overrides automatic detection) */
    useCacheInvalidation?: RequiresCacheInvalidation<TInput, TOutput>;
    /** Additional query options to pass to the underlying hook */
    queryOptions?: Omit<UseQueryOptions<TOutput>, "queryKey" | "queryFn">;
  }
) {
  // Determine if cache invalidation should be used
  const useCacheInvalidationFlag =
    options?.useCacheInvalidation ?? shouldUseCacheInvalidation(endpoint);

  // For endpoints with empty input schema, make params optional
  const hasEmptyInput =
    endpoint.inputSchema.safeParse({}).success &&
    Object.keys(endpoint.inputSchema.safeParse({}).data || {}).length === 0;
  const finalParams = hasEmptyInput ? undefined : params;

  // Prepare query options
  const baseQueryOptions = {
    // Don't refetch on window focus to avoid unnecessary requests
    refetchOnWindowFocus: false,
    // Merge with provided options
    ...options?.queryOptions,
  };

  // Always call our custom hook which handles both cases internally
  return useQueryWithOptionalCacheInvalidation(
    endpoint,
    finalParams,
    baseQueryOptions,
    useCacheInvalidationFlag
  );
}

/**
 * Creates multiple hooks from an array of endpoints
 *
 * This utility function creates hooks for multiple endpoints at once,
 * which is useful for generating all hooks for an API group.
 *
 * @param endpoints - Array of endpoints to create hooks for
 * @param options - Default options for all hooks
 * @returns Object with hook functions keyed by endpoint function name
 * @example
 * ```typescript
 * const hooks = createHooksForEndpoints([
 *   getBridgeClearancesEndpoint,
 *   getBridgeClearancesByRouteEndpoint
 * ]);
 *
 * // Use the hooks
 * const { data: clearances } = hooks.getBridgeClearances({});
 * const { data: routeClearances } = hooks.getBridgeClearancesByRoute({ Route: "005" });
 * ```
 */
export function createHooksForEndpoints(
  endpoints: Endpoint<unknown, unknown>[],
  options?: {
    /** Whether to use cache invalidation (overrides automatic detection) */
    useCacheInvalidation?: boolean;
    /** Additional query options to pass to all hooks */
    queryOptions?: Omit<UseQueryOptions<unknown>, "queryKey" | "queryFn">;
  }
) {
  const hooks: Record<
    string,
    (params?: unknown) => ReturnType<typeof createHook>
  > = {};

  for (const endpoint of endpoints) {
    // Extract function name from endpoint ID (format: "api-name:functionName")
    const functionName = endpoint.id.split(":")[1];

    // Convert to camelCase hook name (e.g., "getBridgeClearances" -> "useBridgeClearances")
    const hookName = `use${functionName.charAt(0).toUpperCase() + functionName.slice(1)}`;

    // Check if endpoint has empty input schema
    const hasEmptyInput =
      endpoint.inputSchema.safeParse({}).success &&
      Object.keys(endpoint.inputSchema.safeParse({}).data || {}).length === 0;

    // Create a hook with appropriate options
    hooks[hookName] = (params?: unknown) => {
      // For endpoints with empty input schema, make params optional
      const finalParams = hasEmptyInput ? undefined : params;
      
      return createHook(endpoint, finalParams, {
        useCacheInvalidation: options?.useCacheInvalidation,
        queryOptions: options?.queryOptions,
      });
    };
  }

  return hooks;
}
