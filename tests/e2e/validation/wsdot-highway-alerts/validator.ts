import { z } from "zod";
import { schemas } from "./schemas";

export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => schema.parse(data);
export const validateDataSafe = <T>(schema: z.ZodSchema<T>, data: unknown) => schema.safeParse(data);
export const validateArray = <T>(schema: z.ZodSchema<T>, data: unknown[]): T[] => z.array(schema).parse(data);
export const validateArraySafe = <T>(schema: z.ZodSchema<T>, data: unknown[]) => z.array(schema).safeParse(data);
export const createValidator = <T>(schema: z.ZodSchema<T>) => ({
  validate: (data: unknown): T => validateData(schema, data),
  validateSafe: (data: unknown) => validateDataSafe(schema, data),
  validateArray: (data: unknown[]): T[] => validateArray(schema, data),
  validateArraySafe: (data: unknown[]) => validateArraySafe(schema, data),
});
export const createArrayValidator = <T>(arraySchema: z.ZodSchema<T[]>) => ({
  validate: (data: unknown): T[] => validateData(arraySchema, data),
  validateSafe: (data: unknown) => validateDataSafe(arraySchema, data),
});
export const validators = {
  roadwayLocation: createValidator(schemas.roadwayLocation),
  highwayAlert: createValidator(schemas.highwayAlert),
  highwayAlertsArray: createArrayValidator(schemas.highwayAlertsArray),
} as const; 