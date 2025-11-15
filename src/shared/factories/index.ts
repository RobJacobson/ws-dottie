/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed endpoints, fetch functions,
 * and React Query hooks. These factories are used throughout WS-Dottie library
 * to generate strongly-typed API functions with minimal boilerplate.
 */

// Cache flush date hook
export { useQueryWithCacheFlushDate } from "./createCacheFlushDateHook";
// Fetch function factory
export { createFetchFunction } from "./createFetchFunction";
// Hook factory
export {
  createHookFunction,
  shouldUseCacheFlushDate,
} from "./createHookFunction";
// Export all consolidated types
export type {
  DefineEndpointConfig,
  EndpointResult,
  FetchFunctionParams,
  QueryHookOptions,
} from "./types";
// Export cache strategies
export { cacheStrategies } from "./types";
