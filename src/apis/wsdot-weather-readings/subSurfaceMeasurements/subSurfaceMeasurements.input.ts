import { z } from "@/shared/zod";

/**
 * GetSubSurfaceMeasurements input schema
 *
 * Input parameters for getting subsurface measurements.
 */
export const subSurfaceMeasurementsInputSchema = z
  .object({})
  .describe(
    "Retrieves subsurface sensor measurements from all weather stations statewide, returning subsurface temperature data from sensors embedded below road pavement. Use for ground temperature monitoring and winter maintenance operations."
  );

export type SubSurfaceMeasurementsInput = z.infer<
  typeof subSurfaceMeasurementsInputSchema
>;
