import { z } from "@/shared/zod";

/**
 * GetSubSurfaceMeasurements input schema
 *
 * Input parameters for getting subsurface measurements.
 */
export const subSurfaceMeasurementsInputSchema = z
  .object({})
  .describe(
    "Input parameters for listing subsurface measurements from all stations."
  );

export type SubSurfaceMeasurementsInput = z.infer<
  typeof subSurfaceMeasurementsInputSchema
>;
