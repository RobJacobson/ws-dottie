import { z } from "@/shared/zod";

/**
 * Schema for border crossing wait time query parameters.
 *
 * No parameters are required; call this endpoint to get current wait times
 * for Washington border crossings into Canada.
 */
export const borderCrossingsInputSchema = z
  .object({})
  .describe(
    "Input parameters for fetching current wait times for Washington border crossings into Canada on I-5, SR-543, SR-539, and SR-9."
  );

export type BorderCrossingsInput = z.infer<typeof borderCrossingsInputSchema>;
