/**
 * @fileoverview Simplified Shared Types for WS-Dottie
 *
 * Consolidated type definitions without over-engineering.
 */

import type { z } from "zod";
import type { ApiMeta, EndpointGroupMeta } from "@/apis/types";

// ============================================================================
// CACHE STRATEGY TYPES
// ============================================================================

/**
 * Cache strategies for different data update frequencies
 *
 * These strategies define how frequently data should be refreshed based on
 * nature of transportation data. Each strategy includes appropriate
 * stale time, garbage collection time, and refetch intervals.
 */
export type CacheStrategy =
  | "REALTIME" // Real-time data (5-second updates) - traffic conditions, alerts
  | "FREQUENT" // Frequently updated data (5-minute updates) - schedules, delays
  | "MODERATE" // Moderately updated data (hourly updates) - weather, conditions
  | "STATIC"; // Static data (daily updates) - terminals, vessels, routes

// ============================================================================
// ENDPOINT TYPES
// ============================================================================

/**
 * Minimal endpoint interface for fetching operations
 *
 * Contains only the fields necessary for making API requests,
 * excluding housekeeping metadata used elsewhere in the system.
 */
export interface FetchEndpoint<I, O> {
  /** Complete URL template with domain for building requests */
  urlTemplate: string;
  /** Endpoint path for logging and error messages */
  endpoint: string;
  /** Zod schema for input validation (optional - excluded in lite builds) */
  inputSchema?: z.ZodSchema<I>;
  /** Zod schema for output validation (optional - excluded in lite builds) */
  outputSchema?: z.ZodSchema<O>;
}

/**
 * Runtime endpoint interface with computed properties
 *
 * This interface defines the structure for runtime endpoint objects that are
 * created from endpoint configurations. It includes all necessary information
 * for validation, caching, and URL generation.
 *
 * Extends FetchEndpoint with additional housekeeping metadata used by hooks,
 * documentation, and other system components.
 */
export interface Endpoint<I, O> extends FetchEndpoint<I, O> {
  /** API configuration */
  api: ApiMeta;
  /** Endpoint group metadata */
  group: EndpointGroupMeta;
  /** Optional sample parameters for testing */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  /** Cache strategy */
  cacheStrategy: CacheStrategy;
  /** Function name */
  functionName: string;
  /** Computed unique identifier in format "api:function" for backward compatibility */
  id: string;
  /** One-sentence description of what this specific endpoint does */
  endpointDescription?: string;
}

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
