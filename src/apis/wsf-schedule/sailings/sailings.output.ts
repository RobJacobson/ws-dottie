/**
 * @fileoverview WSF Schedule API Output Schemas for Sailings
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API sailing operations.
 */

import { z } from "zod";

import { zDotnetDate } from "../shared/zDotnetDateSchema";

/**
 * Schema for ActiveDateRange - represents active date range information
 */
export const activeDateRangeSchema = z.object({
  /**
   * A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am.
   */
  DateFrom: zDotnetDate().describe(
    "A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am."
  ),
  /**
   * A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am.
   */
  DateThru: zDotnetDate().describe(
    "A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am."
  ),
  /** Unique identifier for an event. */
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  /** Explaination (if necessary) of this sailing date range. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this sailing date range."),
});

export type ActiveDateRange = z.infer<typeof activeDateRangeSchema>;

/**
 * Active Date Ranges List Schema - represents an list of active date ranges
 */
export const activeDateRangesListSchema = z
  .array(activeDateRangeSchema)
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type ActiveDateRangeList = z.infer<typeof activeDateRangesListSchema>;

/**
 * Schema for Annotation - represents annotation information
 */
export const annotationSchema = z.object({
  /** Unique identifier for an annotation. */
  AnnotationID: z.number().describe("Unique identifier for an annotation."),
  /** The descriptive content of the annotation. */
  AnnotationText: z
    .string()
    .nullable()
    .describe("The descriptive content of the annotation."),
  /** The descriptive content of the annotation formatted for IVR. */
  AnnotationIVRText: z
    .string()
    .nullable()
    .describe("The descriptive content of the annotation formatted for IVR."),
  /**
   * Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details.
   */
  AdjustedCrossingTime: z
    .number()
    .nullable()
    .describe(
      "Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details."
    ),
  /**
   * A URL to an image that can be used to graphically represent this annotation.
   */
  AnnotationImg: z
    .string()
    .nullable()
    .describe(
      "A URL to an image that can be used to graphically represent this annotation."
    ),
  /**
   * A logical grouping for the annotation (Day Type, Informational, etc).
   */
  TypeDescription: z
    .string()
    .nullable()
    .describe(
      "A logical grouping for the annotation (Day Type, Informational, etc)."
    ),
  /**
   * A preferred sort order (sort-ascending with respect to other annotations).
   */
  SortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other annotations)."
    ),
});

export type Annotation = z.infer<typeof annotationSchema>;

/**
 * Annotations List Schema - represents an list of annotations
 */
export const annotationsListSchema = z
  .array(annotationSchema)
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type AnnotationList = z.infer<typeof annotationsListSchema>;

/**
 * Schema for TerminalTime - represents terminal time information
 */
export const terminalTimeSchema = z.object({
  /** Unique identifier for a terminal time. */
  JourneyTerminalID: z
    .number()
    .describe("Unique identifier for a terminal time."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The full name of the terminal. */
  TerminalDescription: z
    .string()
    .nullable()
    .describe("The full name of the terminal."),
  /** A brief / shortened name for the terminal. */
  TerminalBriefDescription: z
    .string()
    .nullable()
    .describe("A brief / shortened name for the terminal."),
  /**
   * The time of the departure / arrival. If the journey does not stop at this terminal no value will be present.
   */
  Time: zDotnetDate()
    .nullable()
    .describe(
      "The time of the departure / arrival. If the journey does not stop at this terminal no value will be present."
    ),
  /**
   * Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. If the journey does not stop at this terminal no value will be present.
   */
  DepArrIndicator: z
    .union([z.literal(1), z.literal(2)])
    .nullable()
    .describe(
      "Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. If the journey does not stop at this terminal no value will be present."
    ),
  /**
   * If true indicates that the journey does not interact with this terminal.
   */
  IsNA: z
    .boolean()
    .describe(
      "If true indicates that the journey does not interact with this terminal."
    ),
  /**
   * Informational attributes associated with the terminal time.
   */
  Annotations: annotationsListSchema
    .nullable()
    .describe("Informational attributes associated with the terminal time."),
});

export type TerminalTime = z.infer<typeof terminalTimeSchema>;

/**
 * Terminal Times List Schema - represents an list of terminal times
 */
export const terminalTimesListSchema = z
  .array(terminalTimeSchema)
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type TerminalTimeList = z.infer<typeof terminalTimesListSchema>;

/**
 * Schema for Journey - represents journey information
 */
export const journeySchema = z.object({
  /** Unique identifier for a journey. */
  JourneyID: z.number().describe("Unique identifier for a journey."),
  /**
   * Indicates whether or not the journey contains reservable departures.
   */
  ReservationInd: z
    .boolean()
    .describe(
      "Indicates whether or not the journey contains reservable departures."
    ),
  /**
   * Indicates whether or not the journey travels outside the US.
   */
  InternationalInd: z
    .boolean()
    .describe("Indicates whether or not the journey travels outside the US."),
  /**
   * If true, this indicates that the journey operates primarily between islands and a single mainland.
   */
  InterislandInd: z
    .boolean()
    .describe(
      "If true, this indicates that the journey operates primarily between islands and a single mainland."
    ),
  /**
   * Unique identifier for the vessel that's planned to service this journey.
   */
  VesselID: z
    .number()
    .describe(
      "Unique identifier for the vessel that's planned to service this journey."
    ),
  /**
   * The name of the vessel that's planned to service this journey.
   */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel that's planned to service this journey."),
  /**
   * A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible.
   */
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible."
    ),
  /**
   * A number that represents a single vessel that services all of the stops in the journey.
   */
  VesselPositionNum: z
    .number()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
  /**
   * One or more terminal departures or arrivals made by the same vessel.
   */
  TerminalTimes: terminalTimesListSchema
    .nullable()
    .describe(
      "One or more terminal departures or arrivals made by the same vessel."
    ),
});

export type Journey = z.infer<typeof journeySchema>;

/**
 * Journeys List Schema - represents an list of journeys
 */
export const journeysListSchema = z
  .array(journeySchema)
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type JourneyList = z.infer<typeof journeysListSchema>;

/**
 * Schema for Sailing - represents sailing information
 */
export const sailingSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /** Unique identifier for the underlying route. */
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  /** Unique identifier for a sailing. */
  SailingID: z.number().describe("Unique identifier for a sailing."),
  /**
   * A title that describes the sailing (eg. Leave Port Townsend).
   */
  SailingDescription: z
    .string()
    .nullable()
    .describe("A title that describes the sailing (eg. Leave Port Townsend)."),
  /**
   * Informational text that might be associated with the sailing.
   */
  SailingNotes: z
    .string()
    .nullable()
    .describe("Informational text that might be associated with the sailing."),
  /**
   * A suggested number of columns to use when rendering departures to a desktop webpage.
   */
  DisplayColNum: z
    .number()
    .describe(
      "A suggested number of columns to use when rendering departures to a desktop webpage."
    ),
  /**
   * Indicates the direction of travel. 1 for Westbound, 2 for Eastbound.
   */
  SailingDir: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  /**
   * A days of operation grouping for the sailing (eg. "Daily").
   */
  DayOpDescription: z
    .string()
    .nullable()
    .describe('A days of operation grouping for the sailing (eg. "Daily").'),
  /**
   * A flag that indicates whether or not the sailing should apply for holidays.
   */
  DayOpUseForHoliday: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the sailing should apply for holidays."
    ),
  /**
   * A collection of date ranges detailing when this sailing is active.
   */
  ActiveDateRanges: activeDateRangesListSchema
    .nullable()
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
  /**
   * A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing.
   */
  Journs: journeysListSchema
    .nullable()
    .describe(
      "A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing."
    ),
});

export type Sailing = z.infer<typeof sailingSchema>;

/**
 * Sailings List Schema - represents an list of sailings
 */
export const sailingsListSchema = z
  .array(sailingSchema)
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type SailingList = z.infer<typeof sailingsListSchema>;
