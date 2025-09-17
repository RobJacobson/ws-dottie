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
 * @param endpoint - The API endpoint being called
 * @param params - Parameters being sent to the endpoint
 */
export const logApiCall = (endpoint: string, params?: unknown): void => {
  const paramsStr = params ? JSON.stringify(params) : "none";
  const message = chalk.blue(
    `Calling ${endpoint} with parameters ${paramsStr}...`
  );
  process.stdout.write(message);
};

/**
 * Appends API call results to the current line
 *
 * This function completes the API call logging by appending results to the
 * current line. It provides performance metrics including duration, response
 * size, and object count for comprehensive API operation monitoring.
 *
 * @param objectCount - Number of objects retrieved from the API
 * @param durationMs - Duration of the API call in milliseconds
 * @param responseSize - Response size in bytes
 */
export const logApiResults = (
  objectCount: number,
  durationMs: number,
  responseSize: number
): void => {
  const durationSec = (durationMs / 1000).toFixed(1);
  const sizeKb = (responseSize / 1024).toFixed(1);
  const results = chalk.green(
    ` Retrieved ${objectCount} objects in ${durationSec} sec (${sizeKb} kb).`
  );
  console.log(results);
};

export default log;
