import { z } from "zod";

/**
 * Schema for GetClearances input parameters (all routes)
 */
export const getClearancesInputSchema = z.object({});

export type GetClearancesInput = z.infer<typeof getClearancesInputSchema>;

/**
 * Schema for GetClearancesByRoute input parameters
 */
export const getClearancesByRouteInputSchema = z.object({
  /** A State Route formatted as a three digit number. I-5 would be 005. */
  Route: z
    .string()
    .describe(
      "A State Route formatted as a three digit number. I-5 would be 005."
    ),
});

export type GetClearancesByRouteInput = z.infer<
  typeof getClearancesByRouteInputSchema
>;
