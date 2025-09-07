import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";
import { scheduleTerminalComboSchema } from "./scheduleTerminalCombo.zod";

/**
 * Schema for schedule response from WSF Schedule API.
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination.
 * The resultset accounts for all contingencies, sailing date ranges and time adjustments.
 * Valid departing and arriving terminals may be found using /terminalsandmates while valid routes may be found using /routes.
 * Similarly, a valid trip date may be determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const scheduleResponseSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().int().describe("Unique identifier for a season."),
  /** The name of the season. */
  ScheduleName: z.string().describe("The name of the season."),
  /** Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter. */
  ScheduleSeason: z
    .number()
    .int()
    .describe(
      "Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter."
    ),
  /** A URL to the season in PDF format. */
  SchedulePDFUrl: z.string().describe("A URL to the season in PDF format."),
  /** A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am. */
  ScheduleStart: zWsdotDate().describe(
    "A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am."
  ),
  /** A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am. */
  ScheduleEnd: zWsdotDate().describe(
    "A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
  ),
  /** An array of RouteID integers representing all the routes accounted for in this resultset. */
  AllRoutes: z
    .array(z.number().int())
    .describe(
      "An array of RouteID integers representing all the routes accounted for in this resultset."
    ),
  /** A grouping of departure and arrival terminal pairs. */
  TerminalCombos: z
    .array(scheduleTerminalComboSchema)
    .describe("A grouping of departure and arrival terminal pairs."),
});

export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;

/**
 * Array of schedule responses.
 */
export const scheduleResponsesArraySchema = z
  .array(scheduleResponseSchema)
  .describe(
    "Departure times for either a trip date and route or a trip date and terminal combination."
  );

export type ScheduleResponsesArray = z.infer<
  typeof scheduleResponsesArraySchema
>;
