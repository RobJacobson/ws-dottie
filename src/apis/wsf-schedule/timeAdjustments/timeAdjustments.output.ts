/**
 * @fileoverview WSF Schedule API Output Schemas for Time Adjustments
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API time adjustment operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for TimeAdjustment - represents time adjustment information
 */
export const timeAdjustmentSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /** Unique identifier for the underlying route. */
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  /** The full name of the route. */
  RouteDescription: z
    .string()
    .nullable()
    .describe("The full name of the route."),
  /**
   * A preferred sort order (sort-ascending with respect to other routes).
   */
  RouteSortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other routes)."
    ),
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
   * A collection of date ranges detailing when this sailing is active.
   */
  ActiveSailingDateRange: z
    .object({
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
      EventID: z
        .number()
        .nullable()
        .describe("Unique identifier for an event."),
      /** Explaination (if necessary) of this sailing date range. */
      EventDescription: z
        .string()
        .nullable()
        .describe("Explaination (if necessary) of this sailing date range."),
    })
    .nullable()
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
  /**
   * Indicates the direction of travel. 1 for Westbound, 2 for Eastbound.
   */
  SailingDir: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  /** Unique identifier for a journey. */
  JourneyID: z.number().describe("Unique identifier for a journey."),
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
  /** Unique identifier for a terminal time. */
  JourneyTerminalID: z
    .number()
    .describe("Unique identifier for a terminal time."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The full name of the terminal. */
  TerminalDescription: z.string().describe("The full name of the terminal."),
  /** A brief / shortened name for the terminal. */
  TerminalBriefDescription: z
    .string()
    .describe("A brief / shortened name for the terminal."),
  /**
   * The departure / arrival time that is either being added or cancelled.
   */
  TimeToAdj: zDotnetDate().describe(
    "The departure / arrival time that is either being added or cancelled."
  ),
  /**
   * The starting trip date when the adjustment should be applied.
   */
  AdjDateFrom: zDotnetDate().describe(
    "The starting trip date when the adjustment should be applied."
  ),
  /**
   * The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date.
   */
  AdjDateThru: zDotnetDate().describe(
    "The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date."
  ),
  /**
   * Indicates whether or not the adjustment is a result of tidal conditions.
   */
  TidalAdj: z
    .boolean()
    .describe(
      "Indicates whether or not the adjustment is a result of tidal conditions."
    ),
  /** Unique identifier for an event. */
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  /** Explaination (if necessary) of this adjustment. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this adjustment."),
  /**
   * Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival.
   */
  DepArrIndicator: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival."
    ),
  /**
   * Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation.
   */
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  /**
   * Informational attributes associated with the departure / arrival time.
   */
  Annotations: z
    .array(
      z.object({
        /** Unique identifier for an annotation. */
        AnnotationID: z
          .number()
          .describe("Unique identifier for an annotation."),
        /** The descriptive content of the annotation. */
        AnnotationText: z
          .string()
          .nullable()
          .describe("The descriptive content of the annotation."),
        /** The descriptive content of the annotation formatted for IVR. */
        AnnotationIVRText: z
          .string()
          .nullable()
          .describe(
            "The descriptive content of the annotation formatted for IVR."
          ),
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
      })
    )
    .describe(
      "Informational attributes associated with the departure / arrival time."
    ),
});

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

/**
 * Time Adjustments List Schema - represents an list of time adjustments
 */
export const timeAdjustmentsListSchema = z
  .array(timeAdjustmentSchema)
  .describe(
    "This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014)."
  );

export type TimeAdjustmentList = z.infer<typeof timeAdjustmentsListSchema>;
