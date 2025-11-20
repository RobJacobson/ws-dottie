/**
 * @fileoverview Consolidated Factory Types
 *
 * This module contains all type definitions for factory functions used in
 * endpoint creation. Types are consolidated here to simplify imports and
 * maintain consistency across the factory system.
 */

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

// ============================================================================
// PARAMETER TYPES
// ============================================================================

/**
 * Parameters for fetch functions created by factory.
 */
export type FetchFunctionParams<TInput> = {
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
 * Helper type to simplify query hook options.
 */
export type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

/**
 * Type representing the fetch function created by createFetchFunction factory.
 *
 * This type simplifies the signature in endpoint files by encapsulating
 * the full fetch function type: (params?) => Promise<O>.
 */
export type FetchFactory<I, O> = (
  params?: FetchFunctionParams<I>
) => Promise<O>;

/**
 * Type representing the hook function created by createHook factory.
 *
 * This type simplifies the signature in endpoint files by encapsulating
 * the full hook function type: (params?, options?) => UseQueryResult.
 */
export type HookFactory<I, O> = (
  params?: FetchFunctionParams<I>,
  options?: QueryHookOptions<O>
) => UseQueryResult<O, Error>;

// Re-export cache strategies from strategies module
export { cacheStrategies } from "./strategies";
