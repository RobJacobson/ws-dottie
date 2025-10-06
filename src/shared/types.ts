/**
 * @fileoverview Simplified Shared Types for WS-Dottie
 *
 * Consolidated type definitions without over-engineering.
 */

import type { z } from "zod";

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
// ENDPOINT TYPES
// ============================================================================

/**
 * Runtime endpoint interface with computed properties
 *
 * This interface defines the structure for runtime endpoint objects that are
 * created from ApiDefinition and EndpointDefinition structures. It includes
 * all necessary information for validation, caching, and URL generation.
 */
export interface Endpoint<I, O> {
  /** API group name (e.g., "wsdot-bridge-clearances") */
  api: string;
  /** Function name (e.g., "getBridgeClearances") */
  function: string;
  /** Complete HTTP endpoint URL template */
  endpoint: string;
  /** Zod schema for input validation */
  inputSchema: z.ZodSchema<I>;
  /** Zod schema for output validation */
  outputSchema: z.ZodSchema<O>;
  /** Optional sample parameters for testing */
  sampleParams?: Partial<I> | (() => Promise<Partial<I>>);
  /** Cache strategy */
  cacheStrategy: CacheStrategy;
  /** Function name (alias for function field) */
  functionName: string;
  /** Complete URL template with domain */
  urlTemplate: string;
  /** Computed unique identifier in format "api:function" for backward compatibility */
  id: string;
}

/**
 * Full API interface with computed endpoints
 *
 * This interface represents a complete API with all its endpoints converted
 * to runtime Endpoint objects with computed properties.
 */
export interface Api {
  /** The internal API name (e.g., "wsf-schedule") */
  name: string;
  /** The base URL for the API (e.g., "http://www.wsdot.wa.gov/ferries/api/schedule/rest") */
  baseUrl: string;
  /** Array of runtime endpoints with computed properties */
  endpoints: Endpoint<unknown, unknown>[];
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
 * Core fetch tool interface for WS-Dottie APIs
 *
 * This interface defines the standard way to fetch data from WSDOT/WSF APIs
 * with explicit control over transport strategy and validation approach.
 * All fetch tools implement this interface for consistency.
 */
export type FetchTool = <TInput, TOutput>(
  endpoint: Endpoint<TInput, TOutput>,
  params: TInput | undefined,
  fetchStrategy: FetchStrategy,
  validationStrategy: ValidationStrategy,
  logMode?: LoggingMode
) => Promise<TOutput>;

/**
 * Fetch strategy for data fetching
 *
 * Defines the underlying transport mechanism used to fetch data.
 * - native: Uses standard fetch API (works in Node.js and modern browsers)
 * - jsonp: Uses JSONP callbacks (browser-only, bypasses CORS)
 */
export type FetchStrategy = "native" | "jsonp";

/**
 * Validation strategy for data fetching
 *
 * Defines how input and output data should be validated.
 * - none: No validation performed
 * - zod: Full validation using Zod schemas
 */
export type ValidationStrategy = "none" | "zod";
