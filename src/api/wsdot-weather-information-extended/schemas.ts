import { z } from "zod";

import { zNullableNumber } from "@/shared/validation";

// ReadingTime from this API is ISO string or null; normalize to Date | null
const zIsoDateNullable = () =>
  z
    .string()
    .transform((val) => new Date(val))
    .refine((d) => !Number.isNaN(d.getTime()), {
      message: "Invalid ISO date",
    })
    .nullable()
    .or(z.date().nullable());

export const surfaceMeasurementSchema = z
  .object({
    SensorId: z.number(),
    SurfaceTemperature: zNullableNumber(),
    RoadFreezingTemperature: zNullableNumber(),
    RoadSurfaceCondition: zNullableNumber(),
  })
  .catchall(z.unknown());

export const subSurfaceMeasurementSchema = z
  .object({
    SensorId: z.number(),
    SubSurfaceTemperature: zNullableNumber(),
  })
  .catchall(z.unknown());

export const weatherReadingSchema = z
  .object({
    StationId: z.string(),
    StationName: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    Elevation: z.number(),
    ReadingTime: zIsoDateNullable(),
    AirTemperature: zNullableNumber(),
    RelativeHumidty: zNullableNumber(),
    AverageWindSpeed: zNullableNumber(),
    AverageWindDirection: zNullableNumber(),
    WindGust: zNullableNumber(),
    Visibility: zNullableNumber(),
    PrecipitationIntensity: zNullableNumber(),
    PrecipitationType: zNullableNumber(),
    PrecipitationPast1Hour: zNullableNumber(),
    PrecipitationPast3Hours: zNullableNumber(),
    PrecipitationPast6Hours: zNullableNumber(),
    PrecipitationPast12Hours: zNullableNumber(),
    PrecipitationPast24Hours: zNullableNumber(),
    PrecipitationAccumulation: zNullableNumber(),
    BarometricPressure: zNullableNumber(),
    SnowDepth: zNullableNumber(),
    SurfaceMeasurements: z.array(surfaceMeasurementSchema).nullable(),
    SubSurfaceMeasurements: z.array(subSurfaceMeasurementSchema).nullable(),
  })
  .catchall(z.unknown());

export const weatherReadingArraySchema = z.array(weatherReadingSchema);

export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;
export type SubSurfaceMeasurement = z.infer<typeof subSurfaceMeasurementSchema>;
export type WeatherReading = z.infer<typeof weatherReadingSchema>;
