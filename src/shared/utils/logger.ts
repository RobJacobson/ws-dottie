/**
 * @fileoverview Simplified Logging Utility for WS-Dottie
 *
 * This module provides a simplified logging interface for WS-Dottie with
 * environment-aware debug logging and specialized API call logging.
 * Focused on essential functionality used by the core library.
 */

import pc from "picocolors";

// ============================================================================
// SIMPLIFIED LOGGING IMPLEMENTATION
// ============================================================================

/**
 * Simple logging utility for WS-Dottie
 *
 * Provides basic logging functions with environment-aware debug logging.
 * Debug logging is automatically disabled in production environments.
 */
export const logger = {
  /** Debug logging (disabled in production) */
  debug: (message: string): void => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[WS-Dottie] ${message}`);
    }
  },

  /** General information logging */
  info: (message: string): void => {
    console.info(`[WS-Dottie] ${message}`);
  },

  /** Warning message logging */
  warn: (message: string): void => {
    console.warn(`[WS-Dottie] ${message}`);
  },

  /** Error message logging */
  error: (message: string): void => {
    console.error(`[WS-Dottie] ${message}`);
  },
};

/**
 * Logs API call information in a single line format
 *
 * Simplified API call logging for the core fetching functionality.
 * Used only by fetchCore.ts for basic API operation monitoring.
 *
 * @param endpoint - The full API endpoint path (will extract endpoint name internally)
 * @param params - Parameters being sent to the endpoint
 */
export const logApiCall = (endpoint: string, params?: unknown): void => {
  const endpointName = endpoint.split("/").pop() || endpoint;
  const paramsStr = params ? JSON.stringify(params) : "none";
  const message = pc.blue(
    `Calling ${endpointName} with parameters ${paramsStr}...`
  );
  console.log(message);
};

/**
 * Logs API call results with performance metrics
 *
 * Simplified API result logging for the core fetching functionality.
 * Provides basic performance metrics including duration and response size.
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
  const results = pc.green(
    ` Retrieved ${objectCount} objects in ${durationSec} sec (${sizeKb} kb).`
  );
  console.log(results);
};
