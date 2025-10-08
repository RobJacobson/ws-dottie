/**
 * @fileoverview CLI Types and Constants for WS-Dottie
 *
 * This module provides type definitions and constants used throughout the
 * WS-Dottie CLI tools. It includes interfaces for CLI options, parameter
 * types, and utility constants for consistent behavior across all CLI tools.
 */

/**
 * CLI constants used throughout the command-line tools
 *
 * These constants provide consistent values and patterns used across
 * all CLI tools for parameter parsing, output control, and validation.
 */
export const CLI_CONSTANTS = {
  /** Array of quiet mode option names */
  QUIET_MODES: ["quiet", "silent"] as const,
  /** Default empty JSON parameters string */
  DEFAULT_PARAMS: "{}",
} as const;

/**
 * CLI options interface
 *
 * Defines the available command-line options for WS-Dottie CLI tools.
 * These options control output formatting, verbosity, behavior, and fetch strategy.
 */
export interface CliOptions {
  /** Pretty-print JSON output with 2-space indentation */
  pretty?: boolean;
  /** Quiet mode: suppress debug output and verbose messages */
  quiet?: boolean;
  /** Silent mode: suppress all output except final JSON result */
  silent?: boolean;
  /** Truncate output to first N lines */
  limit?: number;
  /** List all available endpoints and exit */
  list?: boolean;
  /** Use JSONP instead of native fetch (for browser environments) */
  jsonp?: boolean;
  /** Validation flag (set by Commander.js when --no-validation is used) */
  validation?: boolean;
  /** Concise array output: brackets on own lines, items indented and compact */
  concise?: boolean;
}

/**
 * Type for CLI parameters - represents user input parameters
 *
 * This type represents the parameters passed to API functions from the
 * command line. It's a flexible record type that can contain any
 * key-value pairs that match the expected API parameter structure.
 */
export type CliParams = Record<string, unknown>;
