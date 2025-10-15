import { z } from "zod";

/**
 * ScanwebSubSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const scanwebSubSurfaceMeasurementsSchema = z
  .object({
    /** Sensor ID. */
    SensorId: z.int().describe("Sensor ID."),
    /** Sub-surface temperature. */
    SubSurfaceTemperature: z
      .number()
      .nullable()
      .describe("Sub-surface temperature."),
  })
  .describe("Measurements recorded by sub-surface sensors.");

export type ScanwebSubSurfaceMeasurements = z.infer<
  typeof scanwebSubSurfaceMeasurementsSchema
>;
