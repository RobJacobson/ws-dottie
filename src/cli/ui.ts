/**
 * UI and output utilities
 */

import chalk from "chalk";
import { WsdotApiError } from "@/shared/fetching/handleErrors";
import { getAllEndpoints, getAvailableFunctionNames } from "@/shared/endpoints";
import type { CliOptions } from "./types";

/**
 * Handle errors with consistent formatting and helpful context
 * @param error - The error to handle (can be any type)
 * @param functionName - Name of the function that caused the error
 * @throws Never returns, always exits process with code 1
 */
export const handleError = (error: unknown, functionName: string): never => {
  // Extract message based on error type
  const message =
    error instanceof WsdotApiError
      ? error.userMessage
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
    !(error instanceof WsdotApiError) &&
    error.stack &&
    process.env.NODE_ENV === "development"
  ) {
    console.error(chalk.gray(error.stack));
  }

  process.exit(1);
};

/**
 * Add helpful context based on error type
 * @param error - The error to add context for
 */
const addErrorContext = (error: unknown): void => {
  if (error instanceof WsdotApiError) {
    if (error.code === "API_ERROR") {
      console.error(chalk.gray("💡 Tip: Check your API key and parameters"));
    } else if (error.code === "NETWORK_ERROR") {
      console.error(chalk.gray("💡 Tip: Check your internet connection"));
    } else if (error.code === "TRANSFORM_ERROR") {
      console.error(
        chalk.gray(
          "💡 Tip: Check the function documentation for required parameters"
        )
      );
    }
    return;
  }

  // Generic error context
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("Invalid JSON parameters")) {
    console.error(chalk.gray("💡 Tip: Ensure your parameters are valid JSON"));
  } else if (message.includes("Parameter validation failed")) {
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
 * Display function not found error with list of available functions
 * @param functionName - The function name that was not found
 */
export const displayFunctionNotFound = (functionName: string): void => {
  const availableFunctions = getAvailableFunctionNames();
  console.error(chalk.red(`❌ Function '${functionName}' not found`));
  console.error(chalk.yellow("Available functions:"));
  availableFunctions.forEach((func) => {
    console.error(chalk.gray(`  ${func}`));
  });
};

/**
 * Output result with formatting based on CLI options
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
 * Setup console suppression for quiet modes
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
 * Generate default CLI examples for a given tool name
 * @param toolName - Name of the CLI tool
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
 * Generate help text with examples and available functions
 * @param toolName - Name of the CLI tool
 * @param examples - Array of example commands to include
 * @returns Formatted help text string
 */
export const generateHelpText = (
  toolName: string,
  examples: string[] = []
): string => {
  const endpoints = getAllEndpoints();
  const functionList = Object.entries(endpoints)
    .map(([key, endpointDef]) => {
      const functionName = key;
      const api = endpointDef.api || endpointDef.id.split("/")[0];
      const functionDisplayName =
        endpointDef.functionName || endpointDef.id.split("/")[1];
      const description = `${api} - ${functionDisplayName}`;
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
