import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

export const nullableNumberSchema = z.number().nullable();
export const nullableStringSchema = z.string().nullable();

// WSDOT Weather Information schemas
export const weatherInfoSchema = z.object({
  BarometricPressure: nullableNumberSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  PrecipitationInInches: nullableNumberSchema,
  ReadingTime: dateSchema,
  RelativeHumidity: nullableNumberSchema,
  SkyCoverage: nullableStringSchema,
  StationID: z.number(),
  StationName: z.string(),
  TemperatureInFahrenheit: nullableNumberSchema,
  Visibility: nullableNumberSchema,
  WindDirection: nullableNumberSchema,
  WindDirectionCardinal: nullableStringSchema,
  WindGustSpeedInMPH: nullableNumberSchema,
  WindSpeedInMPH: nullableNumberSchema,
});

export const weatherInformationArraySchema = z.array(weatherInfoSchema);

// Export all schemas
export const schemas = {
  weatherInfo: weatherInfoSchema,
  weatherInformationArray: weatherInformationArraySchema,
} as const; 