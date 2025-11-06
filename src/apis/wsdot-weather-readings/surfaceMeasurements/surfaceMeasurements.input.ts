import { z } from "@/shared/zod-openapi-init";

/**
 * GetSurfaceMeasurements input schema
 *
 * Input parameters for getting surface measurements.
 */
export const surfaceMeasurementsInputSchema = z
  .object({})
  .describe(
    "Retrieves surface sensor measurements from all weather stations statewide, returning surface temperature, road freezing temperature, and road surface condition data. Use for road condition monitoring and winter maintenance operations."
  );

export type SurfaceMeasurementsInput = z.infer<
  typeof surfaceMeasurementsInputSchema
>;
