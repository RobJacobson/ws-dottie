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
export const scheduleBaseSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique schedule season identifier, as an integer ID. E.g., '193' for Fall 2025 schedule, '194' for Winter 2026 schedule. Used as primary key for schedule season identification."
      ),
    ScheduleName: z
      .string()
      .describe(
        "Human-readable schedule season name, as a season name. E.g., 'Fall 2025' for schedule 193, 'Winter 2026' for schedule 194. Provides season identification for display and user interfaces."
      ),
    ScheduleSeason: z
      .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
      .describe(
        "Quarterly season identifier code, as a season code. Valid values: 0 (Spring), 1 (Summer), 2 (Fall), 3 (Winter). E.g., '2' for Fall schedule, '3' for Winter schedule. Used for seasonal schedule organization and filtering."
      ),
    SchedulePDFUrl: z
      .string()
      .describe(
        "URL to schedule PDF document, as a PDF URL. E.g., 'http://www.wsdot.wa.gov/ferries/pdf/2025Fall.pdf' for Fall 2025 schedule, 'http://www.wsdot.wa.gov/ferries/pdf/2025Winter.pdf' for Winter 2026 schedule. Used for accessing printable schedule documents."
      ),
    ScheduleStart: zDotnetDate().describe(
      "Start date when schedule season becomes effective, as a UTC datetime. E.g., '2025-09-21T07:00:00.000Z' for Fall 2025 season starting September 21, 2025 at 3:00 AM. If consumer needs specific time, translate trip date value to 3:00 AM on that date. Indicates when season schedule begins."
    ),
    ScheduleEnd: zDotnetDate().describe(
      "End date when schedule season stops being effective, as a UTC datetime. E.g., '2025-12-27T08:00:00.000Z' for Fall 2025 season ending December 27, 2025 at 2:59 AM. If consumer needs specific time, translate trip date value to next calendar date at 2:59 AM. Indicates when season schedule ends."
    ),
  })
  .describe(
    "Represents base schedule season information including season identifier, name, quarterly code, PDF URL, and date range. E.g., Fall 2025 schedule (ID 193, season 2) from September 21, 2025 to December 27, 2025. Used as foundation schema shared across schedule season endpoints."
  );

export type ScheduleBase = z.infer<typeof scheduleBaseSchema>;

/**
 * Schema for ActiveSeason - represents active season information
 */
export const activeSeasonSchema = scheduleBaseSchema;

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;
