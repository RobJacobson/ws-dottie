/**
 * Shared type definitions for the data pipeline
 */

import type { LoggingMode } from "@/shared/utils";

/**
 * Context information passed through the data pipeline
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
 */
export interface FetchSchemas<TInput = never, TOutput = unknown> {
  /** Zod schema for input validation */
  input?: import("zod").ZodSchema<TInput>;
  /** Zod schema for output validation */
  output?: import("zod").ZodSchema<TOutput>;
}

/**
 * Extended JSON type that includes Date objects
 * Useful for handling API responses that contain date strings that get parsed to Date objects
 */
export type JsonWithDates =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonWithDates[]
  | { [key: string]: JsonWithDates };
