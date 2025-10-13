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

import pc from "picocolors";
import { endpoints } from "@/shared/endpoints";
import type { ApiError } from "@/shared/fetching";
import { isApiError } from "@/shared/fetching";
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

  console.error(pc.red(`❌ Error calling ${functionName}:`));
  console.error(pc.yellow(message));

  // Add context based on error type
  addErrorContext(error);

  // Add stack trace in debug mode for generic errors
  if (
    error instanceof Error &&
    !isApiError(error) &&
    error.stack &&
    process.env.NODE_ENV === "development"
  ) {
    console.error(pc.gray(error.stack));
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
    getApiErrorTip(error);
    return;
  }

  // Generic error context
  const message = extractErrorMessage(error);
  getGenericErrorTip(message);
};

/**
 * Extracts the error message from an unknown error type.
 * @param error - The error to extract the message from.
 * @returns The extracted error message as a string.
 */
const extractErrorMessage = (error: unknown): string => {
  return isApiError(error)
    ? error.message
    : error instanceof Error
      ? error.message
      : String(error);
};

/**
 * Provides context-specific tips for API errors based on status codes or message content.
 * @param error - The ApiError instance.
 */
const getApiErrorTip = (error: ApiError): void => {
  if (error.status && error.status >= 400) {
    if (error.status === 404) {
      console.error(
        pc.gray("💡 Tip: Check if the endpoint or parameters are correct")
      );
    } else if (error.status >= 500) {
      console.error(
        pc.gray(
          "💡 Tip: The API server may be experiencing issues. Try again later"
        )
      );
    } else if (error.status === 401 || error.status === 403) {
      console.error(pc.gray("💡 Tip: Check your API access permissions"));
    } else {
      console.error(
        pc.gray("💡 Tip: Check your request parameters and try again")
      );
    }
  } else if (error.message.includes("timeout")) {
    console.error(
      pc.gray("💡 Tip: The request timed out. Check your internet connection")
    );
  } else if (
    error.message.includes("network") ||
    error.message.includes("fetch")
  ) {
    console.error(pc.gray("💡 Tip: Check your internet connection"));
  }
};

/**
 * Provides context-specific tips for generic errors based on message content.
 * @param message - The error message string.
 */
const getGenericErrorTip = (message: string): void => {
  if (message.includes("Invalid JSON parameters")) {
    console.error(pc.gray("💡 Tip: Ensure your parameters are valid JSON"));
  } else if (
    message.includes("Parameter validation failed") ||
    message.includes("Validation failed")
  ) {
    console.error(
      pc.gray(
        "💡 Tip: Check the function documentation for required parameters"
      )
    );
  } else if (message.includes("not found")) {
    console.error(pc.gray("💡 Tip: Use --help to see available functions"));
  }
};

/**
 * Displays collision error when multiple endpoints have the same name
 *
 * This function provides a helpful error message when a requested function
 * name matches multiple endpoints, showing the user how to use namespace
 * syntax to disambiguate.
 *
 * @param endpointName - The endpoint name that has collisions
 * @param matchingEndpoints - Array of endpoints that match the name
 */
export const displayCollisionError = (
  endpointName: string,
  matchingEndpoints: Array<{
    api: string;
    functionName: string;
    urlTemplate: string;
  }>
): void => {
  console.error(
    pc.red(`❌ Multiple endpoints found with name '${endpointName}':`)
  );
  console.error(pc.yellow("Please use a fully-qualified name:"));
  console.error();

  matchingEndpoints.forEach((ep) => {
    console.error(pc.cyan(`  ${ep.api}:${endpointName}`));
    console.error(pc.gray(`    → ${ep.urlTemplate}`));
  });

  console.error();
  console.error(
    pc.gray(
      "💡 Tip: Use the format 'api:endpoint' to specify which endpoint you want"
    )
  );
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
  const allEndpoints = endpoints;
  const availableFunctions = allEndpoints.map((ep) => ep.functionName);
  console.error(pc.red(`❌ Function '${functionName}' not found`));
  console.error(pc.yellow("Available functions:"));
  availableFunctions.forEach((func) => {
    console.error(pc.gray(`  ${func}`));
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
  // Apply limit to array results if specified
  let outputResult = result;
  if (options.limit && options.limit > 0 && Array.isArray(result)) {
    outputResult = result.slice(0, options.limit);
  }

  // Handle concise output for arrays
  if (options.concise && Array.isArray(outputResult)) {
    outputConciseArray(outputResult, options);
    return;
  }

  const jsonString = JSON.stringify(
    outputResult,
    null,
    options.pretty ? 2 : undefined
  );

  if (options.limit && options.limit > 0 && !Array.isArray(result)) {
    // For non-array results, limit by lines (original behavior)
    const lines = jsonString.split("\n");
    const truncatedLines = lines.slice(0, options.limit);
    console.log(truncatedLines.join("\n"));
  } else {
    console.log(jsonString);
  }
};

/**
 * Outputs array in concise format: brackets on own lines, items indented and compact
 * Colors are automatically handled by picocolors based on TTY detection
 *
 * @param result - Array of items to output
 * @param options - CLI options controlling output format
 */
const outputConciseArray = (result: unknown[], options: CliOptions): void => {
  // Apply limit if specified
  const itemsToShow =
    options.limit && options.limit > 0
      ? result.slice(0, options.limit)
      : result;

  console.log("[");
  itemsToShow.forEach((item, index) => {
    const isLast = index === itemsToShow.length - 1;
    const colorizedItem = colorizeValue(item);
    console.log(`  ${colorizedItem}${isLast ? "" : ","}`);
  });
  console.log("]");
};

/**
 * Recursively colorizes a JavaScript value using picocolors
 * Handles all JSON types: objects, arrays, strings, numbers, booleans, null
 *
 * @param value - Value to colorize
 * @returns Colorized string representation
 */
const colorizeValue = (value: unknown): string => {
  // Handle null first (typeof null === 'object')
  if (value === null) return pc.yellow("null");

  // Handle arrays before objects (Array.isArray needed since typeof array === 'object')
  if (Array.isArray(value)) {
    const items = value.map(colorizeValue);
    return `[${items.join(",")}]`;
  }

  switch (typeof value) {
    case "string":
      return pc.green(`"${value}"`);
    case "number":
      return pc.cyan(String(value));
    case "boolean":
      return pc.yellow(String(value));
    case "object": {
      const entries = Object.entries(value).map(
        ([key, val]) => `${pc.gray(`"${key}"`)}:${colorizeValue(val)}`
      );
      return `{${entries.join(",")}}`;
    }
    default:
      return String(value);
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
    `${toolName} fareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-01-27"}'`,
    `${toolName} vesselLocationsById  # Uses default vesselId: 1`,
    `${toolName} getBorderCrossings --no-validation`,
  ];

  return [...baseExamples, ...additionalExamples];
};

/**
 * Generates CLI examples showing different fetch strategies
 *
 * This function creates examples that demonstrate the different fetch strategies
 * available in the CLI tool, including native/JSONP and validation options.
 *
 * @returns Array of example command strings
 */
export const generateExamples = (): string[] => {
  return [
    "# Default: native fetch with validation",
    "fetch-dottie vesselBasics",
    "",
    "# Using namespace syntax for disambiguation",
    "fetch-dottie wsf-fares:cacheFlushDate",
    "fetch-dottie wsf-schedule:cacheFlushDate",
    "",
    "# Native fetch without validation (faster, raw data)",
    "fetch-dottie vesselBasics --no-validation",
    "",
    "# JSONP with validation (browser environments)",
    "fetch-dottie vesselBasics --jsonp",
    "",
    "# JSONP without validation (browser environments, raw data)",
    "fetch-dottie vesselBasics --jsonp --no-validation",
    "",
    "# With parameters and pretty printing",
    'fetch-dottie fareLineItems \'{"originTerminalId": 7, "destinationTerminalId": 3}\' --pretty',
    "",
    "# Quiet mode for scripting",
    "fetch-dottie getBorderCrossings --quiet",
  ];
};

/**
 * Generates help text with strategy examples and available functions
 *
 * This function creates comprehensive help text for the CLI tool,
 * including examples of different fetch strategies and a list of all available functions.
 *
 * @param toolName - Name of the CLI tool
 * @param examples - Array of example commands to include
 * @returns Formatted help text string
 */
export const generateHelpText = (
  _toolName: string,
  _examples: string[] = []
): string => {
  const allEndpoints = endpoints;
  const functionList = endpoints
    .map((endpointDef) => {
      const functionName = endpointDef.functionName;
      const api = endpointDef.api;
      const description = `${api} - ${functionName}`;
      return `  ${pc.cyan(functionName)} - ${description}`;
    })
    .join("\n");

  const exampleList = _examples.length > 0 ? _examples : generateExamples();

  return `
Examples:
${exampleList.map((ex) => `  ${ex}`).join("\n")}

Function Names:
  Simple: fetch-dottie vesselBasics
  Namespace: fetch-dottie wsf-fares:cacheFlushDate (for disambiguation)

Fetch Strategies:
  Default: Native fetch with Zod validation (recommended)
  --no-validation: Disable validation for faster, raw data access
  --jsonp: Use JSONP for browser environments (bypasses CORS)
  --jsonp --no-validation: JSONP without validation (browser, raw data)

Available functions:
${functionList}

For more information about parameters, see the ws-dottie documentation.
`;
};
