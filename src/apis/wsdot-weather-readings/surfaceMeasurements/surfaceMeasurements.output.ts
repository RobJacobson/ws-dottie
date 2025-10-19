import { z } from "zod";

/**
 * ScanwebSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const scanwebSurfaceMeasurementsSchema = z
  .object({
    /** Sensor ID. */
    SensorId: z.number().optional().describe("Sensor ID."),
    /** Surface temperature. */
    SurfaceTemperature: z.number().optional().describe("Surface temperature."),
    /** Road freezing temperature. */
    RoadFreezingTemperature: z
      .number()
      .optional()
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
      .optional()
      .describe("Road surface condition."),
  })
  .describe("Measurements recorded by surface sensors.");

export type ScanwebSurfaceMeasurements = z.infer<
  typeof scanwebSurfaceMeasurementsSchema
>;
