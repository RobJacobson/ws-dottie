/**
 * Function execution logic for CLI
 */

import type { FunctionMetadata, CliOptions } from "../types";
import { parseParameters, validateParameters } from "../utils/validation";
import {
  setupConsoleSuppression,
  outputResult,
  handleError,
} from "../utils/output";

/**
 * Execute a CLI function with the given parameters
 */
export const executeFunction = async (
  functionName: string,
  paramsString: string,
  functionMeta: FunctionMetadata,
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
      functionMeta.paramsSchema,
      functionName
    );

    if (!isQuiet) {
      console.error(`🔍 Calling ${functionName}...`);
    }

    // Call the function with validated parameters
    // biome-ignore lint/suspicious/noExplicitAny: Needed for metadata
    const result = await (functionMeta.function as any)(validatedParams);

    // Restore console functions for final output
    consoleControl.restore();

    // Output result
    outputResult(result, options);
  } catch (error: unknown) {
    consoleControl.restore();
    handleError(error, functionName, isQuiet);
  }
};
