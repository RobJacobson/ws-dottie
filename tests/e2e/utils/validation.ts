import { z } from "zod";

import type { SchemaValidationResult } from "./types";

/**
 * Validate data against a Zod schema with detailed error reporting
 */
export const validateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`${context} validation failed: ${fieldErrors}`);
    }
    throw new Error(`${context} validation failed: ${error}`);
  }
};

/**
 * Validate schema with detailed result information
 */
export const validateSchemaWithResult = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return {
        success: false,
        error: `${context} validation failed: ${fieldErrors}`,
      };
    }
    return { success: false, error: `${context} validation failed: ${error}` };
  }
};

/**
 * Test performance of an async function
 */
export const testPerformance = async (
  fn: () => Promise<unknown>,
  maxTime: number = 10000
): Promise<number> => {
  const start = Date.now();
  await fn();
  const duration = Date.now() - start;

  if (duration > maxTime) {
    throw new Error(
      `Performance test failed: ${duration}ms exceeded limit of ${maxTime}ms`
    );
  }

  return duration;
};

/**
 * Test performance with multiple samples
 */
export const testPerformanceWithSamples = async (
  fn: () => Promise<unknown>,
  samples: number = 3,
  maxTime: number = 10000
): Promise<{
  average: number;
  min: number;
  max: number;
  samples: number;
  withinLimit: boolean;
}> => {
  const durations: number[] = [];

  for (let i = 0; i < samples; i++) {
    const duration = await testPerformance(fn, maxTime * 2); // Allow more time for individual samples
    durations.push(duration);
  }

  const average = durations.reduce((sum, d) => sum + d, 0) / durations.length;
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const withinLimit = average <= maxTime;

  return {
    average,
    min,
    max,
    samples,
    withinLimit,
  };
};

/**
 * Validate array data with additional checks
 */
export const validateArrayData = <T>(
  data: unknown,
  schema: z.ZodSchema<T[]>,
  context: string
): T[] => {
  const validated = validateSchema(schema, data, context);

  if (!Array.isArray(validated)) {
    throw new Error(`${context} expected array but got ${typeof validated}`);
  }

  if (validated.length === 0) {
    console.warn(`⚠️  ${context} returned empty array`);
  }

  return validated;
};

/**
 * Validate object data with additional checks
 */
export const validateObjectData = <T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context: string
): T => {
  const validated = validateSchema(schema, data, context);

  if (typeof validated !== "object" || validated === null) {
    throw new Error(`${context} expected object but got ${typeof validated}`);
  }

  return validated;
};

/**
 * Validate nullable fields correctly
 */
export const validateNullableField = (
  value: unknown,
  expectedType: string,
  fieldName: string
): void => {
  if (value !== null && value !== undefined) {
    const actualType = typeof value;
    if (actualType !== expectedType) {
      throw new Error(
        `${fieldName} should be ${expectedType} or null, but got ${actualType}`
      );
    }
  }
};

/**
 * Create a comprehensive schema validation result
 */
export const createSchemaValidationResult = (
  endpointName: string,
  inputValidation?: { success: boolean; error?: string },
  outputValidation?: {
    success: boolean;
    error?: string;
    dataType?: string;
    dataSize?: number;
  }
): SchemaValidationResult => {
  return {
    endpointName,
    inputValidation,
    outputValidation: outputValidation || {
      success: false,
      error: "Not tested",
    },
  };
};

/**
 * Validate date fields and ensure they're properly parsed
 */
export const validateDateField = (value: unknown, fieldName: string): Date => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) {
      throw new Error(`${fieldName} is not a valid date string: ${value}`);
    }
    return parsed;
  }

  throw new Error(
    `${fieldName} should be a Date or date string, but got ${typeof value}`
  );
};

/**
 * Validate numeric ID fields
 */
export const validateIdField = (
  value: unknown,
  fieldName: string,
  allowNegative: boolean = false
): number => {
  if (typeof value !== "number") {
    throw new Error(`${fieldName} should be a number, but got ${typeof value}`);
  }

  if (!Number.isInteger(value)) {
    throw new Error(`${fieldName} should be an integer, but got ${value}`);
  }

  if (!allowNegative && value < 0) {
    throw new Error(`${fieldName} should be non-negative, but got ${value}`);
  }

  return value;
};

/**
 * Validate string fields with optional length constraints
 */
export const validateStringField = (
  value: unknown,
  fieldName: string,
  minLength?: number,
  maxLength?: number
): string => {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} should be a string, but got ${typeof value}`);
  }

  if (minLength !== undefined && value.length < minLength) {
    throw new Error(
      `${fieldName} should be at least ${minLength} characters, but got ${value.length}`
    );
  }

  if (maxLength !== undefined && value.length > maxLength) {
    throw new Error(
      `${fieldName} should be at most ${maxLength} characters, but got ${value.length}`
    );
  }

  return value;
};
