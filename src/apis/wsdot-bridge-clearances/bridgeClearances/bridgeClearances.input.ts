import { z } from "zod";

/**
 * Schema for GetClearances input parameters (all routes)
 *
 * Bridge clearance information, see disclaimer
 */
export const getClearancesSchema = z
  .object({})
  .describe("Bridge clearance information, see disclaimer");

export type GetClearancesInput = z.infer<typeof getClearancesSchema>;

/**
 * Schema for GetClearancesByRoute input parameters
 *
 * Bridge clearance information, see disclaimer
 */
export const getClearancesByRouteSchema = z
  .object({
    /** A State Route formatted as a three digit number. I-5 would be 005. */
    Route: z
      .string()
      .describe(
        "A State Route formatted as a three digit number. I-5 would be 005."
      ),
  })
  .describe("Bridge clearance information, see disclaimer");

export type GetClearancesByRouteInput = z.infer<
  typeof getClearancesByRouteSchema
>;
