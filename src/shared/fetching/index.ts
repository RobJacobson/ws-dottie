/**
 * @fileoverview Data Fetching for WSDOT and WSF APIs
 *
 * This module provides explicit fetch tools with clear separation between
 * transport strategies (native vs JSONP) and validation approaches (none vs Zod).
 * No automatic environment detection - consumers choose the appropriate tool.
 */

export { fetchJsonp as fetchJsonpTool } from "@/shared/fetching/fetchJsonp";
export { fetchJsonpZod } from "@/shared/fetching/fetchJsonpZod";
// Explicit fetch tools - choose the right one for your use case
export { fetchNative } from "@/shared/fetching/fetchNative";
export { fetchNativeZod } from "@/shared/fetching/fetchNativeZod";
// URL building utilities
export {
  buildUrlWithApiKey,
  buildUrlWithParams,
} from "@/shared/fetching/shared/buildUrl";
// Error handling
export {
  type ApiError,
  createApiError,
  type ErrorContext,
  isApiError,
} from "@/shared/fetching/shared/handleError";
// Types
export type {
  FetchOptions,
  FetchStrategy,
  FetchTool,
  TransportStrategy,
} from "@/shared/types";
