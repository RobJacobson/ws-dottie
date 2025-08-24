import { z } from "zod";

import type { FetchContext } from "../../pipeline/types";

/**
 * Output validation utilities for the data pipeline
 *
 * This module provides the core output validation logic used by the fetching pipeline.
 * It consolidates all response validation functionality to eliminate duplication.
 */

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
