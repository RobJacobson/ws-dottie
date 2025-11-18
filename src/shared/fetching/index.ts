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
// Error handling
export {
  type ApiError,
  type ErrorContext,
  isApiError,
} from "./internal/handleError";
export type { FetchDottieParams } from "./types";
