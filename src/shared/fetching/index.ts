/**
 * @fileoverview Data Fetching for WSDOT and WSF APIs
 *
 * This module provides a unified fetch approach with clear separation between
 * transport strategies (native vs JSONP) and validation approaches (none vs Zod).
 * Use the main `fetch` function with appropriate options.
 */

// Types
export type {
  FetchStrategy,
  FetchTool,
  LoggingMode,
  ValidationStrategy,
} from "@/shared/types";
// Public fetch functions
export {
  fetchAndValidateJsonp,
  fetchAndValidateNative,
  fetchJsonp,
  fetchNative,
} from "./fetchApi";
// URL building utilities
export {
  buildCompleteUrl,
  buildUrlWithApiKey,
  buildUrlWithParams,
} from "./internal/buildUrl";
// Error handling
export {
  type ApiError,
  createApiError,
  type ErrorContext,
  isApiError,
} from "./internal/handleError";
