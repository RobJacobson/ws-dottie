/**
 * UI and output utilities
 */

import chalk from "chalk";
import type { CliOptions } from "./types";
import { getAllEndpoints, getAvailableFunctions } from "./endpoints";

/**
 * Handle errors with consistent formatting
 */
export const handleError = (error: unknown, functionName: string): never => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`❌ Error calling ${functionName}:`));
  console.error(chalk.yellow(message));

  // Add helpful context for common errors
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

  process.exit(1);
};

/**
 * Display function not found error
 */
export const displayFunctionNotFound = (functionName: string): void => {
  const availableFunctions = getAvailableFunctions();
  console.error(chalk.red(`❌ Function '${functionName}' not found`));
  console.error(chalk.yellow("Available functions:"));
  availableFunctions.forEach((func) => {
    console.error(chalk.gray(`  ${func}`));
  });
};

/**
 * Output result with formatting
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
 */
export const setupConsoleSuppression = (isQuiet: boolean) => {
  if (!isQuiet) return { restore: () => {} };

  const originalLog = console.log;
  const originalError = console.error;
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
 * Generate help text
 */
export const generateHelpText = (
  toolName: string,
  examples: string[] = []
): string => {
  const endpoints = getAllEndpoints();
  const functionList = Object.entries(endpoints)
    .map(([key, endpointDef]) => {
      const functionName = key.replace("Meta", "");
      const description =
        endpointDef.meta.outputSchema.description ||
        `${endpointDef.meta.api} - ${endpointDef.meta.function}`;
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
