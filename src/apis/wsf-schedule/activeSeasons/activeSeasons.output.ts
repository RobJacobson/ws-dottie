/**
 * @fileoverview WSF Schedule API Output Schemas for Active Seasons
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API active seasons operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Base schedule schema containing common schedule fields
 *
 * This operation retrieves a summary of active seasons.
 */
export const scheduleBaseSchema = z
  .object({
    ScheduleID: z.number().describe("Numeric ID of the schedule season."),
    ScheduleName: z.string().describe("Display name of the schedule season."),
    ScheduleSeason: z
      .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
      .describe(
        "Code indicating season: 0 = Spring, 1 = Summer, 2 = Fall, 3 = Winter."
      ),
    SchedulePDFUrl: z
      .string()
      .describe("URL to printable schedule PDF document."),
    ScheduleStart: zDotnetDate().describe(
      "UTC datetime when the schedule season becomes effective (typically 3:00 AM)."
    ),
    ScheduleEnd: zDotnetDate().describe(
      "UTC datetime when the schedule season stops being effective (typically 2:59 AM next day)."
    ),
  })
  .describe(
    "Schedule season information including identifier, name, season code, PDF URL, and effective date range."
  );

export type ScheduleBase = z.infer<typeof scheduleBaseSchema>;

/**
 * Schema for ActiveSeason - represents active season information
 */
export const activeSeasonSchema = scheduleBaseSchema;

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;
