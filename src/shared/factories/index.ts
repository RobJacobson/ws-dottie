/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed fetch functions
 * and React Query hooks using a metadata-driven approach.
 */

// Export combined fetch and hook factory
export { createFetchAndHook } from "./createFetchAndHook";
// Export fetch function factory
export { createFetchFunction } from "./createFetchFunction";
// Export hook factory
export { createHook } from "./createHook";
// Export cache strategies
export { cacheStrategies } from "./strategies";
// Export types
export type {
  FetchFactory,
  FetchFunctionParams,
  HookFactory,
  QueryHookOptions,
} from "./types";
