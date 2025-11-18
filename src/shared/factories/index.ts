/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed fetch functions
 * and React Query hooks using a metadata-driven approach. These factories
 * are used throughout WS-Dottie library to generate strongly-typed API
 * functions with minimal boilerplate.
 *
 * Note: createHookFunction and shouldUseCacheFlushDate are internal-only
 * and not exported. Import them directly from their modules if needed.
 */

// Export all consolidated types
export type {
  EndpointConfig,
  FetchFunctionParams,
  QueryHookOptions,
} from "./types";
// Export cache strategies
export { cacheStrategies } from "./types";
