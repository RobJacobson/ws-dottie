import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableNumberSchema = z.number().nullable();

// WSDOT Mountain Pass Conditions schemas
export const travelRestrictionSchema = z.object({
  TravelDirection: z.string(),
  RestrictionText: z.string(),
});

export const mountainPassConditionSchema = z.object({
  DateUpdated: dateSchema,
  ElevationInFeet: z.number(),
  Latitude: z.number(),
  Longitude: z.number(),
  MountainPassId: z.number(),
  MountainPassName: z.string(),
  RestrictionOne: travelRestrictionSchema,
  RestrictionTwo: travelRestrictionSchema,
  RoadCondition: z.string(),
  TemperatureInFahrenheit: nullableNumberSchema,
  TravelAdvisoryActive: z.boolean(),
  WeatherCondition: z.string(),
});

export const mountainPassConditionsArraySchema = z.array(mountainPassConditionSchema);

// Export all schemas
export const schemas = {
  travelRestriction: travelRestrictionSchema,
  mountainPassCondition: mountainPassConditionSchema,
  mountainPassConditionsArray: mountainPassConditionsArraySchema,
} as const; 