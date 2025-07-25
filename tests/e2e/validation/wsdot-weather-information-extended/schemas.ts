import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableDateSchema = z.date().nullable().or(z.string().nullable().transform(val => val ? new Date(val) : null)).or(z.number().nullable().transform(val => val ? new Date(val) : null));

export const nullableNumberSchema = z.number().nullable();

// WSDOT Weather Information Extended schemas
export const surfaceMeasurementSchema = z.object({
  SensorId: z.number(),
  SurfaceTemperature: nullableNumberSchema,
  RoadFreezingTemperature: nullableNumberSchema,
  RoadSurfaceCondition: nullableNumberSchema,
});

export const subSurfaceMeasurementSchema = z.object({
  SensorId: z.number(),
  SubSurfaceTemperature: nullableNumberSchema,
});

export const weatherReadingSchema = z.object({
  StationId: z.string(),
  StationName: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  Elevation: z.number(),
  ReadingTime: nullableDateSchema, // Fixed: can be null in actual API responses
  AirTemperature: nullableNumberSchema,
  RelativeHumidty: nullableNumberSchema, // Note: API has typo "Humidty" instead of "Humidity"
  AverageWindSpeed: nullableNumberSchema,
  AverageWindDirection: nullableNumberSchema,
  WindGust: nullableNumberSchema,
  Visibility: nullableNumberSchema,
  PrecipitationIntensity: nullableNumberSchema,
  PrecipitationType: nullableNumberSchema,
  PrecipitationPast1Hour: nullableNumberSchema,
  PrecipitationPast3Hours: nullableNumberSchema,
  PrecipitationPast6Hours: nullableNumberSchema,
  PrecipitationPast12Hours: nullableNumberSchema,
  PrecipitationPast24Hours: nullableNumberSchema,
  PrecipitationAccumulation: nullableNumberSchema,
  BarometricPressure: nullableNumberSchema,
  SnowDepth: nullableNumberSchema,
  SurfaceMeasurements: z.array(surfaceMeasurementSchema).nullable(),
  SubSurfaceMeasurements: z.array(subSurfaceMeasurementSchema).nullable(),
});

export const weatherReadingsArraySchema = z.array(weatherReadingSchema);

// Export all schemas
export const schemas = {
  surfaceMeasurement: surfaceMeasurementSchema,
  subSurfaceMeasurement: subSurfaceMeasurementSchema,
  weatherReading: weatherReadingSchema,
  weatherReadingsArray: weatherReadingsArraySchema,
} as const; 