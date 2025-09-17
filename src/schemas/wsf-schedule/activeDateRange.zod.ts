import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Schema for active date range response from WSF Schedule API.
 * A collection of date ranges detailing when this sailing is active.
 */
export const activeDateRangeSchema = z.object({
  /** A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am. */
  DateFrom: zWsdotDate().describe(
    "A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am."
  ),
  /** A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am. */
  DateThru: zWsdotDate().describe(
    "A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am."
  ),
  /** Unique identifier for an event. */
  EventID: z
    .number()
    .int()
    .nullable()
    .describe("Unique identifier for an event."),
  /** Explaination (if necessary) of this sailing date range. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this sailing date range."),
});

export type ActiveDateRange = z.infer<typeof activeDateRangeSchema>;

/**
 * Array of active date ranges.
 */
export const activeDateRangesSchema = z
  .array(activeDateRangeSchema)
  .describe(
    "A collection of date ranges detailing when this sailing is active."
  );

export type ActiveDateRanges = z.infer<typeof activeDateRangesSchema>;
