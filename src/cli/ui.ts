/**
 * @fileoverview UI and Output Utilities for WS-Dottie CLI
 *
 * This module provides user interface and output utilities for WS-Dottie
 * command-line tools. It includes error handling, output formatting,
 * console control, and help text generation functionality.
 *
 * ## Key Features
 *
 * - **Error Handling**: Comprehensive error handling with helpful context and tips
 * - **Output Formatting**: Pretty-printing, truncation, and formatting options
 * - **Console Control**: Suppression and restoration of console output
 * - **Help Generation**: Dynamic help text with examples and function listings
 * - **User Feedback**: Colored output and informative messages
 */

import chalk from "chalk";
import { discoverEndpoints } from "@/shared/endpoints";
import { isApiError } from "@/shared/fetching/handleError";
import type { CliOptions } from "./types";

/**
 * Handles errors with consistent formatting and helpful context
 *
 * This function provides comprehensive error handling for CLI tools, including
 * error message extraction, context-specific tips, and appropriate exit codes.
 * It handles both ApiError instances and generic errors with different
 * formatting and context information.
 *
 * @param error - The error to handle (can be any type)
 * @param functionName - Name of the function that caused the error
 * @throws Never returns, always exits process with code 1
 */
export const handleError = (error: unknown, functionName: string): never => {
  // Extract message based on error type - use the actual error message
  const message = isApiError(error)
    ? error.message
    : error instanceof Error
      ? error.message
      : String(error);

  console.error(chalk.red(`❌ Error calling ${functionName}:`));
  console.error(chalk.yellow(message));

  // Add context based on error type
  addErrorContext(error);

  // Add stack trace in debug mode for generic errors
  if (
    error instanceof Error &&
    !isApiError(error) &&
    error.stack &&
    process.env.NODE_ENV === "development"
  ) {
    console.error(chalk.gray(error.stack));
  }

  process.exit(1);
};

/**
 * Adds helpful context based on error type
 *
 * This function analyzes the error type and provides context-specific tips
 * to help users resolve common issues. It handles both ApiError instances
 * and generic errors with appropriate guidance.
 *
 * @param error - The error to add context for
 */
const addErrorContext = (error: unknown): void => {
  if (isApiError(error)) {
    // Provide context based on HTTP status codes
    if (error.status && error.status >= 400) {
      if (error.status === 404) {
        console.error(
          chalk.gray("💡 Tip: Check if the endpoint or parameters are correct")
        );
      } else if (error.status >= 500) {
        console.error(
          chalk.gray(
            "💡 Tip: The API server may be experiencing issues. Try again later"
          )
        );
      } else if (error.status === 401 || error.status === 403) {
        console.error(chalk.gray("💡 Tip: Check your API access permissions"));
      } else {
        console.error(
          chalk.gray("💡 Tip: Check your request parameters and try again")
        );
      }
    } else if (error.message.includes("timeout")) {
      console.error(
        chalk.gray(
          "💡 Tip: The request timed out. Check your internet connection"
        )
      );
    } else if (
      error.message.includes("network") ||
      error.message.includes("fetch")
    ) {
      console.error(chalk.gray("💡 Tip: Check your internet connection"));
    }
    return;
  }

  // Generic error context
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Invalid JSON parameters")) {
    console.error(chalk.gray("💡 Tip: Ensure your parameters are valid JSON"));
  } else if (
    message.includes("Parameter validation failed") ||
    message.includes("Validation failed")
  ) {
    console.error(
      chalk.gray(
        "💡 Tip: Check the function documentation for required parameters"
      )
    );
  } else if (message.includes("not found")) {
    console.error(chalk.gray("💡 Tip: Use --help to see available functions"));
  }
};

/**
 * Displays function not found error with list of available functions
 *
 * This function provides a helpful error message when a requested function
 * is not found, including a list of all available functions to help users
 * find the correct function name.
 *
 * @param functionName - The function name that was not found
 */
export const displayFunctionNotFound = (functionName: string): void => {
  const endpoints = discoverEndpoints();
  const availableFunctions = endpoints.map((ep) => ep.functionName);
  console.error(chalk.red(`❌ Function '${functionName}' not found`));
  console.error(chalk.yellow("Available functions:"));
  availableFunctions.forEach((func) => {
    console.error(chalk.gray(`  ${func}`));
  });
};

/**
 * Outputs result with formatting based on CLI options
 *
 * This function formats and outputs the API response data according to
 * the specified CLI options, including pretty-printing and truncation.
 *
 * @param result - The result data to output
 * @param options - CLI options controlling output format (pretty, head, etc.)
 */
export const outputResult = (result: unknown, options: CliOptions): void => {
  const jsonString = JSON.stringify(
    result,
    null,
    options.pretty ? 2 : undefined
  );

  if (options.head && options.head > 0) {
    const lines = jsonString.split("\n");
    const truncatedLines = lines.slice(0, options.head);
    console.log(truncatedLines.join("\n"));
  } else {
    console.log(jsonString);
  }
};

/**
 * Sets up console suppression for quiet modes
 *
 * This function provides console output suppression for quiet and silent modes.
 * It returns an object with a restore method to re-enable console output
 * when needed.
 *
 * @param isQuiet - Whether to suppress console output
 * @returns Object with restore method to re-enable console output
 */
export const setupConsoleSuppression = (isQuiet: boolean) => {
  if (!isQuiet) return { restore: () => {} };

  const originalLog = console.log;
  const originalError = console.error;

  // Suppress all console output
  console.log = console.error = () => {};

  return {
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
    },
  };
};

/**
 * Generates default CLI examples for a given tool name
 *
 * This function creates a set of example commands that demonstrate common
 * usage patterns for WS-Dottie CLI tools. It includes both basic and
 * advanced examples to help users understand the tool's capabilities.
 *
 * @param toolName - Name of the CLI tool (e.g., "fetch-dottie", "fetch-native")
 * @param additionalExamples - Additional examples to include
 * @returns Array of example command strings
 */
export const generateDefaultExamples = (
  toolName: string,
  additionalExamples: string[] = []
): string[] => {
  const baseExamples = [
    `${toolName} getBorderCrossings`,
    `${toolName} getBridgeClearances '{"route": "005"}'`,
    `${toolName} getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-01-27"}'`,
    `${toolName} getVesselLocationsByVesselId  # Uses default vesselId: 1`,
    `${toolName} getBorderCrossings --raw`,
  ];

  return [...baseExamples, ...additionalExamples];
};

/**
 * Generates help text with examples and available functions
 *
 * This function creates comprehensive help text for CLI tools, including
 * example commands and a list of all available functions. It dynamically
 * discovers endpoints and formats them for display.
 *
 * @param toolName - Name of the CLI tool
 * @param examples - Array of example commands to include
 * @returns Formatted help text string
 */
export const generateHelpText = (
  toolName: string,
  examples: string[] = []
): string => {
  const endpoints = discoverEndpoints();
  const functionList = endpoints
    .map((endpointDef) => {
      const functionName = endpointDef.functionName;
      const api = endpointDef.api;
      const description = `${api} - ${functionName}`;
      return `  ${chalk.cyan(functionName)} - ${description}`;
    })
    .join("\n");

  const defaultExamples = generateDefaultExamples(toolName);

  const exampleList = examples.length > 0 ? examples : defaultExamples;

  return `
Examples:
${exampleList.map((ex) => `  ${ex}`).join("\n")}

Available functions:
${functionList}

For more information about parameters, see the ws-dottie documentation.
`;
};
