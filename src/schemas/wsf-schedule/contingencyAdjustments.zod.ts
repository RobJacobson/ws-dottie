import { z } from "zod";
import { contingencyAdjustmentSchema } from "./contingencyAdjustment.zod";

/**
 * Array of contingency adjustments.
 */
export const contingencyAdjustmentsSchema = z
  .array(contingencyAdjustmentSchema)
  .describe(
    "Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service."
  );

export type ContingencyAdjustments = z.infer<
  typeof contingencyAdjustmentsSchema
>;
