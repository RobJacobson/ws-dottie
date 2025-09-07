/**
 * @fileoverview Centralized logging utility for WS-Dottie
 *
 * Provides consistent logging interface with environment-aware debug logging.
 * This module includes both general logging functions and specialized API
 * call logging with performance metrics.
 */

import chalk from "chalk";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Logging modes for individual API calls
 *
 * These modes control the verbosity of logging output for API calls:
 * - "none": No logging output
 * - "info": Basic information logging
 * - "debug": Detailed debugging information
 */
export type LoggingMode = "none" | "info" | "debug";

// ============================================================================
// LOGGING IMPLEMENTATION
// ============================================================================

/** Determine if we're in development mode for conditional logging */
const isDevelopment =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

/**
 * Centralized logging utility for WS-Dottie
 *
 * Provides consistent logging interface with environment-aware debug logging.
 * Debug logging is automatically disabled in production environments.
 */
const log = {
  debug: isDevelopment
    ? console.debug.bind(console, "[WS-Dottie Debug]")
    : () => {}, // No-op in production
  info: console.info.bind(console, "[WS-Dottie Info]"),
  warn: console.warn.bind(console, "[WS-Dottie Warn]"),
  error: console.error.bind(console, "[WS-Dottie Error]"),
};

/**
 * Logs API call information in a single line format
 *
 * This function logs the start of an API call with endpoint and parameters.
 * It uses a single line format that can be completed by logApiResults.
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
 * current line. It provides performance metrics including duration and response size.
 *
 * @param objectCount - Number of objects retrieved
 * @param durationMs - Duration in milliseconds
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

/**
 * Logs API call information in structured JSON format for debugging
 *
 * This function provides structured logging output that's useful for debugging
 * and analysis. It outputs JSON-formatted log entries that can be easily parsed
 * by log analysis tools. Only active in development mode.
 *
 * @param endpoint - The API endpoint being called
 * @param params - Parameters being sent to the endpoint
 * @param additionalData - Optional additional data to include in the log entry
 */
export const logApiCallStructured = (
  endpoint: string,
  params?: unknown,
  additionalData?: Record<string, unknown>
): void => {
  if (isDevelopment) {
    const logEntry = {
      type: "api_call",
      endpoint,
      params,
      timestamp: new Date().toISOString(),
      ...additionalData,
    };
    console.debug(JSON.stringify(logEntry));
  }
};

export default log;
