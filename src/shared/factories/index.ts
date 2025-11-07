/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed endpoints, fetch functions,
 * and React Query hooks. These factories are used throughout the WS-Dottie library
 * to generate strongly-typed API functions with minimal boilerplate.
 */

// Endpoint factory
export { createEndpoint } from "./createEndpoint";
export { createEndpointGroupFetchFunctions } from "./createEndpointGroupFetchFunctions";
export type { QueryHookOptions } from "./createEndpointGroupHooks";
// Endpoint group factories
export { createEndpointGroupHooks } from "./createEndpointGroupHooks";
// Fetch function factory
export type { FetchFunctionParams } from "./fetchFunctionFactory";
export { createFetchFunction } from "./fetchFunctionFactory";
// Query options
export { cacheStrategies } from "./queryOptions";
