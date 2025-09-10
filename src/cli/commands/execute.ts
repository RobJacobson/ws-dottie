/**
 * Function execution logic for CLI
 */

import type { CliOptions } from "../types";
import type { EndpointDefinition } from "@/shared/endpoints";
import { parseParameters, validateParameters } from "../utils/validation";
import {
  setupConsoleSuppression,
  outputResult,
  handleError,
} from "../utils/output";

/**
 * Execute a CLI function with the given parameters
 */
export const executeFunction = async <I, O>(
  functionName: string,
  paramsString: string,
  endpointDef: EndpointDefinition<I, O>,
  options: CliOptions
): Promise<void> => {
  const isQuiet = options.agent || options.quiet || options.silent;

  // Setup console suppression
  const consoleControl = setupConsoleSuppression(isQuiet);

  try {
    // Parse parameters
    const params = parseParameters(paramsString);

    // Validate parameters against schema
    const validatedParams = validateParameters(
      params,
      endpointDef.meta.inputSchema,
      functionName
    );

    if (!isQuiet) {
      console.error(`🔍 Calling ${functionName}...`);
    }

    // Call the function with validated parameters
    const result = await endpointDef.handleFetch(validatedParams as I);

    // Restore console functions for final output
    consoleControl.restore();

    // Output result
    outputResult(result, options);
  } catch (error: unknown) {
    consoleControl.restore();
    handleError(error, functionName, isQuiet);
  }
};
