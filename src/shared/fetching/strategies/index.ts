// Fetch strategies for different platforms
//
// This module provides two fetch strategies:
// - fetchJsonp: Uses JSONP (script tag injection) to bypass CORS restrictions in browsers
// - fetchNative: Uses native fetch API for server-side and test environments
//
// Both strategies return raw JSON strings that are processed by parseWsdotJson for
// date transformation and data cleanup.

export { fetchJsonp } from "./fetchJsonp";
export { fetchNative } from "./fetchNative";
export type {
  ApiErrorResponse,
  FetchStrategy,
  JSONPCallback,
  JSONPWindow,
} from "./types";
export { hasApiError, processApiResponse } from "./utils";
