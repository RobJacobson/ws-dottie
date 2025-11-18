import { z } from "@/shared/zod";

/**
 * ScanwebSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const surfaceMeasurementSchema = z
  .object({
    SensorId: z
      .number()
      .optional()
      .describe("Numeric ID of the surface sensor."),
    SurfaceTemperature: z
      .number()
      .optional()
      .describe("Current pavement surface temperature in degrees Celsius."),
    RoadFreezingTemperature: z
      .number()
      .optional()
      .describe(
        "Freezing point of moisture on pavement based on chemical treatment in degrees Celsius."
      ),
    RoadSurfaceCondition: z
      .number()
      .optional()
      .describe(
        "Code indicating road surface condition: 101 = Dry, 102 = Wet, 103 = Moist, 104 = Ice, 105 = Snow, 108 = Unknown/Other."
      ),
  })
  .describe(
    "Surface sensor measurements including pavement temperature, road freezing temperature, and surface condition code from sensors embedded in or mounted on road surfaces."
  );

export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;
