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
// Fetch function factories
export type { FetchFunctionParams } from "./createFetchFunctions";
export {
  createFetchFunction,
  createFetchFunctions,
} from "./createFetchFunctions";
// Hook factories
export type { QueryHookOptions } from "./createHooks";
export { createHooks } from "./createHooks";

// Query options
export { cacheStrategies } from "./queryOptions";

// Type helpers
export type { FetchFunctionsMap, HooksMap } from "./types";
