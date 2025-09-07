/**
 * CLI validation utilities
 */

import chalk from "chalk";

/**
 * Coerce ISO-like date strings (YYYY-MM-DD, optional time) to JS Date
 */
export const coerceDateStrings = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(coerceDateStrings);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = coerceDateStrings(v);
    }
    return out;
  }
  if (typeof value === "string") {
    const ISOish = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?)?Z?$/i;
    if (ISOish.test(value)) {
      // If a time is present without Z, assume UTC; date-only is fine
      const needsZ = value.length > 10 && !value.endsWith("Z");
      return new Date(needsZ ? `${value}Z` : value);
    }
  }
  return value;
};

/**
 * Parse and validate JSON parameters
 */
export const parseParameters = (
  paramsString: string
): Record<string, unknown> => {
  if (!paramsString || paramsString === "{}") {
    return {};
  }

  try {
    const parsed = JSON.parse(paramsString);
    return coerceDateStrings(parsed) as Record<string, unknown>;
  } catch (error) {
    console.error(chalk.red(`❌ Invalid JSON parameters: ${paramsString}`));
    console.error(chalk.yellow(`Error: ${(error as Error).message}`));
    process.exit(1);
  }
};

/**
 * Validate parameters against schema
 */
export const validateParameters = (
  params: Record<string, unknown>,
  paramsSchema: any,
  functionName: string
): Record<string, unknown> => {
  if (!paramsSchema) {
    throw new Error("No parameter schema defined for this function");
  }

  try {
    return paramsSchema.parse(params) as Record<string, unknown>;
  } catch (validationError: unknown) {
    const error = validationError as Error;
    console.error(chalk.red(`❌ Parameter validation failed:`));
    console.error(chalk.yellow(error.message));
    console.error(chalk.gray(`\nExpected parameters for ${functionName}:`));
    console.error(
      chalk.gray(`See function documentation or use --help for examples`)
    );
    process.exit(1);
  }
};
