/**
 * @fileoverview Response processing utilities
 *
 * This module handles all output processing for the data pipeline:
 * - Response validation using Zod schemas
 * - Data transformation and type safety
 */

import { ZodError } from "zod";
import { createValidationError } from "../handleErrors";
import type { FetchContext } from "../types";

/**
 * Validates response data against output schema
 *
 * This function ensures that API responses match the expected schema structure
 * and provides detailed error messages when validation fails.
 *
 * @template TOutput - The expected output type
 * @param responseData - Raw response data from the API
 * @param outputSchema - Zod schema for output validation
 * @param _context - Response context (unused but kept for interface compatibility)
 * @returns Validated response data
 * @throws {Error} When validation fails with detailed field error messages
 */
export const validateResponse = <TOutput>(
  responseData: unknown,
  outputSchema: import("zod").ZodType<TOutput> | undefined,
  _context: FetchContext
): TOutput => {
  if (!outputSchema) {
    return responseData as TOutput;
  }

  try {
    const validatedData = outputSchema.parse(responseData);
    return validatedData;
  } catch (error) {
    if (error instanceof ZodError) {
      throw createValidationError(error, "Response validation");
    }
    throw error;
  }
};
