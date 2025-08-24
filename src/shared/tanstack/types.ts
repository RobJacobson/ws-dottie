import type { UseQueryOptions } from "@tanstack/react-query";

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
