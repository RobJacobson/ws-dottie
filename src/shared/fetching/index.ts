/**
 * @fileoverview Data Fetching Pipeline for WSDOT and WSF APIs
 *
 * This module provides a complete data fetching system with validation,
 * organized into three main stages:
 * - Request preparation (validation, URL building)
 * - Request execution (strategy selection, fetch operations)
 * - Response processing (validation, transformation)
 *
 * The pipeline automatically selects the appropriate fetch strategy based on
 * the environment (JSONP for browsers, native fetch for servers) and provides
 * comprehensive error handling and validation throughout.
 */

// Main API
export { zodFetch } from "./zodFetch";

// Core pipeline stages
export * from "./pipeline";

// Error handling
export * from "./handleErrors";

// Execution strategies
export {
  executeRequest,
  fetchJsonp,
  fetchNative,
  getEnvironmentType,
} from "./execution";

// Types
export type {
  FetchContext,
  FetchSchemas,
  JsonWithDates,
  FetchStrategy,
  ApiErrorResponse,
  JSONPCallback,
  JSONPWindow,
} from "./types";

// Date utilities
export { jsDateToYyyyMmDd } from "../utils/dateUtils";
