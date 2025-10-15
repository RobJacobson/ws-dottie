import { z } from "zod";

/**
 * Schema for GetBorderCrossings input parameters
 *
 * Provides current wait times for the various border crossings into Canada. Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings.
 */
export const getBorderCrossingsSchema = z
  .object({})
  .describe(
    "Provides current wait times for the various border crossings into Canada. Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings."
  );

export type GetBorderCrossingsInput = z.infer<typeof getBorderCrossingsSchema>;
