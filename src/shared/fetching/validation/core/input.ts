import { z } from "zod";

import type { FetchContext } from "../../pipeline/types";

/**
 * Input validation utilities for the data pipeline
 *
 * This module provides the core input validation logic used by the fetching pipeline.
 * It consolidates all input validation functionality to eliminate duplication.
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
