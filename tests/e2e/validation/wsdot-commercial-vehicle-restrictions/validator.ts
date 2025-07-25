import { z } from "zod";
import { schemas } from "./schemas";

/**
 * Validates data against a Zod schema and returns the validated data
 * Throws a ZodError if validation fails
 */
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

/**
 * Validates data against a Zod schema safely
 * Returns a result object instead of throwing
 */
export const validateDataSafe = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } => {
  const result = schema.safeParse(data);
  return result;
};

/**
 * Validates an array of data against a Zod schema
 * Throws a ZodError if validation fails
 */
export const validateArray = <T>(schema: z.ZodSchema<T>, data: unknown[]): T[] => {
  return z.array(schema).parse(data);
};

/**
 * Validates an array of data against a Zod schema safely
 */
export const validateArraySafe = <T>(
  schema: z.ZodSchema<T>,
  data: unknown[]
): { success: true; data: T[] } | { success: false; error: z.ZodError } => {
  const result = z.array(schema).safeParse(data);
  return result;
};

/**
 * Creates a validation function for a specific schema
 * Useful for creating reusable validators
 */
export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return {
    validate: (data: unknown): T => validateData(schema, data),
    validateSafe: (data: unknown) => validateDataSafe(schema, data),
    validateArray: (data: unknown[]): T[] => validateArray(schema, data),
    validateArraySafe: (data: unknown[]) => validateArraySafe(schema, data),
  };
};

/**
 * Creates a validation function for an array schema
 * This is different from createValidator because it doesn't wrap the schema in z.array()
 */
export const createArrayValidator = <T>(arraySchema: z.ZodSchema<T[]>) => {
  return {
    validate: (data: unknown): T[] => validateData(arraySchema, data),
    validateSafe: (data: unknown) => validateDataSafe(arraySchema, data),
  };
};

/**
 * Pre-configured validators for WSDOT Commercial Vehicle Restrictions API
 */
export const validators = {
  roadwayLocation: createValidator(schemas.roadwayLocation),
  commercialVehicleRestriction: createValidator(schemas.commercialVehicleRestriction),
  commercialVehicleRestrictionWithId: createValidator(schemas.commercialVehicleRestrictionWithId),
  commercialVehicleRestrictionsArray: createArrayValidator(schemas.commercialVehicleRestrictionsArray),
  commercialVehicleRestrictionsWithIdArray: createArrayValidator(schemas.commercialVehicleRestrictionsWithIdArray),
} as const; 