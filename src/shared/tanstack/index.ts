/**
 * TanStack Query related functionality for WS-Dottie
 * Contains query configuration, custom hooks, and related types
 */

// Export the main query configuration options
export { tanstackQueryOptions } from "./queryOptions";
// Export TanStack-related types
export type {
  ApiQueryOptions,
  ApiQueryResult,
  InferApiData,
  TanStackOptions,
} from "./types";
// Export the auto-update hook
export { useQueryWithAutoUpdate } from "./useQueryWithAutoUpdate";
// Export the enhanced hook factory
export {
  createApiHook,
  createArrayApiHook,
  createSingleApiHook,
  createWsfApiHook,
  createWsdotApiHook,
} from "./hookFactory";
