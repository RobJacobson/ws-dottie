#!/usr/bin/env node

/**
 * Simplified CLI utilities
 *
 * A functional approach to CLI tools that eliminates over-engineering
 * while maintaining all functionality.
 */

import chalk from "chalk";
import { Command } from "commander";
import {
  applyDefaults,
  findEndpoint,
  parseParams,
  validateParams,
} from "./utils/endpoints";
import { executeNative, executeValidated } from "./utils/execution";
import { CLI_CONSTANTS, type CliOptions } from "./utils/types";
import {
  displayFunctionNotFound,
  generateHelpText,
  handleError,
  outputResult,
  setupConsoleSuppression,
} from "./utils/ui";

/**
 * Create a simple CLI tool
 */
export const createSimpleCli = (
  name: string,
  description: string,
  version: string,
  useValidated: boolean,
  examples: string[] = [],
  additionalHelpText?: string
): void => {
  const program = new Command();

  program
    .name(name)
    .description(description)
    .version(version)
    .argument("<function-name>", "Name of the function to call")
    .argument(
      "[params]",
      "JSON string of parameters",
      CLI_CONSTANTS.DEFAULT_PARAMS
    )
    .option("--pretty", "Pretty-print JSON output with 2-space indentation")
    .option("--raw", "Output raw (unformatted) JSON")
    .option("--agent", "Agent mode: suppress debug output and verbose messages")
    .option("--quiet", "Quiet mode: suppress debug output and verbose messages")
    .option(
      "--silent",
      "Silent mode: suppress all output except final JSON result"
    )
    .option(
      "--fix-dates",
      "Convert .NET datetime strings to JS Date objects (native-fetch only)",
      false
    )
    .option(
      "--head <number>",
      "Truncate output to first N lines (equivalent to --quiet | jq . | head -N)",
      (value) => parseInt(value, 10)
    )
    .addHelpText(
      "after",
      additionalHelpText || generateHelpText(name, examples)
    );

  program.action(
    async (functionName: string, params: string, options: CliOptions) => {
      // Enable quiet mode when --head is used (equivalent to --quiet | jq . | head -N)
      const isQuiet =
        CLI_CONSTANTS.QUIET_MODES.some((mode) => options[mode]) ||
        !!options.head;
      const consoleControl = setupConsoleSuppression(isQuiet);

      try {
        // Validate function name format
        if (
          !functionName ||
          typeof functionName !== "string" ||
          functionName.trim() === ""
        ) {
          consoleControl.restore();
          console.error(chalk.red("❌ Function name is required"));
          console.error(
            chalk.gray("💡 Tip: Use --help to see available functions")
          );
          process.exit(1);
        }

        const endpointDef = findEndpoint(functionName.trim());
        if (!endpointDef) {
          consoleControl.restore();
          displayFunctionNotFound(functionName);
          process.exit(1);
        }

        const userParams = parseParams(params);
        const paramsWithDefaults = applyDefaults(endpointDef, userParams);
        const validatedParams = validateParams(paramsWithDefaults, endpointDef);

        if (!isQuiet) {
          console.error(`🔍 Calling ${functionName}...`);
        }

        const result = useValidated
          ? await executeValidated(endpointDef, validatedParams)
          : await executeNative(endpointDef, validatedParams, options);

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
