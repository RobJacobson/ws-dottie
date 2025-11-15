/**
 * @fileoverview WSF Schedule API Output Schemas for Sailings
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API sailing operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for ActiveDateRange - represents active date range information
 */
export const activeDateRangeSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "UTC datetime when the sailing date range becomes active (typically 3:00 AM)."
    ),
    DateThru: zDotnetDate().describe(
      "UTC datetime when the sailing date range stops being active (typically 2:59 AM next day)."
    ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Numeric ID of the event associated with sailing date range, or null if none."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable explanation of sailing date range, or null if unavailable."
      ),
  })
  .describe(
    "Active date range for sailing including start/end dates, event ID, and description."
  );

export type ActiveDateRange = z.infer<typeof activeDateRangeSchema>;

/**
 * Active Date Ranges List Schema - represents an list of active date ranges
 */
export const activeDateRangesListSchema = z
  .array(activeDateRangeSchema)
  .describe("Array of active date ranges for sailing.");

export type ActiveDateRangeList = z.infer<typeof activeDateRangesListSchema>;

/**
 * Schema for Annotation - represents annotation information
 */
export const annotationSchema = z
  .object({
    AnnotationID: z.number().describe("Numeric ID of the annotation."),
    AnnotationText: z
      .string()
      .nullable()
      .describe("Human-readable annotation content, or null if unavailable."),
    AnnotationIVRText: z
      .string()
      .nullable()
      .describe(
        "Annotation text formatted for Interactive Voice Response systems, or null if unavailable."
      ),
    AdjustedCrossingTime: z
      .number()
      .nullable()
      .describe(
        "Adjusted crossing time override in minutes, or null if no override."
      ),
    AnnotationImg: z
      .string()
      .nullable()
      .describe(
        "URL to image representing annotation, or null if unavailable."
      ),
    TypeDescription: z
      .string()
      .nullable()
      .describe(
        "Logical grouping category for annotation, or null if unavailable."
      ),
    SortSeq: z
      .number()
      .describe("Display sort order; lower values appear first."),
  })
  .describe(
    "Annotation information including ID, text, IVR text, crossing time override, image URL, type, and sort order."
  );

export type Annotation = z.infer<typeof annotationSchema>;

/**
 * Annotations List Schema - represents an list of annotations
 */
export const annotationsListSchema = z
  .array(annotationSchema)
  .describe("Array of annotation information.");

export type AnnotationList = z.infer<typeof annotationsListSchema>;

/**
 * Schema for TerminalTime - represents terminal time information
 */
export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z
      .number()
      .describe("Numeric ID of the terminal time within journey."),
    TerminalID: z.number().describe("Numeric ID of the terminal."),
    TerminalDescription: z
      .string()
      .nullable()
      .describe("Display name of the terminal, or null if unavailable."),
    TerminalBriefDescription: z
      .string()
      .nullable()
      .describe("Brief name for terminal, or null if unavailable."),
    Time: zDotnetDate()
      .nullable()
      .describe(
        "Departure or arrival time at terminal in UTC. Note: Date portion (1900-01-01) is placeholder, use time portion only. Null if journey does not stop at terminal."
      ),
    DepArrIndicator: z
      .union([z.literal(1), z.literal(2)])
      .nullable()
      .describe(
        "Code indicating stop type: 1 = Departure, 2 = Arrival. Null if journey does not stop at terminal."
      ),
    IsNA: z
      .boolean()
      .describe(
        "True if journey does not interact with this terminal (skips it); otherwise false."
      ),
    Annotations: annotationsListSchema
      .nullable()
      .describe(
        "Array of informational annotations associated with terminal time, or null if none."
      ),
  })
  .describe(
    "Terminal time information within journey including terminal identification, time, indicator, skip flag, and annotations."
  );

export type TerminalTime = z.infer<typeof terminalTimeSchema>;

/**
 * Terminal Times List Schema - represents an list of terminal times
 */
export const terminalTimesListSchema = z
  .array(terminalTimeSchema)
  .describe("Array of terminal time information.");

export type TerminalTimeList = z.infer<typeof terminalTimesListSchema>;

/**
 * Schema for Journey - represents journey information
 */
export const journeySchema = z
  .object({
    JourneyID: z.number().describe("Numeric ID of the journey."),
    ReservationInd: z
      .boolean()
      .describe(
        "True if journey contains reservable departures; otherwise false."
      ),
    InternationalInd: z
      .boolean()
      .describe(
        "True if journey travels outside United States; otherwise false."
      ),
    InterislandInd: z
      .boolean()
      .describe(
        "True if journey operates primarily between islands; otherwise false."
      ),
    VesselID: z
      .number()
      .describe("Numeric ID of the vessel planned to service journey."),
    VesselName: z
      .string()
      .nullable()
      .describe("Display name of the vessel, or null if unavailable."),
    VesselHandicapAccessible: z
      .boolean()
      .describe("True if vessel is ADA accessible; otherwise false."),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number representing vessel servicing all stops in journey."
      ),
    TerminalTimes: terminalTimesListSchema
      .nullable()
      .describe(
        "Array of terminal departures and arrivals made by same vessel, or null if unavailable."
      ),
  })
  .describe(
    "Journey information including ID, indicators, vessel details, and terminal times."
  );

export type Journey = z.infer<typeof journeySchema>;

/**
 * Journeys List Schema - represents an list of journeys
 */
export const journeysListSchema = z
  .array(journeySchema)
  .describe("Array of journey information.");

export type JourneyList = z.infer<typeof journeysListSchema>;

/**
 * Schema for Sailing - represents sailing information
 */
export const sailingSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe("Numeric ID of the schedule season this sailing belongs to."),
    SchedRouteID: z
      .number()
      .describe("Numeric ID of the scheduled route this sailing belongs to."),
    RouteID: z
      .number()
      .describe("Numeric ID of the underlying route for sailing."),
    SailingID: z.number().describe("Numeric ID of the sailing."),
    SailingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable title describing sailing, or null if unavailable."
      ),
    SailingNotes: z
      .string()
      .nullable()
      .describe(
        "Informational text associated with sailing, or null if unavailable."
      ),
    DisplayColNum: z
      .number()
      .describe(
        "Suggested number of columns for rendering departures on desktop webpage."
      ),
    SailingDir: z
      .union([z.literal(1), z.literal(2)])
      .describe("Code indicating direction: 1 = Westbound, 2 = Eastbound."),
    DayOpDescription: z
      .string()
      .nullable()
      .describe(
        "Days of operation grouping for sailing, or null if unavailable."
      ),
    DayOpUseForHoliday: z
      .boolean()
      .describe("True if sailing should apply for holidays; otherwise false."),
    ActiveDateRanges: activeDateRangesListSchema
      .nullable()
      .describe(
        "Array of date ranges detailing when sailing is active, or null if unavailable."
      ),
    Journs: journeysListSchema
      .nullable()
      .describe(
        "Array of journeys representing vessel stops at terminals, or null if unavailable."
      ),
  })
  .describe(
    "Sailing information including IDs, description, direction, days of operation, holiday flag, active date ranges, and journeys."
  );

export type Sailing = z.infer<typeof sailingSchema>;

/**
 * Sailings List Schema - represents an list of sailings
 */
export const sailingsListSchema = z
  .array(sailingSchema)
  .describe("Array of sailing information.");

export type SailingList = z.infer<typeof sailingsListSchema>;
