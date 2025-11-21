/**
 * @fileoverview Simplified Shared Types for WS-Dottie
 *
 * Consolidated type definitions without over-engineering.
 */

// ============================================================================
// LOGGING TYPES
// ============================================================================

/**
 * Logging verbosity levels for WS-Dottie
 *
 * Controls the amount of logging output during API operations.
 * - none: No logging output
 * - info: Basic information about API calls and results
 * - debug: Detailed logging including performance metrics
 */
export type LoggingMode = "none" | "info" | "debug";

// ============================================================================
// FETCHING TYPES
// ============================================================================

/**
 * Function type for fetching data from URLs
 *
 * This type defines the interface for fetch handlers that can retrieve
 * data from URLs and return it as a string. Used by both JSONP and native
 * fetch implementations.
 */
export type FetchHandler = (url: string) => Promise<string>;

/**
 * Fetch strategy for data fetching
 *
 * Defines the underlying transport mechanism used to fetch data.
 * - native: Uses standard fetch API (works in Node.js and modern browsers)
 * - jsonp: Uses JSONP callbacks (browser-only, bypasses CORS)
 */
export type FetchStrategy = "native" | "jsonp";
