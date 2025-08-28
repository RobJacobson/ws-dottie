/**
 * Centralized logging utility for WS-Dottie
 * Provides consistent logging interface with environment-aware debug logging
 */

import chalk from "chalk";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Logging modes for individual API calls
 * - "none": No logging output
 * - "info": Basic information logging
 * - "debug": Detailed debugging information
 */
export type LoggingMode = "none" | "info" | "debug";

// ============================================================================
// LOGGING IMPLEMENTATION
// ============================================================================

// Determine if we're in development mode for conditional logging
const isDevelopment =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

/**
 * Centralized logging utility for WS-Dottie
 * Provides consistent logging interface with environment-aware debug logging
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

export default log;
