/**
 * CLI output utilities
 */

import chalk from "chalk";
import type { CliOptions } from "../types";

/**
 * Setup console output suppression for quiet modes
 */
export const setupConsoleSuppression = (isQuiet: boolean) => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalStdoutWrite = process.stdout.write;

  if (isQuiet) {
    console.log = () => {}; // Suppress all log output
    console.error = () => {}; // Suppress error output
    // biome-ignore lint/suspicious/noExplicitAny: Node typings
    (process.stdout as any).write = (..._args: unknown[]) => true;
  }

  return {
    restore: () => {
      if (isQuiet) {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        // biome-ignore lint/suspicious/noExplicitAny: Node typings
        (process.stdout as any).write = originalStdoutWrite as unknown as (
          ...args: unknown[]
        ) => boolean;
      }
    },
  };
};

/**
 * Output the final result
 */
export const outputResult = (result: any, options: CliOptions) => {
  const prettyPrint = options.pretty && !options.raw;

  if (prettyPrint) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(JSON.stringify(result));
  }
};

/**
 * Handle and display errors
 */
export const handleError = (
  error: unknown,
  functionName: string,
  isQuiet: boolean
) => {
  const err = error as Error;

  // Note: Console restoration is handled by setupConsoleSuppression

  console.error(chalk.red(`❌ Error calling ${functionName}:`));
  console.error(chalk.yellow(err.message));
  if (err.cause) {
    console.error(chalk.gray(`Cause: ${err.cause}`));
  }
  process.exit(1);
};

/**
 * Display function not found error
 */
export const displayFunctionNotFound = (
  functionName: string,
  availableFunctions: string[],
  isQuiet: boolean
) => {
  // Note: Console restoration is handled by setupConsoleSuppression

  console.error(chalk.red(`❌ Unknown function: ${functionName}`));
  console.error(chalk.yellow(`\nAvailable functions:`));
  console.error(chalk.gray(availableFunctions));
  process.exit(1);
};
