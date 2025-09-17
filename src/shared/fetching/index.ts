/**
 * @fileoverview Simplified Data Fetching for WSDOT and WSF APIs
 *
 * This is the simplified version that eliminates over-engineering:
 * - Single main API function
 * - Simple strategy selection
 * - Minimal error handling
 * - No unnecessary pipeline abstraction
 */

// Main API
export { fetchZod, fetchNative } from "@/shared/fetching/fetchCore";

// Strategies
export {
  fetchJsonp,
  selectFetchStrategy,
} from "@/shared/fetching/fetchStrategies";

// Low-level fetch strategies (for internal use)
export { fetchNative as fetchNativeStrategy } from "@/shared/fetching/fetchStrategies";

// Environment detection
export {
  getEnvironmentType,
  isTestEnvironment,
  isWebEnvironment,
  shouldForceJsonp,
} from "@/shared/fetching/detectEnvironment";

// Error handling
export {
  createApiError,
  isApiError,
  type ApiError,
  type ErrorContext,
} from "@/shared/fetching/handleError";

// Types
export type { FetchStrategy } from "@/shared/types";

// URL building utilities
export { buildApiUrl } from "@/shared/fetching/buildUrl";
