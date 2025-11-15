/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed endpoints, fetch functions,
 * and React Query hooks. These factories are used throughout WS-Dottie library
 * to generate strongly-typed API functions with minimal boilerplate.
 */

// Unified endpoint factory (replaces defineEndpoint and createFetchFunction)
export { createEndpoint } from "./createEndpoint";
// Hook factory
export {
  createHookFunction,
  shouldUseCacheFlushDate,
} from "./createHookFunction";
// Export all consolidated types
export type {
  DefineEndpointConfig,
  EndpointConfig,
  EndpointResult,
  FetchFunctionParams,
  QueryHookOptions,
} from "./types";
// Export cache strategies
export { cacheStrategies } from "./types";
