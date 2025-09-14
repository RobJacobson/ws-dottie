#!/usr/bin/env node

/**
 * Simplified CLI utilities
 *
 * A functional approach to CLI tools that eliminates over-engineering
 * while maintaining all functionality.
 */

import chalk from "chalk";
import { Command } from "commander";
import type { Endpoint } from "@/shared/endpoints";
import { validateInputs } from "@/shared/fetching/pipeline/prepareRequest";
import { findEndpointByFunctionName } from "@/shared/endpoints";
import { CLI_CONSTANTS, type CliOptions, type CliParams } from "./types";
import {
  displayFunctionNotFound,
  generateHelpText,
  handleError,
  outputResult,
  setupConsoleSuppression,
} from "./ui";

/**
 * Determine if output should be suppressed based on CLI options
 * @param options - CLI options object
 * @returns true if output should be suppressed, false otherwise
 */
const shouldSuppressOutput = (options: CliOptions): boolean =>
  CLI_CONSTANTS.QUIET_MODES.some((mode) => options[mode]) || !!options.head;

/**
 * Validate function name format and exit if invalid
 * @param functionName - The function name to validate
 * @throws Exits process with code 1 if function name is invalid
 */
const validateFunctionName = (functionName: string): void => {
  if (
    !functionName ||
    typeof functionName !== "string" ||
    functionName.trim() === ""
  ) {
    console.error(chalk.red("❌ Function name is required"));
    console.error(chalk.gray("💡 Tip: Use --help to see available functions"));
    process.exit(1);
  }
};

/**
 * Process parameters through the validation pipeline
 * @param params - JSON string of parameters
 * @param endpointDef - Endpoint definition containing schema and defaults
 * @returns Validated parameters object
 * @throws Error if parameters are invalid JSON or fail validation
 */
const processParameters = <I, O>(
  params: string,
  endpoint: Endpoint<I, O>
): CliParams => {
  // Parse JSON parameters with date coercion
  const userParams = (() => {
    try {
      return JSON.parse(params, (_, value) =>
        typeof value === "string" && CLI_CONSTANTS.ISO_DATE_REGEX.test(value)
          ? new Date(value)
          : value
      );
    } catch (error) {
      throw new Error(`Invalid JSON parameters: ${error}`);
    }
  })();

  // Apply defaults only if no parameters are provided
  const sampleParams = endpoint.sampleParams || {};
  const paramsWithDefaults =
    Object.keys(userParams).length > 0
      ? userParams
      : { ...sampleParams, ...userParams };

  return validateInputs(endpoint.inputSchema, paramsWithDefaults as I, {
    endpoint: endpoint.functionName || "unknown",
    logMode: "none",
    interpolatedUrl: endpoint.endpoint,
  }) as CliParams;
};

/**
 * Execute the API request with appropriate logging
 * @param endpoint - Endpoint definition with function name, endpoint URL, and input schema
 * @param params - Validated parameters to send with the request
 * @param options - CLI options for request configuration
 * @param isQuiet - Whether to suppress logging output
 * @param executor - Function to execute the API request
 * @returns Promise resolving to the API response data
 */
const executeRequest = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  options: CliOptions,
  isQuiet: boolean,
  executor: (
    endpoint: Endpoint<I, O>,
    params: CliParams,
    options: CliOptions
  ) => Promise<unknown>
): Promise<unknown> => {
  if (!isQuiet) {
    console.error(`🔍 Calling ${endpoint.functionName}...`);
  }

  return await executor(endpoint, params, options);
};

/**
 * Create a simple CLI tool with standardized options and behavior
 * @param name - CLI tool name (e.g., "fetch-dottie")
 * @param description - Brief description of the tool's purpose
 * @param version - Version string for the CLI tool
 * @param examples - Array of example usage strings to display in help
 * @param additionalHelpText - Optional additional help text to append
 */
export const createSimpleCli = (
  name: string,
  description: string,
  version: string,
  executor: (
    endpoint: Endpoint<unknown, unknown>,
    params: CliParams,
    options: CliOptions
  ) => Promise<unknown>,
  examples: string[] = [],
  additionalHelpText?: string
): void => {
  const program = new Command();

  program
    .name(name)
    .description(description)
    .version(version)
    .argument("<function-name>", "Name of the function to call")
    .argument(
      "[params]",
      "JSON string of parameters",
      CLI_CONSTANTS.DEFAULT_PARAMS
    )
    .option("--pretty", "Pretty-print JSON output with 2-space indentation")
    .option("--raw", "Output raw (unformatted) JSON")
    .option("--agent", "Agent mode: suppress debug output and verbose messages")
    .option("--quiet", "Quiet mode: suppress debug output and verbose messages")
    .option(
      "--silent",
      "Silent mode: suppress all output except final JSON result"
    )
    .option(
      "--fix-dates",
      "Convert .NET datetime strings to JS Date objects (native-fetch only)",
      false
    )
    .option(
      "--head <number>",
      "Truncate output to first N lines (equivalent to --quiet | jq . | head -N)",
      (value) => parseInt(value, 10)
    )
    .addHelpText(
      "after",
      additionalHelpText || generateHelpText(name, examples)
    );

  program.action(
    async (functionName: string, params: string, options: CliOptions) => {
      const isQuiet = shouldSuppressOutput(options);
      const consoleControl = setupConsoleSuppression(isQuiet);

      try {
        // Validate function name
        validateFunctionName(functionName);

        // Find endpoint
        const endpoint = findEndpointByFunctionName(functionName.trim());
        if (!endpoint) {
          consoleControl.restore();
          displayFunctionNotFound(functionName);
          process.exit(1);
        }

        // Process parameters
        const validatedParams = processParameters(params, endpoint);

        // Execute request
        const result = await executeRequest(
          endpoint,
          validatedParams,
          options,
          isQuiet,
          executor
        );

        // Output result
        consoleControl.restore();
        outputResult(result, options);
      } catch (error) {
        consoleControl.restore();
        handleError(error, functionName);
      }
    }
  );

  program.parse();
};
