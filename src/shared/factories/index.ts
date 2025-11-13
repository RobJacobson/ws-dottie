/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed endpoints, fetch functions,
 * and React Query hooks. These factories are used throughout the WS-Dottie library
 * to generate strongly-typed API functions with minimal boilerplate.
 */

// Cache flush date hook
export { useQueryWithCacheFlushDate } from "./createCacheFlushDateHook";
// Endpoint factory
export { createEndpoint } from "./createEndpoint";
// Fetch function factory
export type { FetchFunctionParams } from "./createFetchFunction";
export { createFetchFunction } from "./createFetchFunction";
// Hook factory
export type { QueryHookOptions } from "./createHookFunction";
export {
  createHookFunction,
  shouldUseCacheFlushDate,
} from "./createHookFunction";

// Query options
export { cacheStrategies } from "./queryOptions";
