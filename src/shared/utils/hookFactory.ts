/**
 * @fileoverview Hook Factory Types
 *
 * This module provides type definitions for hook factory functions.
 * These types are exported for potential future use.
 */

import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Options for creating hooks
 */
export type HookOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey" | "queryFn"
>;

/**
 * Parameters for hook factory functions
 */
export type HookParams<TInput> = {
  /** Input parameters for the endpoint */
  params?: TInput;
  /** Additional query options */
  options?: HookOptions<unknown>;
};
