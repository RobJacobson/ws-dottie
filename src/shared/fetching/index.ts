/**
 * Shared fetching utilities for WSDOT and WSF APIs
 *
 * This module provides the core fetching infrastructure used by all API modules.
 * It includes platform-specific fetch strategies, error handling, and the main
 * zodFetch utility for validated API requests.
 */

// Error handling
export { createApiError, WsdotApiError } from "./errors";
// Date parsing utilities
export {
  isWsdotDateString,
  type JsonValue,
  type JsonWithDates,
  jsDateToMmDdYyyy,
  jsDateToYyyyMmDd,
  parseMmDdYyyyDate,
  parseMmDdYyyyDateTime,
  wsdotDateTimestampToJsDate,
} from "./parsing";
// Fetch strategies for different platforms
export {
  type ApiErrorResponse,
  type FetchStrategy,
  fetchJsonp,
  fetchNative,
  getEnvironmentType,
  selectFetchStrategy,
} from "./strategies";
// Main fetch utility
export { zodFetch } from "./zodFetch";
