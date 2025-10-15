/**
 * @fileoverview WSF Schedule API Output Schemas for Active Seasons
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API active seasons operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Base schedule schema containing common schedule fields
 *
 * This operation retrieves a summary of active seasons.
 */
export const scheduleBaseSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().describe("Unique identifier for a season."),
  /** The name of the season. */
  ScheduleName: z.string().describe("The name of the season."),
  /**
   * Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter.
   */
  ScheduleSeason: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .describe(
      "Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter."
    ),
  /** A URL to the season in PDF format. */
  SchedulePDFUrl: z.string().describe("A URL to the season in PDF format."),
  /**
   * A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am.
   */
  ScheduleStart: zDotnetDate().describe(
    "A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am."
  ),
  /**
   * A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am.
   */
  ScheduleEnd: zDotnetDate().describe(
    "A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
  ),
});

export type ScheduleBase = z.infer<typeof scheduleBaseSchema>;

/**
 * Schema for ActiveSeason - represents active season information
 */
export const activeSeasonSchema = scheduleBaseSchema;

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;
