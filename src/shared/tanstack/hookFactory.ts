import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "./queryOptions";
import type { TanStackOptions } from "./types";

// ============================================================================
// ENHANCED HOOK FACTORY
// ============================================================================

/**
 * Configuration for creating API hooks with automatic type inference
 */
export interface ApiHookConfig<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
> {
  /** The API function to call */
  apiFn: TApiFn;
  /** Query key prefix (e.g., ["wsdot", "highway-alerts"]) */
  queryKeyPrefix: readonly unknown[];
  /** Optional function to generate dynamic query keys */
  getQueryKey?: (params: TParams) => readonly unknown[];
  /** Optional function to determine if query should be enabled */
  getEnabled?: (params: TParams) => boolean;
  /** Default query options to merge */
  defaultOptions?: TanStackOptions<Awaited<ReturnType<TApiFn>>>;
  /** Whether this is a WSF API that needs auto-update functionality */
  useAutoUpdate?: boolean;
  /** Cache flush function for WSF APIs */
  getCacheFlushDate?: () => Promise<Date | null>;
  /** Whether to use JSON.stringify for query key (default: true) */
  useJsonStringify?: boolean;
}

/**
 * Creates a properly typed React Query hook with minimal boilerplate
 *
 * @example
 * ```typescript
 * // For WSDOT APIs (regular useQuery)
 * export const useHighwayAlerts = createApiHook({
 *   apiFn: getHighwayAlerts,
 *   queryKeyPrefix: ["wsdot", "highway-alerts", "getHighwayAlerts"],
 *   defaultOptions: tanstackQueryOptions.MINUTE_UPDATES,
 * });
 *
 * // For WSF APIs (with auto-update)
 * export const useVesselBasics = createApiHook({
 *   apiFn: getVesselBasics,
 *   queryKeyPrefix: ["wsf", "vessels", "basics"],
 *   defaultOptions: tanstackQueryOptions.DAILY_UPDATES,
 *   useAutoUpdate: true,
 *   getCacheFlushDate: getCacheFlushDateVessels,
 * });
 * ```
 */
export function createApiHook<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(config: ApiHookConfig<TApiFn, TParams>) {
  const {
    apiFn,
    queryKeyPrefix,
    getQueryKey,
    getEnabled,
    defaultOptions = {},
    useAutoUpdate = false,
    getCacheFlushDate,
    useJsonStringify = true,
  } = config;

  return (
    params: TParams,
    options?: TanStackOptions<Awaited<ReturnType<TApiFn>>>
  ) => {
    const queryKey = getQueryKey
      ? getQueryKey(params)
      : useJsonStringify
        ? [...queryKeyPrefix, JSON.stringify(params)]
        : [...queryKeyPrefix, params];

    const enabled = getEnabled ? getEnabled(params) : true;

    // Always use regular useQuery - auto-update functionality should be handled
    // by creating separate factory functions for WSF vs WSDOT APIs
    return useQuery({
      queryKey,
      queryFn: () => apiFn(params),
      ...defaultOptions,
      enabled,
      ...options,
    });
  };
}

// ============================================================================
// SPECIALIZED FACTORIES FOR COMMON PATTERNS
// ============================================================================

/**
 * Creates hooks for APIs that return arrays (most common pattern)
 */
export function createArrayApiHook<
  TApiFn extends (...args: any[]) => Promise<any[]>,
  TParams = Parameters<TApiFn>[0],
>(config: Omit<ApiHookConfig<TApiFn, TParams>, "apiFn"> & { apiFn: TApiFn }) {
  return createApiHook(config);
}

/**
 * Creates hooks for APIs that return single items
 */
export function createSingleApiHook<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(config: Omit<ApiHookConfig<TApiFn, TParams>, "apiFn"> & { apiFn: TApiFn }) {
  return createApiHook(config);
}

/**
 * Creates hooks for WSF APIs with auto-update functionality
 */
export function createWsfApiHook<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(
  config: Omit<
    ApiHookConfig<TApiFn, TParams>,
    "useAutoUpdate" | "getCacheFlushDate"
  > & {
    apiFn: TApiFn;
    getCacheFlushDate: () => Promise<Date | null>;
  }
) {
  const {
    apiFn,
    queryKeyPrefix,
    getQueryKey,
    getEnabled,
    defaultOptions = {},
    getCacheFlushDate,
    useJsonStringify = true,
  } = config;

  return (
    params: TParams,
    options?: TanStackOptions<Awaited<ReturnType<TApiFn>>>
  ) => {
    const queryKey = getQueryKey
      ? getQueryKey(params)
      : useJsonStringify
        ? [...queryKeyPrefix, JSON.stringify(params)]
        : [...queryKeyPrefix, params];

    const enabled = getEnabled ? getEnabled(params) : true;

    // Import here to avoid circular dependencies
    const { useQueryWithAutoUpdate } = require("./useQueryWithAutoUpdate");

    return useQueryWithAutoUpdate({
      queryKey,
      queryFn: () => apiFn(params),
      fetchLastUpdateTime: getCacheFlushDate,
      options: {
        ...defaultOptions,
        enabled,
        ...options,
      },
      params,
    });
  };
}

/**
 * Creates hooks for WSDOT APIs with standard caching
 */
export function createWsdotApiHook<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
>(
  config: Omit<ApiHookConfig<TApiFn, TParams>, "useAutoUpdate"> & {
    apiFn: TApiFn;
  }
) {
  return createApiHook({
    ...config,
    useAutoUpdate: false,
  });
}
