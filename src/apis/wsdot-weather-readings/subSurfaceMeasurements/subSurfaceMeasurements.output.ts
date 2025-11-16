import { z } from "@/shared/zod";

/**
 * ScanwebSubSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const subsurfaceMeasurementSchema = z
  .object({
    SensorId: z
      .number()
      .optional()
      .describe("Numeric ID of the subsurface sensor."),
    SubSurfaceTemperature: z
      .number()
      .optional()
      .describe(
        "Temperature from sensor embedded 12-18 inches below road pavement in degrees Celsius."
      ),
  })
  .describe(
    "Subsurface sensor measurements including ground temperature from sensors embedded below road pavement."
  );

export type SubsurfaceMeasurement = z.infer<typeof subsurfaceMeasurementSchema>;
