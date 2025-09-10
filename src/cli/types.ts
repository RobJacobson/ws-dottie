/**
 * CLI-specific types and interfaces
 */

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
