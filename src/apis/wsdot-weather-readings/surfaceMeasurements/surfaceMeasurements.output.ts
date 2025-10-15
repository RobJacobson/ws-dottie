import { z } from "zod";

/**
 * ScanwebSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const scanwebSurfaceMeasurementsSchema = z
  .object({
    /** Sensor ID. */
    SensorId: z.int().describe("Sensor ID."),
    /** Surface temperature. */
    SurfaceTemperature: z.number().nullable().describe("Surface temperature."),
    /** Road freezing temperature. */
    RoadFreezingTemperature: z
      .number()
      .nullable()
      .describe("Road freezing temperature."),
    /** Road surface condition. */
    RoadSurfaceCondition: z
      .union([
        z.literal(101),
        z.literal(102),
        z.literal(103),
        z.literal(104),
        z.literal(105),
      ])
      .nullable()
      .describe("Road surface condition."),
  })
  .describe("Measurements recorded by surface sensors.");

export type ScanwebSurfaceMeasurements = z.infer<
  typeof scanwebSurfaceMeasurementsSchema
>;
