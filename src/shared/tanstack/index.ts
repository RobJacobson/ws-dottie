/**
 * TanStack Query related functionality for WS-Dottie
 * Contains query configuration, custom hooks, and related types
 */

// Export the main query configuration options
export { tanstackQueryOptions } from "./queryOptions";

// Export the auto-update hook
export {
  useQueryWithAutoUpdate,
  createApiHook,
} from "./useQueryWithAutoUpdate";

// Export TanStack-related types
export type {
  TanStackOptions,
  InferApiData,
  ApiQueryOptions,
  ApiQueryResult,
} from "./types";
