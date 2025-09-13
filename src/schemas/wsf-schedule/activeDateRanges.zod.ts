import { z } from "zod";
import { activeDateRangeSchema } from "./activeDateRange.zod";

/**
 * Array of active date ranges.
 */
export const activeDateRangesSchema = z
  .array(activeDateRangeSchema)
  .describe(
    "A collection of date ranges detailing when this sailing is active."
  );

export type ActiveDateRanges = z.infer<typeof activeDateRangesSchema>;
