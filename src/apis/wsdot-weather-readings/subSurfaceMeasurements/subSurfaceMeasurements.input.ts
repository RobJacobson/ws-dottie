import { z } from "zod";

/**
 * GetWeatherReadings input schema
 *
 * Input parameters for getting weather readings.
 */
export const getSubSurfaceMeasurementsSchema = z
  .object({})
  .describe(
    "Retrieves subsurface sensor measurements from all weather stations statewide, returning subsurface temperature data from sensors embedded below road pavement. Use for ground temperature monitoring and winter maintenance operations."
  );

export type GetSubSurfaceMeasurementsInput = z.infer<
  typeof getSubSurfaceMeasurementsSchema
>;
