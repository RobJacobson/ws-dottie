/**
 * @fileoverview Simplified Shared Types for WS-Dottie
 *
 * Consolidated type definitions without over-engineering.
 */

import type { Endpoint } from "./endpoints";

// ============================================================================
// CACHE STRATEGY TYPES
// ============================================================================

/**
 * Cache strategies for different data update frequencies
 *
 * These strategies define how frequently data should be refreshed based on
 * the nature of the transportation data. Each strategy includes appropriate
 * stale time, garbage collection time, and refetch intervals.
 */
export type CacheStrategy =
  | "REALTIME" // Real-time data (5-second updates) - traffic conditions, alerts
  | "FREQUENT" // Frequently updated data (5-minute updates) - schedules, delays
  | "MODERATE" // Moderately updated data (hourly updates) - weather, conditions
  | "STATIC"; // Static data (daily updates) - terminals, vessels, routes

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
 * This type defines the interface for fetch strategies that can retrieve
 * data from URLs and return it as a string. Used by both JSONP and native
 * fetch implementations.
 */
export type FetchStrategy = (url: string) => Promise<string>;

/**
 * Core fetch tool interface for WS-Dottie APIs
 *
 * This interface defines the standard way to fetch data from WSDOT/WSF APIs
 * with explicit control over transport strategy and validation approach.
 * All fetch tools implement this interface for consistency.
 */
export type FetchTool = <TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: FetchOptions
) => Promise<TOutput>;

/**
 * Options for fetch operations
 *
 * Provides configuration options for fetch tools including logging
 * and future extensibility.
 */
export interface FetchOptions {
  /** Logging verbosity level */
  logMode?: LoggingMode;
}

/**
 * Transport strategy for data fetching
 *
 * Defines the underlying transport mechanism used to fetch data.
 * - native: Uses standard fetch API (works in Node.js and modern browsers)
 * - jsonp: Uses JSONP callbacks (browser-only, bypasses CORS)
 */
export type TransportStrategy = "native" | "jsonp";
