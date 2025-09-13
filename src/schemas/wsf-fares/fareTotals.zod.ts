import { z } from "zod";
import { fareTotalSchema } from "./fareTotal.zod";

/**
 * Schema for validating the response from the GET /faretotals endpoint.
 * Returns an array of fare total objects.
 */
export const fareTotalsSchema = z
  .array(fareTotalSchema)
  .describe(
    "Array of fare totals for a set of fares and associated quantities for either a round trip or one-way journey."
  );

export type FareTotals = z.infer<typeof fareTotalsSchema>;
