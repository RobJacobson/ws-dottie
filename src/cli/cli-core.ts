#!/usr/bin/env node

/**
 * @fileoverview CLI Core Utilities for WS-Dottie
 *
 * This module provides the core CLI functionality for WS-Dottie command-line tools,
 * including a functional approach to CLI creation that eliminates over-engineering
 * while maintaining all necessary functionality. It provides standardized options,
 * parameter validation, and execution flow for both validated and native API clients.
 *
 * ## Key Features
 *
 * - **Standardized CLI Creation**: Factory function for creating consistent CLI tools
 * - **Parameter Validation**: Automatic JSON parsing and Zod validation
 * - **Error Handling**: Comprehensive error handling with helpful context
 * - **Output Control**: Support for quiet, silent, and pretty-print modes
 * - **Function Discovery**: Automatic endpoint discovery and listing
 * - **Date Coercion**: Automatic conversion of ISO date strings to Date objects
 *
 * ## Usage
 *
 * This module is used by both `fetch-dottie` and `fetch-native` CLI tools to provide
 * consistent behavior and user experience across all WS-Dottie command-line interfaces.
 */

import chalk from "chalk";
import { Command } from "commander";
import { z } from "zod";
import type { Endpoint } from "@/shared/endpoints";
import { discoverEndpoints } from "@/shared/endpoints";
import { CLI_CONSTANTS, type CliOptions, type CliParams } from "./types";
import {
  displayFunctionNotFound,
  generateHelpText,
  handleError,
  outputResult,
  setupConsoleSuppression,
} from "./ui";

/**
 * Validates input parameters against a Zod schema
 *
 * This function performs runtime validation of input parameters using
 * a provided Zod schema. It provides detailed error messages for
 * validation failures and includes context information for debugging.
 *
 * @template T - The expected type of the validated parameters
 * @param schema - The Zod schema to validate against
 * @param params - The parameters to validate
 * @param context - Context information for error reporting
 * @returns The validated parameters
 * @throws Error if validation fails with detailed error message
 */
function validateInputs<T>(
  schema: z.ZodSchema<T>,
  params: unknown,
  context: { endpoint: string; logMode?: string }
): T {
  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Validation failed for ${context.endpoint}: ${error.message}`;
      throw new Error(errorMessage);
    }
    throw error;
  }
}

/**
 * Determines if output should be suppressed based on CLI options
 *
 * This function checks if any quiet modes are enabled or if the head option
 * is specified, which would suppress normal output in favor of truncated results.
 *
 * @param options - CLI options object containing quiet/silent flags and head count
 * @returns True if output should be suppressed, false otherwise
 */
const shouldSuppressOutput = (options: CliOptions): boolean =>
  CLI_CONSTANTS.QUIET_MODES.some((mode) => options[mode]) || !!options.head;

/**
 * Validates function name format and exits if invalid
 *
 * This function performs basic validation on the function name parameter,
 * ensuring it's a non-empty string. If validation fails, it displays
 * helpful error messages and exits the process.
 *
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
 * Processes parameters through the validation pipeline
 *
 * This function handles the complete parameter processing workflow:
 * 1. Parses JSON parameters with automatic date coercion
 * 2. Applies default values from endpoint sample parameters
 * 3. Validates parameters against the endpoint's input schema
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param params - JSON string of parameters from command line
 * @param endpoint - Endpoint definition containing schema and defaults
 * @returns Validated parameters object ready for API calls
 * @throws Error if parameters are invalid JSON or fail validation
 */
const processParameters = <I, O>(
  params: string,
  endpoint: Endpoint<I, O>
): CliParams => {
  // Parse JSON parameters with automatic date coercion for ISO date strings
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
  }) as CliParams;
};

/**
 * Executes the API request with appropriate logging
 *
 * This function handles the execution of API requests with conditional
 * logging based on the quiet mode setting. It delegates the actual
 * API call to the provided executor function.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param endpoint - Endpoint definition with function name, endpoint URL, and input schema
 * @param params - Validated parameters to send with the request
 * @param options - CLI options for request configuration
 * @param isQuiet - Whether to suppress logging output
 * @param executor - Function to execute the API request (fetchZod or fetchNative)
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
 * Creates a simple CLI tool with standardized options and behavior
 *
 * This factory function creates a complete CLI tool using Commander.js with
 * standardized options, argument handling, and execution flow. It provides
 * a consistent interface for both validated and native API clients.
 *
 * ## Features
 *
 * - Standardized command-line arguments and options
 * - Automatic endpoint discovery and validation
 * - Parameter parsing with JSON validation and date coercion
 * - Comprehensive error handling with helpful context
 * - Output formatting with pretty-print and truncation options
 * - Built-in help text with examples and function listings
 *
 * @param name - CLI tool name (e.g., "fetch-dottie", "fetch-native")
 * @param description - Brief description of the tool's purpose
 * @param executor - Function to execute API requests (fetchZod or fetchNative)
 * @param examples - Array of example usage strings to display in help
 * @param additionalHelpText - Optional additional help text to append
 */
export const createSimpleCli = (
  name: string,
  description: string,
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
    .argument("[function-name]", "Name of the function to call")
    .argument(
      "[params]",
      "JSON string of parameters",
      CLI_CONSTANTS.DEFAULT_PARAMS
    )
    .option("--list", "List all available endpoints")
    .option("--pretty", "Pretty-print JSON output with 2-space indentation")
    .option("--quiet", "Quiet mode: suppress debug output and verbose messages")
    .option(
      "--silent",
      "Silent mode: suppress all output except final JSON result"
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
        // Handle --list option
        if (options.list) {
          consoleControl.restore();
          const endpoints = discoverEndpoints();
          const functionList = endpoints
            .map((endpointDef) => {
              const functionName = endpointDef.functionName;
              const api = endpointDef.api;
              const description = `${api} - ${functionName}`;
              return `  ${chalk.cyan(functionName)} - ${description}`;
            })
            .join("\n");

          console.log("Available endpoints:");
          console.log(functionList);
          return;
        }

        // Validate function name (only if not using --list)
        if (!options.list) {
          validateFunctionName(functionName);
        }

        // Find endpoint
        const endpoints = discoverEndpoints();
        const endpoint = endpoints.find(
          (ep) => ep.functionName === functionName.trim()
        );
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
