import { z } from "@/shared/zod";

/**
 * GetSurfaceMeasurements input schema
 *
 * Input parameters for getting surface measurements.
 */
export const surfaceMeasurementsInputSchema = z
  .object({})
  .describe(
    "Input parameters for listing surface measurements from all stations."
  );

export type SurfaceMeasurementsInput = z.infer<
  typeof surfaceMeasurementsInputSchema
>;
