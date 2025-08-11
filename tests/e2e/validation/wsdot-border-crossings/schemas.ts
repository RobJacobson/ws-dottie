import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableStringSchema = z.string().nullable();

// WSDOT Border Crossings schemas
export const borderCrossingLocationSchema = z.object({
  Description: z.string(),
  Direction: nullableStringSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
}).nullable();

export const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: borderCrossingLocationSchema,
  CrossingName: z.string(),
  Time: dateSchema,
  WaitTime: z.number(),
});

export const borderCrossingsArraySchema = z.array(borderCrossingDataSchema);

// Export all schemas
export const schemas = {
  borderCrossingLocation: borderCrossingLocationSchema,
  borderCrossingData: borderCrossingDataSchema,
  borderCrossingsArray: borderCrossingsArraySchema,
} as const; 