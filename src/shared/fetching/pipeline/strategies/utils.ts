/**
 * Fetch Strategy Selection for Cross-Platform Compatibility
 *
 * This module provides intelligent fetch strategy selection based on the current
 * environment. It automatically chooses the appropriate fetching method for
 * different platforms while maintaining a consistent API interface.
 *
 * Key Features:
 * - Automatic environment detection (browser, Node.js, test)
 * - Platform-specific strategy selection (JSONP for browsers, fetch for Node.js)
 * - Environment variable overrides for testing
 * - Consistent API across all platforms
 * - Debugging utilities for environment identification
 *
 * Strategy Selection:
 * - Browser environments: JSONP (to bypass CORS restrictions)
 * - Node.js environments: Native fetch (for server-side requests)
 * - Test environments: Native fetch (to avoid JSONP complexity)
 * - Override: FORCE_JSONP=true for JSONP testing
 *
 * Environment Detection:
 * - Browser: window and document objects available
 * - Test: NODE_ENV=test, VITEST_WORKER_ID, or jsdom/happy-dom user agent
 * - Server: Node.js, Bun, React Native, etc.
 *
 * Usage:
 * ```typescript
 * // Get the appropriate fetch strategy for current environment
 * const fetchStrategy = selectFetchStrategy();
 * const data = await fetchStrategy("https://api.example.com/data");
 *
 * // Get current environment type
 * const envType = getEnvironmentType(); // "web", "server", or "test"
 *
 * // Force JSONP for testing (set FORCE_JSONP=true)
 * const jsonpStrategy = selectFetchStrategy(); // Returns JSONP even in tests
 * ```
 */

import { fetchJsonp } from "./fetchJsonp";
import { fetchNative } from "./fetchNative";
import type { ApiErrorResponse, FetchStrategy } from "./types";

/**
 * Cross-platform fetch strategy selector
 *
 * Selects the appropriate fetch strategy based on the current environment:
 * - Test environments: Native fetch (to avoid JSONP complexity in tests)
 * - Web browsers: JSONP (to bypass CORS restrictions)
 * - Server environments: Native fetch (Node.js, Bun, React Native, etc.)
 *
 * Environment variable override:
 * - FORCE_JSONP=true: Forces JSONP strategy even in tests (for JSONP testing)
 *
 * @returns A fetch strategy function that can be used to make requests
 */
export const selectFetchStrategy = (): FetchStrategy => {
  const environment = getEnvironmentType();

  // Allow forcing JSONP for testing purposes
  if (typeof process !== "undefined" && process.env.FORCE_JSONP === "true") {
    return fetchJsonp;
  }

  let strategy: FetchStrategy;
  switch (environment) {
    case "test":
    case "server":
      strategy = fetchNative;
      break;
    case "web":
      strategy = fetchJsonp;
      break;
    default:
      strategy = fetchNative; // Fallback
      break;
  }

  return strategy;
};

/**
 * Get the current environment type for debugging/logging purposes
 */
export const getEnvironmentType = (): "web" | "server" | "test" => {
  if (isTestEnvironment()) {
    return "test";
  }

  if (isWebEnvironment()) {
    return "web";
  }

  return "server";
};

/**
 * Environment detection utilities
 */
const isWebEnvironment = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

const isTestEnvironment = () => {
  // Check for test environment indicators
  if (typeof process !== "undefined") {
    if (
      process.env.NODE_ENV === "test" ||
      process.env.VITEST_WORKER_ID !== undefined
    ) {
      return true;
    }
  }

  // Check for test DOM environments
  if (typeof window !== "undefined" && window.navigator?.userAgent) {
    const userAgent = window.navigator.userAgent;
    if (
      userAgent.includes("jsdom") ||
      userAgent.includes("happy-dom") ||
      userAgent.includes("vitest")
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Checks if the API response contains an error message
 *
 * WSDOT and WSF APIs return error messages in a "Message" field rather than
 * using HTTP error status codes for some validation errors.
 */
export const hasApiError = (data: unknown): data is ApiErrorResponse => {
  if (!data || typeof data !== "object") return false;

  const errorData = data as ApiErrorResponse;
  if (!("Message" in errorData) || typeof errorData.Message !== "string")
    return false;

  return true;
};

/**
 * Processes API response data and returns it as a JSON string
 *
 * @param data - The raw response data from the API
 * @returns The JSON string representation of the data
 * @throws Error if the response contains an API error message
 */
export const processApiResponse = (data: unknown): string => {
  if (hasApiError(data)) {
    throw new Error(data.Message);
  }

  return JSON.stringify(data);
};
