import { expect } from "vitest";
import type { z } from "zod";

/**
 * Zod-based validation utilities for E2E tests
 * This replaces the manual property-by-property validation with systematic type validation
 */

/**
 * Validates a single item using Zod schema and provides detailed error information
 */
export const validateWithZod = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T } | { success: false; error: z.ZodError };
  },
  data: unknown,
  context?: string
): T => {
  const result = validator.validateSafe(data);

  if (!result.success) {
    const errorMessage = context
      ? `Validation failed for ${context}: ${result.error.message}`
      : `Validation failed: ${result.error.message}`;

    // Log detailed error information for debugging
    console.error("Validation Error Details:", {
      context,
      issues: result.error.issues,
      received: data,
    });

    throw new Error(errorMessage);
  }

  return result.data;
};

/**
 * Validates an array of items using Zod schema
 */
export const validateArrayWithZod = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T[] } | { success: false; error: z.ZodError };
  },
  data: unknown[],
  context?: string
): T[] => {
  const result = validator.validateSafe(data);

  if (!result.success) {
    const errorMessage = context
      ? `Array validation failed for ${context}: ${result.error.message}`
      : `Array validation failed: ${result.error.message}`;

    console.error("Array Validation Error Details:", {
      context,
      issues: result.error.issues,
      received: data,
    });

    throw new Error(errorMessage);
  }

  return result.data;
};

/**
 * Validates data and ensures it matches the expected TypeScript type
 * This is the main function to use in tests
 */
export const expectValidType = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T } | { success: false; error: z.ZodError };
  },
  data: unknown,
  context?: string
): asserts data is T => {
  try {
    validateWithZod(validator, data, context);
  } catch (error) {
    expect.fail(error instanceof Error ? error.message : "Validation failed");
  }
};

/**
 * Validates an array and ensures it matches the expected TypeScript type
 */
export const expectValidArrayType = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T[] } | { success: false; error: z.ZodError };
  },
  data: unknown[],
  context?: string
): asserts data is T[] => {
  try {
    validateArrayWithZod(validator, data, context);
  } catch (error) {
    expect.fail(
      error instanceof Error ? error.message : "Array validation failed"
    );
  }
};

/**
 * Validates data and returns the validated data for further testing
 * Useful when you need to access the validated data
 */
export const validateAndReturn = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T } | { success: false; error: z.ZodError };
  },
  data: unknown,
  context?: string
): T => {
  return validateWithZod(validator, data, context);
};

/**
 * Validates an array and returns the validated array for further testing
 */
export const validateArrayAndReturn = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T[] } | { success: false; error: z.ZodError };
  },
  data: unknown[],
  context?: string
): T[] => {
  return validateArrayWithZod(validator, data, context);
};

/**
 * Validates data and provides detailed error information without throwing
 * Useful for debugging or when you want to handle validation errors gracefully
 */
export const validateWithDetails = <T>(
  validator: {
    validateSafe: (
      data: unknown
    ) => { success: true; data: T } | { success: false; error: z.ZodError };
  },
  data: unknown,
  context?: string
):
  | { success: true; data: T }
  | { success: false; error: string; details: unknown } => {
  const result = validator.validateSafe(data);

  if (!result.success) {
    return {
      success: false,
      error: context
        ? `Validation failed for ${context}: ${result.error.message}`
        : `Validation failed: ${result.error.message}`,
      details: {
        context,
        issues: result.error.issues,
        received: data,
      },
    };
  }

  return { success: true, data: result.data };
};
