import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableStringSchema = z.string().nullable();
export const nullableDateSchema = z.date().nullable().or(z.string().nullable().transform(val => val ? new Date(val) : null)).or(z.number().nullable().transform(val => val ? new Date(val) : null));

// WSDOT Highway Alerts schemas
export const roadwayLocationSchema = z.object({
  Description: nullableStringSchema,
  Direction: nullableStringSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const highwayAlertSchema = z.object({
  AlertID: z.number(),
  County: nullableStringSchema,
  EndRoadwayLocation: roadwayLocationSchema,
  EndTime: nullableDateSchema,
  EventCategory: z.string(),
  EventStatus: z.string(),
  ExtendedDescription: z.string(),
  HeadlineDescription: z.string(),
  LastUpdatedTime: dateSchema,
  Priority: z.string(),
  Region: z.string(),
  StartRoadwayLocation: roadwayLocationSchema,
  StartTime: dateSchema,
});

export const highwayAlertsArraySchema = z.array(highwayAlertSchema);

// Export all schemas
export const schemas = {
  roadwayLocation: roadwayLocationSchema,
  highwayAlert: highwayAlertSchema,
  highwayAlertsArray: highwayAlertsArraySchema,
} as const; 