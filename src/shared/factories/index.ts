/**
 * @fileoverview Factory Functions for WS-Dottie
 *
 * This module provides factory functions for creating typed endpoints, fetch functions,
 * and React Query hooks. These factories are used throughout the WS-Dottie library
 * to generate strongly-typed API functions with minimal boilerplate.
 */

export { createEndpointGroupFetchFunctions } from "./createEndpointGroupFetchFunctions";
export type { QueryHookOptions } from "./createEndpointGroupHooks";
// Endpoint group factories
export { createEndpointGroupHooks } from "./createEndpointGroupHooks";
// Endpoint factory
export { createEndpoint } from "./endpointFactory";
// Fetch function factory
export type { FetchFunctionParams } from "./fetchFunctionFactory";
export { createFetchFunction } from "./fetchFunctionFactory";
// Hook factory types
export type { HookOptions, HookParams } from "./hookFactory";
