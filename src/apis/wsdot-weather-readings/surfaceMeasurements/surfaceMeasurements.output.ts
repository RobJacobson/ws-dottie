import { z } from "@/shared/zod-openapi-init";

/**
 * ScanwebSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const scanwebSurfaceMeasurementsSchema = z
  .object({
    SensorId: z
      .number()
      .optional()
      .describe(
        "Unique sensor identifier at weather station, as an integer ID. E.g., '1' for first sensor, '2' for second sensor. Identifies which surface sensor recorded the measurement when multiple sensors exist at station."
      ),
    SurfaceTemperature: z
      .number()
      .optional()
      .describe(
        "Current pavement surface temperature reading, as degrees Celsius. E.g., '5.2' for 5.2°C surface temperature, '-2.1' for -2.1°C (below freezing) surface temperature. Used for road condition assessment and ice formation prediction."
      ),
    RoadFreezingTemperature: z
      .number()
      .optional()
      .describe(
        "Freezing point of moisture on pavement based on chemical treatment, as degrees Celsius. E.g., '-5.0' for freezing point at -5°C with de-icing chemicals, '-10.0' for lower freezing point with stronger treatment. Calculated based on specific chemical in use at sensor location. Used for winter maintenance decision-making."
      ),
    RoadSurfaceCondition: z
      .union([
        z.literal(101),
        z.literal(102),
        z.literal(103),
        z.literal(104),
        z.literal(105),
      ])
      .optional()
      .describe(
        "Road surface condition code detected by sensor, as a condition code. Valid values: 101 (Dry), 102 (Wet), 103 (Moist), 104 (Ice), 105 (Snow). E.g., '101' indicates dry pavement, '102' indicates wet pavement, '104' indicates icy conditions. Used for road condition assessment and travel safety evaluation."
      ),
  })
  .describe(
    "Represents surface sensor measurements including pavement temperature, road freezing temperature, and surface condition code. E.g., sensor 1 with surface temperature 5.2°C, freezing temperature -5.0°C, and condition 102 (wet). Used for road condition monitoring, winter maintenance operations, and travel safety assessments. Measurements recorded by sensors embedded in or mounted on road surfaces."
  );

export type ScanwebSurfaceMeasurements = z.infer<
  typeof scanwebSurfaceMeasurementsSchema
>;
