/**
 * CLI command handling
 */

import chalk from "chalk";
import type { CliOptions } from "../types";
import { FUNCTION_REGISTRY } from "../registry";
import { executeFunction } from "./execute";
import { displayFunctionNotFound } from "../utils/output";

/**
 * Handle CLI command execution
 */
export const handleCommand = async (
  functionName: string,
  paramsString: string,
  options: CliOptions
): Promise<void> => {
  // Validate function exists
  if (!(functionName in FUNCTION_REGISTRY)) {
    const availableFunctions = Object.keys(FUNCTION_REGISTRY);
    displayFunctionNotFound(
      functionName,
      availableFunctions,
      options.agent || options.quiet || options.silent
    );
  }

  // Get function metadata
  const functionMeta =
    FUNCTION_REGISTRY[functionName as keyof typeof FUNCTION_REGISTRY];

  // Execute the function
  await executeFunction(functionName, paramsString, functionMeta, options);
};

/**
 * Generate help text with available functions
 */
export const generateHelpText = (): string => {
  const functionList = Object.entries(FUNCTION_REGISTRY)
    .map(([name, meta]) => `  ${chalk.cyan(name)} - ${meta.description}`)
    .join("\n");

  return `
Examples:
  $ ws-dottie getBorderCrossings
  $ ws-dottie getBridgeClearances '{"route": "005"}'
  $ ws-dottie getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-01-27"}'
  $ ws-dottie getBorderCrossings --raw

Available functions:
${functionList}

For more information about parameters, see the ws-dottie documentation.
`;
};
