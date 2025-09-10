/**
 * CLI command handling
 */

import chalk from "chalk";
import type { CliOptions } from "../types";
import type { EndpointDefinition } from "@/shared/endpoints";
import { executeFunction } from "./execute";
import { displayFunctionNotFound } from "../utils/output";

// Import all endpoints to get the type information
import * as allEndpoints from "../../clients";

/**
 * Type guard to check if a value is an endpoint definition
 */
const isEndpointDefinition = (
  value: unknown
): value is EndpointDefinition<unknown, unknown> =>
  typeof value === "object" &&
  value !== null &&
  "meta" in value &&
  "handleFetch" in value &&
  "queryOptions" in value;

/**
 * Get all endpoint definitions from the clients module
 */
const getAllEndpointDefinitions = (): Record<
  string,
  EndpointDefinition<unknown, unknown>
> => {
  const result: Record<string, EndpointDefinition<unknown, unknown>> = {};

  Object.entries(allEndpoints)
    .filter(([key]) => key.endsWith("Def"))
    .forEach(([key, value]) => {
      if (isEndpointDefinition(value)) {
        result[key] = value;
      }
    });

  return result;
};

/**
 * Handle CLI command execution
 */
export const handleCommand = async (
  functionName: string,
  paramsString: string,
  options: CliOptions
): Promise<void> => {
  // Get all endpoint definitions
  const endpointDefs = getAllEndpointDefinitions();
  const endpointDefKey = `${functionName}Def`;
  const endpointDef = endpointDefs[endpointDefKey];

  if (!endpointDef) {
    const availableFunctions = getAvailableFunctions();
    displayFunctionNotFound(
      functionName,
      availableFunctions,
      options.agent || options.quiet || options.silent
    );
    return;
  }

  // Execute the function using the endpoint definition
  await executeFunction(functionName, paramsString, endpointDef, options);
};

/**
 * Get list of available function names
 */
export const getAvailableFunctions = (): string[] => {
  const endpointDefs = getAllEndpointDefinitions();
  return Object.keys(endpointDefs).map((key) => key.replace("Def", ""));
};

/**
 * Generate help text with available functions
 */
export const generateHelpText = (): string => {
  const endpointDefs = getAllEndpointDefinitions();
  const functionList = Object.entries(endpointDefs)
    .map(([key, endpointDef]) => {
      const functionName = key.replace("Def", "");
      // Extract description from output schema or use function name
      const description =
        endpointDef.meta.outputSchema.description ||
        `${endpointDef.meta.moduleGroup} - ${endpointDef.meta.functionName}`;
      return `  ${chalk.cyan(functionName)} - ${description}`;
    })
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
