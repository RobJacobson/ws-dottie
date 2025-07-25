/**
 * API Client Creation for WSDOT and WSF APIs
 *
 * This module provides the core API client creation functionality with automatic
 * platform detection and appropriate fetching strategies. It handles the complete
 * request lifecycle including fetching, response transformation, and error handling.
 *
 * Key Features:
 * - Automatic platform detection (browser, Node.js, test environments)
 * - Platform-specific fetching strategies (JSONP for browsers, fetch for Node.js)
 * - Automatic response transformation (date parsing, field filtering)
 * - Comprehensive error handling and logging
 * - Type-safe API responses
 *
 * The JSONP approach is necessary because WSDOT and WSF APIs don't support CORS,
 * making direct fetch requests impossible in browser environments.
 *
 * Usage:
 * ```typescript
 * const apiClient = createApiClient();
 *
 * // Make a request with automatic transformation
 * const data = await apiClient<MyResponseType>("https://api.example.com/data");
 *
 * // With logging enabled
 * const data = await apiClient<MyResponseType>(
 *   "https://api.example.com/data",
 *   "debug"
 * );
 * ```
 */

import log, { type LoggingMode } from "@/shared/logger";

import { createApiError } from "../errors";
import { parseWsdotJson } from "../parsing";
import { getEnvironmentType, selectFetchStrategy } from "../utils";

/**
 * Creates a simple API client that handles fetching and response transformation
 *
 * This function focuses solely on the fetch request lifecycle:
 * - Platform-specific fetching (JSONP for browsers, fetch for Node.js, mocks for tests)
 * - Response transformation (handling WSDOT/WSF date formats and normalization)
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

  return async <T>(
    url: string,
    logMode?: LoggingMode,
    expectedType?: "array" | "object"
  ): Promise<T> => {
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
      const responseString = await fetchStrategy(url, expectedType);

      // Transform the raw response string into structured data
      // Handles WSDOT date formats ("/Date(timestamp)/"), WSF date formats ("MM/DD/YYYY"),
      // and empty response normalization based on expected type
      const transformedResponse = parseWsdotJson<T>(responseString);

      // Log the transformed response for debugging
      logDebug(logMode, endpoint, "Response transformed", transformedResponse);

      return transformedResponse;
    } catch (error: unknown) {
      // Log errors for debugging and monitoring
      if (logMode === "debug" || logMode === "info") {
        log.error(`[${endpoint}] Request failed:`, error);
      }

      // Extract HTTP status code if available
      const status =
        error instanceof Error
          ? (error as Error & { status?: number }).status
          : undefined;

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
