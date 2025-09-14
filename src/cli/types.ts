/**
 * CLI constants
 */
export const CLI_CONSTANTS = {
  ISO_DATE_REGEX: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/,
  QUIET_MODES: ["agent", "quiet", "silent"] as const,
  DEFAULT_PARAMS: "{}",
} as const;

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
 * Type for CLI parameters - represents user input parameters
 */
export type CliParams = Record<string, unknown>;

/**
 * Type for valid function names
 */
export type FunctionName = string;

/**
 * Type for any endpoint definition (updated to match new Endpoint structure)
 */
export type AnyEndpointDefinition = {
  id: string;
  api: string;
  functionName: string;
  endpoint: string;
  urlTemplate: string;
  inputSchema: any;
  outputSchema: any;
  sampleParams?: any;
  cacheStrategy: any;
};

/**
 * Type for endpoints map
 */
export type EndpointsMap = Record<string, AnyEndpointDefinition>;
