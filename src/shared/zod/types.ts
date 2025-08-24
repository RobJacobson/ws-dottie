import type { z } from "zod";

/**
 * Zod-specific types for the fetch utility
 */

export interface FetchSchemas<TInput, TOutput> {
  input?: z.ZodSchema<TInput>;
  output?: z.ZodSchema<TOutput>;
}

export interface FetchContext {
  endpoint: string;
  logMode?: "none" | "info" | "debug";
  interpolatedUrl: string;
}
