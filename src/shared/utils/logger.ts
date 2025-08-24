/**
 * Centralized logging utility for WS-Dottie
 * Provides consistent logging interface with environment-aware debug logging
 */

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

export default log;
