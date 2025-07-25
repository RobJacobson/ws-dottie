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
  faresCacheFlushDate: createValidator(schemas.faresCacheFlushDate),
  faresValidDateRange: createValidator(schemas.faresValidDateRange),
  faresTerminal: createValidator(schemas.faresTerminal),
  terminalMate: createValidator(schemas.terminalMate),
  terminalCombo: createValidator(schemas.terminalCombo),
  terminalComboVerbose: createValidator(schemas.terminalComboVerbose),
  fareLineItem: createValidator(schemas.fareLineItem),
  fareLineItemBasic: createValidator(schemas.fareLineItemBasic),
  fareLineItemVerbose: createValidator(schemas.fareLineItemVerbose),
  lineItemLookup: createValidator(schemas.lineItemLookup),
  fareLineItemsVerboseResponse: createValidator(schemas.fareLineItemsVerboseResponse),
  fareTotal: createValidator(schemas.fareTotal),
  faresTerminalsArray: createArrayValidator(schemas.faresTerminalsArray),
  terminalMatesArray: createArrayValidator(schemas.terminalMatesArray),
  terminalComboVerboseArray: createArrayValidator(schemas.terminalComboVerboseArray),
  fareLineItemsArray: createArrayValidator(schemas.fareLineItemsArray),
  fareLineItemsBasicArray: createArrayValidator(schemas.fareLineItemsBasicArray),
  fareTotalsArray: createArrayValidator(schemas.fareTotalsArray),
} as const; 