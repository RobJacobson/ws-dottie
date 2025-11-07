/**
 * @fileoverview Data Fetching for WSDOT and WSF APIs
 *
 * This module provides a unified fetch approach with the main `fetchDottie` function
 * that supports both transport strategies (native vs JSONP) and validation approaches (none vs Zod).
 */

// Types
export type {
  FetchStrategy,
  LoggingMode,
} from "@/shared/types";
// Main fetch function
export { fetchDottie } from "./fetchDottie";
// URL building utilities
export { buildCompleteUrl } from "./internal/buildUrl";
// Error handling
export {
  type ApiError,
  createApiError,
  type ErrorContext,
  isApiError,
} from "./internal/handleError";
export type { FetchDottieParams } from "./types";
