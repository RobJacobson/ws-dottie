/**
 * CLI types and constants
 */

import type { EndpointDefinition } from "@/shared/endpoints";

/**
 * CLI constants
 */
export const CLI_CONSTANTS = {
  ISO_DATE_REGEX: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/,
  QUIET_MODES: ["agent", "quiet", "silent"] as const,
  DEFAULT_PARAMS: "{}",
} as const;

export type QuietMode = (typeof CLI_CONSTANTS.QUIET_MODES)[number];

/**
 * CLI options interface
 */
export interface CliOptions {
  pretty?: boolean;
  raw?: boolean;
  agent?: boolean;
  quiet?: boolean;
  silent?: boolean;
  fixDates?: boolean;
  head?: number;
}

/**
 * Type representing any endpoint definition from defineEndpoint()
 *
 * Each endpoint file exports the result of defineEndpoint(), which returns
 * EndpointDefinition<I, O> with specific input/output types. This type
 * represents any such endpoint definition while preserving the specific
 * types of each individual endpoint.
 */
export type AnyEndpointDefinition = EndpointDefinition<unknown, unknown>;

/**
 * Type for CLI parameters - represents user input parameters
 */
export type CliParams = Record<string, unknown>;

/**
 * Type for the endpoints map - maps function names to their endpoint definitions
 */
export type EndpointsMap = Record<string, AnyEndpointDefinition>;

/**
 * Type for valid function names (extracted from the endpoints map)
 */
export type FunctionName = keyof EndpointsMap;
