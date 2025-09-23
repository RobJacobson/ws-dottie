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
import { getAllEndpoints } from "@/shared/endpoints";
import { executeApiRequest, getStrategyDescription } from "./execution";
import { CLI_CONSTANTS, type CliOptions, type CliParams } from "./types";
import {
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
          consoleControl.restore();
          const endpoints = getAllEndpoints();
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
        const endpoints = getAllEndpoints();
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
