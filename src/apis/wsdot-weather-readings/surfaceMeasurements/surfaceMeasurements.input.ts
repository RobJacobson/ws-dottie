import { z } from "@/shared/zod-openapi-init";

/**
 * GetWeatherReadings input schema
 *
 * Input parameters for getting weather readings.
 */
export const getSurfaceMeasurementsSchema = z
  .object({})
  .describe(
    "Retrieves surface sensor measurements from all weather stations statewide, returning surface temperature, road freezing temperature, and road surface condition data. Use for road condition monitoring and winter maintenance operations."
  );

export type GetSurfaceMeasurementsInput = z.infer<
  typeof getSurfaceMeasurementsSchema
>;
