import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Schema for active season response from WSF Schedule API.
 * This operation retrieves a summary of active seasons.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const scheduleBriefResponseSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().int().describe("Unique identifier for a season."),
  /** The name of the season. */
  ScheduleName: z.string().nullable().describe("The name of the season."),
  /** Indicates the season name. */
  ScheduleSeason: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .describe(
      "Indicates the season name (0 = Spring, 1 = Summer, 2 = Fall, 3 = Winter)."
    ),
  /** A URL to the season in PDF format. */
  SchedulePDFUrl: z
    .string()
    .nullable()
    .describe("A URL to the season in PDF format."),
  /** A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am. */
  ScheduleStart: zWsdotDate().describe(
    "A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am."
  ),
  /** A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am. */
  ScheduleEnd: zWsdotDate().describe(
    "A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
  ),
});

export type ScheduleBriefResponse = z.infer<typeof scheduleBriefResponseSchema>;

/**
 * Array of active seasons.
 */
export const scheduleBriefResponsesSchema = z
  .array(scheduleBriefResponseSchema)
  .describe("A summary of active seasons.");

export type ScheduleBriefResponses = z.infer<
  typeof scheduleBriefResponsesSchema
>;
