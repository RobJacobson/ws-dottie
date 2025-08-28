/** biome-ignore-all lint/suspicious/noExplicitAny: Needed for typing */
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
