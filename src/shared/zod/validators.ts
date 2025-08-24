import { z } from "zod";

import { configManager } from "@/shared/configManager";

import type { FetchContext } from "./types";

/**
 * Validation utilities for Zod fetch operations
 *
 * Note: Input validation is always enabled to ensure fail-fast error handling
 * and consistent behavior across all environments.
 */

/**
 * Validates input parameters if schema is provided
 *
 * Always performs validation when a schema is provided, as the performance
 * overhead is negligible compared to network latency and the benefits of
 * fail-fast error handling are significant.
 *
 * @param inputSchema - Zod schema for input validation
 * @param params - Parameters to validate
 * @param _context - Fetch context (unused but kept for interface compatibility)
 * @returns Validated parameters or undefined if no schema provided
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateInputs = <TInput>(
  inputSchema: z.ZodSchema<TInput> | undefined,
  params: TInput | undefined,
  _context: FetchContext
): TInput | undefined => {
  // Always validate if schema and params are provided
  if (!inputSchema || !params) {
    return params;
  }

  try {
    return inputSchema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Parameter validation failed: ${fieldErrors}`);
    }
    throw error;
  }
};

/**
 * Validates response data against output schema
 *
 * @param responseData - Raw response data from the API
 * @param outputSchema - Zod schema for output validation
 * @param _context - Fetch context (unused but kept for interface compatibility)
 * @returns Validated response data
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateResponse = <TOutput>(
  responseData: unknown,
  outputSchema: z.ZodSchema<TOutput> | undefined,
  _context: FetchContext
): TOutput => {
  if (!outputSchema) {
    return responseData as TOutput;
  }

  try {
    const validatedData = outputSchema.parse(responseData);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Response validation failed: ${fieldErrors}`);
    }
    throw error;
  }
};
