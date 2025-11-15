/**
 * @fileoverview WSF Schedule API Output Schemas for Schedules
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for TerminalCombo - represents terminal combination information
 */
export const terminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    DepartingTerminalName: z
      .string()
      .describe("Display name of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
    ArrivingTerminalName: z
      .string()
      .describe("Display name of the arriving terminal."),
    SailingNotes: z
      .string()
      .describe("Informational text for this terminal combination."),
    Annotations: z
      .array(z.string())
      .describe(
        "Array of annotation strings assigned to departures in Times list."
      ),
    Times: z
      .array(
        z
          .object({
            DepartingTime: zDotnetDate().describe(
              "UTC datetime of the departure."
            ),
            ArrivingTime: zDotnetDate()
              .nullable()
              .describe("UTC datetime of the arrival."),
            LoadingRule: z
              .union([z.literal(1), z.literal(2), z.literal(3)])
              .describe(
                "Code indicating traveler types: 1 = Passenger, 2 = Vehicle, 3 = Both."
              ),
            VesselID: z
              .number()
              .describe("Numeric ID of the vessel planned for this departure."),
            VesselName: z
              .string()
              .describe(
                "Display name of the vessel planned for this departure."
              ),
            VesselHandicapAccessible: z
              .boolean()
              .describe("True if vessel is ADA accessible; otherwise false."),
            VesselPositionNum: z
              .number()
              .describe(
                "Position number of the vessel servicing all stops in journey."
              ),
            Routes: z
              .array(z.number())
              .describe("Array of route IDs serviced by this departure."),
            AnnotationIndexes: z
              .array(z.number())
              .describe(
                "Array of indexes into Annotations array that apply to this departure."
              ),
          })
          .describe(
            "Scheduled departure detail with times, vessel, and loading rules."
          )
      )
      .describe(
        "Array of scheduled departure details for this terminal combination."
      ),
    AnnotationsIVR: z
      .array(z.string())
      .describe(
        "Array of annotation strings formatted for Interactive Voice Response systems."
      ),
  })
  .describe(
    "Terminal combination schedule with terminal IDs and names, sailing notes, annotations, and departure times."
  );

export type TerminalCombo = z.infer<typeof terminalComboSchema>;

/**
 * Terminal Combos List Schema - represents an list of terminal combinations
 */
export const terminalCombosListSchema = z
  .array(terminalComboSchema)
  .describe("Array of terminal combination schedules.");

export type TerminalComboList = z.infer<typeof terminalCombosListSchema>;

/**
 * Schema for Schedule - represents schedule information
 */
export const scheduleSchema = z
  .object({
    ScheduleID: z.number().describe("Numeric ID of the schedule season."),
    ScheduleName: z.string().describe("Display name of the schedule season."),
    ScheduleSeason: z
      .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
      .describe(
        "Code indicating season: 0 = Spring, 1 = Summer, 2 = Fall, 3 = Winter."
      ),
    SchedulePDFUrl: z.string().describe("URL to the schedule PDF document."),
    ScheduleStart: zDotnetDate().describe(
      "UTC datetime when the schedule season becomes effective."
    ),
    ScheduleEnd: zDotnetDate().describe(
      "UTC datetime when the schedule season stops being effective."
    ),
    AllRoutes: z
      .array(z.number())
      .describe("Array of route IDs included in this schedule."),
    TerminalCombos: terminalCombosListSchema.describe(
      "Array of terminal combination schedules with departure times."
    ),
  })
  .describe(
    "Complete schedule information including season details, routes, and terminal combination schedules with departure times."
  );

export type Schedule = z.infer<typeof scheduleSchema>;
