import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableStringSchema = z.string().nullable();
export const nullableDateSchema = z.date().nullable().or(z.string().nullable().transform(val => val ? new Date(val) : null)).or(z.number().nullable().transform(val => val ? new Date(val) : null));

// WSDOT Toll Rates schemas
export const tollRateSchema = z.object({
  CurrentMessage: nullableStringSchema,
  CurrentToll: z.number(),
  EndLatitude: z.number(),
  EndLocationName: z.string(),
  EndLongitude: z.number(),
  EndMilepost: z.number(),
  StartLatitude: z.number(),
  StartLocationName: z.string(),
  StartLongitude: z.number(),
  StartMilepost: z.number(),
  StateRoute: z.string(),
  TimeUpdated: dateSchema,
  TravelDirection: z.string(),
  TripName: z.string(),
});

export const tollTripInfoSchema = z.object({
  EndLatitude: z.number(),
  EndLocationName: z.string(),
  EndLongitude: z.number(),
  EndMilepost: z.number(),
  Geometry: z.string(), // GeoJSON LineString geometry
  ModifiedDate: nullableDateSchema,
  StartLatitude: z.number(),
  StartLocationName: z.string(),
  StartLongitude: z.number(),
  StartMilepost: z.number(),
  TravelDirection: z.string(),
  TripName: z.string(),
});

export const tollTripRateSchema = z.object({
  Message: z.string(),
  MessageUpdateTime: dateSchema,
  Toll: z.number(),
  TripName: z.string(),
});

export const tollTripRatesSchema = z.object({
  LastUpdated: dateSchema,
  Trips: z.array(tollTripRateSchema),
});

export const tollRatesArraySchema = z.array(tollRateSchema);
export const tollTripInfoArraySchema = z.array(tollTripInfoSchema);

// Export all schemas
export const schemas = {
  tollRate: tollRateSchema,
  tollTripInfo: tollTripInfoSchema,
  tollTripRate: tollTripRateSchema,
  tollTripRates: tollTripRatesSchema,
  tollRatesArray: tollRatesArraySchema,
  tollTripInfoArray: tollTripInfoArraySchema,
} as const; 