/**
 * @fileoverview Centralized Logging Utility for WS-Dottie
 *
 * This module provides a centralized logging interface for WS-Dottie with
 * environment-aware debug logging and specialized API call logging with
 * performance metrics. It includes both general logging functions and
 * specialized functions for API operations.
 */

import chalk from "chalk";

// ============================================================================
// LOGGING IMPLEMENTATION
// ============================================================================

/** Determine if we're in development mode for conditional logging */
const isDevelopment =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

/**
 * Centralized logging utility for WS-Dottie
 *
 * This object provides a consistent logging interface with environment-aware
 * debug logging. Debug logging is automatically disabled in production
 * environments to improve performance and reduce noise.
 */
const log = {
  /** Debug logging (disabled in production) */
  debug: isDevelopment
    ? console.debug.bind(console, "[WS-Dottie Debug]")
    : () => {}, // No-op in production
  /** General information logging */
  info: console.info.bind(console, "[WS-Dottie Info]"),
  /** Warning message logging */
  warn: console.warn.bind(console, "[WS-Dottie Warn]"),
  /** Error message logging */
  error: console.error.bind(console, "[WS-Dottie Error]"),
};

/**
 * Logs API call information in a single line format
 *
 * This function logs the start of an API call with endpoint and parameters
 * using a single line format that can be completed by logApiResults. It
 * uses colored output for better visibility in console logs.
 *
 * @param endpoint - The full API endpoint path (will extract endpoint name internally)
 * @param params - Parameters being sent to the endpoint
 */
export const logApiCall = (endpoint: string, params?: unknown): void => {
  const endpointName = endpoint.split("/").pop() || endpoint;
  const paramsStr = params ? JSON.stringify(params) : "none";
  const message = chalk.blue(
    `Calling ${endpointName} with parameters ${paramsStr}...`
  );
  console.log(message);
};

/**
 * Appends API call results to the current line
 *
 * This function completes the API call logging by appending results to the
 * current line. It provides performance metrics including duration, response
 * size, and object count for comprehensive API operation monitoring.
 *
 * @param jsonData - The parsed JSON response data (will calculate object count internally)
 * @param startTime - The timestamp when the request started (will calculate duration internally)
 * @param responseSize - Response size in bytes
 */
export const logApiResults = (
  jsonData: unknown,
  startTime: number,
  responseSize: number
): void => {
  const duration = Date.now() - startTime;
  const objectCount = Array.isArray(jsonData) ? jsonData.length : 1;
  const durationSec = (duration / 1000).toFixed(1);
  const sizeKb = (responseSize / 1024).toFixed(1);
  const results = chalk.green(
    ` Retrieved ${objectCount} objects in ${durationSec} sec (${sizeKb} kb).`
  );
  console.log(results);
};

export default log;
