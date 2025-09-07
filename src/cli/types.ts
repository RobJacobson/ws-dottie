/**
 * CLI-specific types and interfaces
 */

import type { z } from "zod";

/**
 * CLI options interface
 */
export interface CliOptions {
  pretty: boolean;
  raw: boolean;
  agent: boolean;
  quiet: boolean;
  silent: boolean;
}

/**
 * Function metadata for CLI registry
 */
export interface FunctionMetadata {
  module: Record<string, unknown>;
  function: (params: unknown) => Promise<unknown>;
  paramsSchema?: z.ZodSchema<unknown>;
  description: string;
}

/**
 * Function registry type
 */
export type FunctionRegistry = Record<string, FunctionMetadata>;
