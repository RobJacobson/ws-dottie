#!/usr/bin/env node

/**
 * @fileoverview CLI Setup and Command Handling for WS-Dottie
 *
 * This module provides the main CLI setup and command handling for the fetch-dottie
 * command-line tool, including support for transport and validation flags.
 */

import chalk from "chalk";
import { Command } from "commander";
import type { Endpoint } from "@/shared/endpoints";
import { ENDPOINT_SEPARATOR, getAllEndpoints } from "@/shared/endpoints";
import { executeApiRequest, getStrategyDescription } from "./execution";
import { CLI_CONSTANTS, type CliOptions, type CliParams } from "./types";
import {
  displayCollisionError,
  displayFunctionNotFound,
  generateHelpText,
  handleError,
  outputResult,
  setupConsoleSuppression,
} from "./ui";
import { processParameters } from "./validation";

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
 * Sets up and runs the CLI tool
 */
export const setupCli = (): void => {
  const program = new Command();

  program
    .name("fetch-dottie")
    .description(
      "WSDOT/WSF API client with configurable transport and validation"
    )
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
    .option(
      "--jsonp",
      "Use JSONP instead of native fetch (for browser environments)"
    )
    .option(
      "--no-validation",
      "Disable Zod validation (use raw fetch with .NET date conversion)"
    )
    .addHelpText("after", generateHelpText("fetch-dottie"));

  program.action(
    async (functionName: string, params: string, options: CliOptions) => {
      const isQuiet = shouldSuppressOutput(options);
      const consoleControl = setupConsoleSuppression(isQuiet);

      try {
        // Handle --list option
        if (options.list) {
          handleListOption(consoleControl.restore);
        }

        // Only validate function name if not listing endpoints
        if (!options.list) {
          validateFunctionName(functionName);
        }

        // Parse function name and find endpoint
        const endpoint = findEndpoint(functionName, consoleControl.restore);

        // Process parameters
        const validatedParams = processParameters(params, endpoint);

        // Execute request
        const result = await executeRequest(
          endpoint,
          validatedParams,
          options,
          isQuiet
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

/**
 * Handles the --list option, displaying all available endpoints and then exiting.
 * @param consoleRestore - Function to restore the console output.
 */
const handleListOption = (consoleRestore: () => void): void => {
  consoleRestore();
  const endpoints = getAllEndpoints();
  const functionList = endpoints
    .map((endpointDef) => {
      const { functionName, api } = endpointDef;
      const description = `${api} - ${functionName}`;
      return `  ${chalk.cyan(functionName)} - ${description}`;
    })
    .join("\n");

  console.log("Available endpoints:");
  console.log(functionList);
  process.exit(0);
};

/**
 * Parses function name to extract API namespace and endpoint name
 *
 * This function handles both namespace syntax (api:endpoint) and simple
 * endpoint names. It returns an object with the parsed components.
 *
 * @param functionName - The function name to parse (e.g., "api:endpoint" or "endpoint")
 * @returns Object with api and endpoint properties
 */
const parseFunctionName = (
  functionName: string
): { api?: string; endpoint: string } => {
  const trimmed = functionName.trim();
  const separatorIndex = trimmed.indexOf(ENDPOINT_SEPARATOR);

  if (separatorIndex === -1) {
    // No namespace, just endpoint name
    return { endpoint: trimmed };
  }

  // Has namespace
  const api = trimmed.substring(0, separatorIndex);
  const endpoint = trimmed.substring(separatorIndex + 1);

  return { api, endpoint };
};

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
 * Finds an endpoint based on the function name, handling namespaces and collisions.
 * Exits the process with an error if the function is not found or if there are collisions.
 *
 * @param functionName - The function name provided by the user.
 * @param consoleRestore - Function to restore the console output.
 * @returns The found Endpoint object.
 */
const findEndpoint = (
  functionName: string,
  consoleRestore: () => void
): Endpoint<unknown, unknown> => {
  const { api, endpoint: endpointName } = parseFunctionName(functionName);
  const endpoints = getAllEndpoints();

  let endpoint: Endpoint<unknown, unknown> | undefined;

  if (api) {
    // Namespace specified - find exact match
    endpoint = endpoints.find(
      (ep) => ep.api === api && ep.functionName === endpointName
    );
  } else {
    // No namespace - check for collisions
    const matchingEndpoints = endpoints.filter(
      (ep) => ep.functionName === endpointName
    );

    if (matchingEndpoints.length === 0) {
      // No matches found
      endpoint = undefined;
    } else if (matchingEndpoints.length === 1) {
      // Single match - use it
      endpoint = matchingEndpoints[0];
    } else {
      // Multiple matches - show collision error
      consoleRestore();
      displayCollisionError(endpointName, matchingEndpoints);
      process.exit(1);
    }
  }

  if (!endpoint) {
    consoleRestore();
    displayFunctionNotFound(functionName);
    process.exit(1);
  }

  return endpoint;
};

/**
 * Executes the API request with appropriate logging
 *
 * This function handles the execution of API requests with conditional
 * logging based on the quiet mode setting.
 *
 * @template I - The input parameters type for the endpoint
 * @template O - The output response type for the endpoint
 * @param endpoint - Endpoint definition with function name, endpoint URL, and input schema
 * @param params - Validated parameters to send with the request
 * @param options - CLI options for request configuration
 * @param isQuiet - Whether to suppress logging output
 * @returns Promise resolving to the API response data
 */
const executeRequest = async <I, O>(
  endpoint: Endpoint<I, O>,
  params: CliParams,
  options: CliOptions,
  isQuiet: boolean
): Promise<unknown> => {
  if (!isQuiet) {
    const strategy = getStrategyDescription(options);
    console.error(`🔍 Calling ${endpoint.functionName} (${strategy})...`);
  }

  return await executeApiRequest(endpoint, params as I, options);
};
