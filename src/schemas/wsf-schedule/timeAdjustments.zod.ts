import { z } from "zod";
import { timeAdjustmentSchema } from "./timeAdjustment.zod";

/**
 * TimeAdjustments schema
 *
 * Array of time adjustment responses.
 */
export const timeAdjustmentsSchema = z
  .array(timeAdjustmentSchema)
  .describe(
    "All additions and cancellations that deviate on specific dates from the scheduled times."
  );

/** TimeAdjustments type */
export type TimeAdjustments = z.infer<typeof timeAdjustmentsSchema>;
