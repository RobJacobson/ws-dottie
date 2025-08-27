import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

/**
 * TanStack Query related types for WS-Dottie
 * Contains type definitions specific to TanStack Query integration
 */

// ============================================================================
// QUERY OPTIONS TYPE
// ============================================================================

/**
 * Options for WS-Dottie hooks that map to TanStack Query's UseQueryOptions,
 * excluding 'queryKey' and 'queryFn' which are provided by the hooks.
 *
 * This allows consumers to customize query behavior while maintaining
 * the required queryKey and queryFn structure.
 */
export type TanStackOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
>;

// ============================================================================
// API HOOK UTILITY TYPES
// ============================================================================

/**
 * Utility type that infers the return data type from an API function
 * Useful for automatically typing React Query hooks
 *
 * @example
 * ```typescript
 * // Given: getFareTotals(params) => Promise<FareTotal[]>
 * type InferredData = InferApiData<typeof getFareTotals>; // FareTotal[]
 * ```
 */
export type InferApiData<TApiFn> = TApiFn extends (
  ...args: any[]
) => Promise<infer TData>
  ? TData
  : never;

/**
 * Utility type that creates properly typed React Query options for an API function
 * Automatically infers the data type from the API function's return type
 *
 * @example
 * ```typescript
 * // Given: getFareTotals(params) => Promise<FareTotal[]>
 * type Options = ApiQueryOptions<typeof getFareTotals>; // TanStackOptions<FareTotal[]>
 * ```
 */
export type ApiQueryOptions<TApiFn> = TanStackOptions<InferApiData<TApiFn>>;

/**
 * Utility type that creates a properly typed React Query result for an API function
 * Automatically infers both data and error types
 *
 * @example
 * ```typescript
 * // Given: getFareTotals(params) => Promise<FareTotal[]>
 * type Result = ApiQueryResult<typeof getFareTotals>; // UseQueryResult<FareTotal[], Error>
 * ```
 */
export type ApiQueryResult<TApiFn> = UseQueryResult<
  InferApiData<TApiFn>,
  Error
>;

// ============================================================================
// HOOK FACTORY TYPES
// ============================================================================

/**
 * Parameters required for creating a query hook with useQueryWithAutoUpdate
 */
export interface CreateQueryHookParams<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
> {
  /** The API function to call */
  apiFn: TApiFn;
  /** Function to get the last update time for cache invalidation */
  getCacheFlushDate: () => Promise<Date | null>;
  /** Query key prefix for React Query */
  queryKeyPrefix: readonly unknown[];
  /** Optional query key function for dynamic keys */
  getQueryKey?: (params: TParams) => readonly unknown[];
  /** Optional function to check if query should be enabled */
  getEnabled?: (params: TParams) => boolean;
}

/**
 * Configuration for creating query hooks
 */
export interface QueryHookConfig<
  TApiFn extends (...args: any[]) => Promise<any>,
  TParams = Parameters<TApiFn>[0],
> {
  /** Query key prefix */
  queryKeyPrefix: readonly unknown[];
  /** Cache flush function */
  getCacheFlushDate: () => Promise<Date | null>;
  /** Optional dynamic query key generator */
  getQueryKey?: (params: TParams) => readonly unknown[];
  /** Optional enabled condition */
  getEnabled?: (params: TParams) => boolean;
}
