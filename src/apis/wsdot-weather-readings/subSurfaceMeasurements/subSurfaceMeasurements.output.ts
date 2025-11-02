import { z } from "zod";

/**
 * ScanwebSubSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const scanwebSubSurfaceMeasurementsSchema = z
  .object({
    SensorId: z
      .number()
      .optional()
      .describe(
        "Unique sensor identifier at weather station, as an integer ID. E.g., '1' for first subsurface sensor, '2' for second subsurface sensor. Identifies which subsurface sensor recorded the measurement when multiple sensors exist at station."
      ),
    SubSurfaceTemperature: z
      .number()
      .optional()
      .describe(
        "Temperature reading from sensor embedded below road pavement, as degrees Celsius. E.g., '8.5' for 8.5°C subsurface temperature, '2.1' for 2.1°C subsurface temperature. Sensors typically embedded 12-18 inches below pavement surface. Used for ground temperature monitoring and predicting road surface conditions."
      ),
  })
  .describe(
    "Represents subsurface sensor measurements including ground temperature from sensors embedded below road pavement. E.g., sensor 1 with subsurface temperature 8.5°C. Used for ground temperature monitoring, winter maintenance operations, and travel safety assessments. Measurements recorded by sensors embedded 12-18 inches below road pavement surfaces."
  );

export type ScanwebSubSurfaceMeasurements = z.infer<
  typeof scanwebSubSurfaceMeasurementsSchema
>;
