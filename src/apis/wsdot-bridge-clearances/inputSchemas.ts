import { z } from "zod";

/**
 * Schema for GetClearances input parameters (all routes)
 */
export const GetClearancesInputSchema = z.object({});

export type GetClearancesInput = z.infer<typeof GetClearancesInputSchema>;

/**
 * Schema for GetClearancesByRoute input parameters
 */
export const GetClearancesByRouteInputSchema = z.object({
  Route: z
    .string()
    .describe(
      "A State Route formatted as a three digit number. I-5 would be 005."
    ),
});

export type GetClearancesByRouteInput = z.infer<
  typeof GetClearancesByRouteInputSchema
>;
