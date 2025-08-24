/**
 * Request execution utilities for the data pipeline
 *
 * This module handles the second stage of the data pipeline:
 * - Fetch strategy selection and orchestration
 * - Actual request execution using appropriate strategy (JSONP/native)
 * - Environment detection and platform-specific logic
 */

export { executeRequest } from "./executeRequest";
export { fetchJsonp } from "./fetchJsonp";
export { fetchNative } from "./fetchNative";
export { selectFetchStrategy, getEnvironmentType } from "./fetchOrchestrator";
export type {
  FetchStrategy,
  JSONPCallback,
  JSONPWindow,
  ApiErrorResponse,
} from "./types";
export { processApiResponse } from "./utils";
