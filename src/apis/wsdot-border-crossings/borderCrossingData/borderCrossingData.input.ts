import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for BorderCrossingData input parameters
 *
 * Provides current wait times for the various border crossings into Canada. Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings.
 */
export const borderCrossingsInputSchema = z
  .object({})
  .describe(
    "Retrieves current wait times for all border crossings into Canada, returning crossing names, locations, wait times, and timestamp data. Coverage includes I-5, SR-543, SR-539, and SR-9 crossings. Use for border crossing planning and wait time monitoring applications."
  );

export type BorderCrossingsInput = z.infer<typeof borderCrossingsInputSchema>;
