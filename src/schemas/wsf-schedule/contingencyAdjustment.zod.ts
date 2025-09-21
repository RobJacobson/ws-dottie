import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for contingency adjustment response from WSF Schedule API.
 * Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly).
 * For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service.
 */
export const contingencyAdjustmentSchema = z.object({
  /** The precise date and time that the contingency adjustment starts. */
  DateFrom: zWsdotDate().describe(
    "The precise date and time that the contingency adjustment starts."
  ),
  /** The precise date and time that the contingency adjustment ends. */
  DateThru: zWsdotDate().describe(
    "The precise date and time that the contingency adjustment ends."
  ),
  /** Unique identifier for an event. */
  EventID: z
    .number()
    .int()
    .nullable()
    .describe("Unique identifier for an event."),
  /** Describes what prompted this contingency adjustment. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Describes what prompted this contingency adjustment."),
  /** Indicates whether this adjustment represents a cancellation or addition in service. */
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  /** If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it. */
  ReplacedBySchedRouteID: z
    .number()
    .int()
    .nullable()
    .describe(
      "If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it."
    ),
});

export type ContingencyAdjustment = z.infer<typeof contingencyAdjustmentSchema>;

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
