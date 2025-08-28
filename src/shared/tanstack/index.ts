/**
 * TanStack Query related functionality for WS-Dottie
 * Contains query configuration, custom hooks, and related types
 */

// Export the enhanced hook factory
export {
  createUseQueryWsdot,
  createUseQueryWsf,
} from "./hookFactory";
// Export the main query configuration options
export { tanstackRefetchOptions as tanstackQueryOptions } from "./queryOptions";
// Export TanStack-related types
export type {
  ApiQueryOptions,
  ApiQueryResult,
  InferApiData,
  TanStackOptions,
} from "./types";
