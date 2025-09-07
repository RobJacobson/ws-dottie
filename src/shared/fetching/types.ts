/**
 * @fileoverview Consolidated type definitions for the data pipeline
 *
 * This module contains all type definitions used throughout the data fetching
 * pipeline, including context types, schema definitions, and execution strategy types.
 */

import type { ZodType } from "zod";

import type { LoggingMode } from "@/shared/utils/logger";

// ============================================================================
// CORE PIPELINE TYPES
// ============================================================================

/**
 * Unified context information passed through the data pipeline
 *
 * Used by all pipeline stages: request preparation, execution, and response processing.
 * This context provides consistent information across all pipeline stages.
 */
export interface FetchContext {
  /** Name of the API endpoint being called */
  endpoint: string;
  /** Logging mode for debugging */
  logMode?: LoggingMode;
  /** The interpolated URL template */
  interpolatedUrl: string;
}

/**
 * Schema definitions for input and output validation
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 */
export interface FetchSchemas<TInput = never, TOutput = unknown> {
  /** Zod schema for input validation */
  input?: ZodType<TInput>;
  /** Zod schema for output validation */
  output?: ZodType<TOutput>;
}

/**
 * Extended JSON type that includes Date objects
 *
 * Useful for handling API responses that contain date strings that get parsed to Date objects.
 * This type allows for proper type safety when working with API data that includes dates.
 */
export type JsonWithDates =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonWithDates[]
  | { [key: string]: JsonWithDates };

// ============================================================================
// EXECUTION STRATEGY TYPES
// ============================================================================

/**
 * Strong type for isomorphic fetch functions
 *
 * Both JSONP and native fetch return raw JSON strings for processing by Zod schemas.
 * This ensures consistent return types across all fetch strategies.
 */
export type FetchStrategy = (url: string) => Promise<string>;

/**
 * JSONP callback types for web CORS workaround
 *
 * These types are used by the JSONP fetch strategy to handle callback functions
 * and window object extensions for CORS bypass functionality.
 */
export type JSONPCallback = (data: unknown) => void;
export type JSONPWindow = Window & Record<string, JSONPCallback | undefined>;

/**
 * Error response type from WSDOT/WSF APIs
 *
 * This type represents the standard error response format returned by WSDOT
 * and WSF APIs when requests fail.
 */
export type ApiErrorResponse = { Message: string };
