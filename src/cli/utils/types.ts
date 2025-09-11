/**
 * CLI types and constants
 */

/**
 * CLI constants
 */
export const CLI_CONSTANTS = {
  ENDPOINT_SUFFIX: "Def",
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
}
