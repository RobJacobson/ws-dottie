/**
 * @fileoverview Simplified Data Fetching for WSDOT and WSF APIs
 *
 * This is the simplified version that eliminates over-engineering:
 * - Single main API function
 * - Simple strategy selection
 * - Minimal error handling
 * - No unnecessary pipeline abstraction
 */

// URL building utilities
export {
  buildUrlWithApiKey,
  buildUrlWithParams,
} from "@/shared/fetching/buildUrl";
// Environment detection
export {
  getEnvironmentType,
  isTestEnvironment,
  isWebEnvironment,
  shouldForceJsonp,
} from "@/shared/fetching/detectEnvironment";
// Main API
export { fetchNative, fetchZod } from "@/shared/fetching/fetchCore";
// Strategies
// Low-level fetch strategies (for internal use)
export {
  fetchJsonp,
  fetchNative as fetchNativeStrategy,
  selectFetchStrategy,
} from "@/shared/fetching/fetchStrategies";
// Error handling
export {
  type ApiError,
  createApiError,
  type ErrorContext,
  isApiError,
} from "@/shared/fetching/handleError";
// Types
export type { FetchStrategy } from "@/shared/types";
