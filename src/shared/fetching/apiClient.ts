// API client factory for WSF and WSDOT APIs
//
// This module implements a cross-platform fetching strategy to handle different environments:
// - Browser environments: Uses JSONP to avoid CORS restrictions when calling external APIs
// - Node.js environments: Uses regular fetch for server-side API calls
// - Test environments: Uses appropriate mocking strategies
//
// The JSONP approach is necessary because WSDOT and WSF APIs don't support CORS,
// making direct fetch requests impossible in browser environments.

import log from "@/shared/logger";

import { API_KEY, type LoggingMode } from "./config";
import { createApiError } from "./errors";
import { parseWsdotJson } from "./parseJson";
import { getEnvironmentType, selectFetchStrategy } from "./selectFetchStrategy";

/**
 * Creates a specialized API client for a specific API endpoint
 *
 * This function combines URL construction, API key injection, platform-specific fetching,
 * error handling, and data transformation into a single, clean interface.
 *
 * Cross-platform fetching strategy:
 * - Browser: Uses JSONP to bypass CORS restrictions (WSDOT/WSF APIs don't support CORS)
 * - Node.js: Uses native fetch for server-side requests
 * - Tests: Uses appropriate mocking for isolated testing
 *
 * @param baseUrl - The base URL for the API endpoint (e.g., "wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc")
 * @returns An API client function that handles the complete request lifecycle
 */
export const createApiClient = (baseUrl: string) => {
  // Select the appropriate fetch strategy for the current environment
  // This automatically selects JSONP for browsers, fetch for Node.js, or mocks for tests
  const fetchStrategy = selectFetchStrategy();

  // Determine if this is a WSF API (ferries) or WSDOT API (traffic/weather/etc.)
  // WSF uses "AccessCode" parameter, WSDOT uses "apiaccesscode"
  const isWsf = baseUrl.includes("wsdot.wa.gov/ferries");

  return async <T>(endpoint: string, logMode?: LoggingMode): Promise<T> => {
    // Build the complete URL with API key parameter
    // Different APIs use different parameter names for the access key
    const apiKeyParam = isWsf ? "apiaccesscode" : "AccessCode";
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${baseUrl}${endpoint}${separator}${apiKeyParam}=${API_KEY}`;
    const apiType = isWsf ? "WSF" : "WSDOT";

    // Log the fetch strategy being used (useful for debugging CORS/JSONP issues)
    logDebug(
      logMode,
      apiType,
      endpoint,
      `Using ${getEnvironmentType()} fetch strategy`
    );

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
      logDebug(
        logMode,
        apiType,
        endpoint,
        "Response transformed",
        transformedResponse
      );

      return transformedResponse;
    } catch (error) {
      // Log errors for debugging and monitoring
      if (logMode === "debug" || logMode === "info") {
        log.error(`[${apiType} ${endpoint}] Request failed:`, error);
      }

      // Wrap all errors in a consistent WsdotApiError format
      // This provides uniform error handling regardless of the underlying cause
      throw createApiError(error, endpoint, url);
    }
  };
};

/**
 * Debug logging helper to reduce noise in the main function
 */
const logDebug = (
  logMode: LoggingMode | undefined,
  apiType: string,
  endpoint: string,
  message: string,
  data?: unknown
) => {
  if (logMode !== "debug") return;

  const prefix = `[${apiType} ${endpoint}]`;
  if (data !== undefined) {
    log.debug(`${prefix} ${message}:`, data);
  } else {
    log.debug(`${prefix} ${message}`);
  }
};
