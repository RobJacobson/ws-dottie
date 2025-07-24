// API client for WSF and WSDOT APIs
//
// This module implements a cross-platform fetching strategy to handle different environments:
// - Browser environments: Uses JSONP to avoid CORS restrictions when calling external APIs
// - Node.js environments: Uses regular fetch for server-side API calls
// - Test environments: Uses appropriate mocking strategies
//
// The JSONP approach is necessary because WSDOT and WSF APIs don't support CORS,
// making direct fetch requests impossible in browser environments.

import log, { type LoggingMode } from "@/shared/logger";

import { createApiError } from "./errors";
import { parseWsdotJson } from "./parseJson";
import { getEnvironmentType, selectFetchStrategy } from "./selectFetchStrategy";

/**
 * Creates a simple API client that handles fetching and response transformation
 *
 * This function focuses solely on the fetch request lifecycle:
 * - Platform-specific fetching (JSONP for browsers, fetch for Node.js, mocks for tests)
 * - Response transformation (handling WSDOT/WSF date formats)
 * - Error handling and logging
 *
 * URL construction is handled externally by the calling code.
 *
 * @returns An API client function that handles the complete request lifecycle
 */
export const createApiClient = () => {
  // Select the appropriate fetch strategy for the current environment
  // This automatically selects JSONP for browsers, fetch for Node.js, or mocks for tests
  const fetchStrategy = selectFetchStrategy();

  return async <T>(url: string, logMode?: LoggingMode): Promise<T> => {
    // Extract endpoint from URL for logging purposes
    // Handle both full URLs and relative paths
    const endpoint = url.startsWith("http") ? new URL(url).pathname : url;

    // Log the fetch strategy being used (useful for debugging CORS/JSONP issues)
    logDebug(logMode, endpoint, `Using ${getEnvironmentType()} fetch strategy`);

    try {
      // Execute the platform-appropriate fetch strategy
      // - Browser: JSONP with script tag injection
      // - Node.js: Native fetch with proper headers
      // - Tests: Mocked responses
      const responseString = await fetchStrategy(url);

      // Transform the raw response string into structured data
      // Handles WSDOT date formats ("/Date(timestamp)/") and WSF date formats ("MM/DD/YYYY")
      const transformedResponse = parseWsdotJson<T>(responseString);

      // Log the transformed response for debugging
      logDebug(logMode, endpoint, "Response transformed", transformedResponse);

      return transformedResponse;
    } catch (error: any) {
      // Log errors for debugging and monitoring
      if (logMode === "debug" || logMode === "info") {
        log.error(`[${endpoint}] Request failed:`, error);
      }

      // Try to extract HTTP status code if available
      const status = error?.status || error?.response?.status;

      // Wrap all errors in a consistent WsdotApiError format
      // This provides uniform error handling regardless of the underlying cause
      throw createApiError(error, endpoint, url, status);
    }
  };
};

/**
 * Debug logging helper to reduce noise in the main function
 */
const logDebug = (
  logMode: LoggingMode | undefined,
  endpoint: string,
  message: string,
  data?: unknown
) => {
  if (logMode !== "debug") return;

  const prefix = `[${endpoint}]`;
  if (data !== undefined) {
    log.debug(`${prefix} ${message}:`, data);
  } else {
    log.debug(`${prefix} ${message}`);
  }
};
