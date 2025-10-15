/**
 * @fileoverview WSF Schedule API Output Schemas for Schedules
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule operations.
 */

import { z } from "zod";

import { zDotnetDate } from "../shared/zDotnetDateSchema";

/**
 * Schema for TerminalCombo - represents terminal combination information
 */
export const terminalComboSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingTerminalName: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingTerminalName: z
    .string()
    .describe("The name of the arriving terminal."),
  /**
   * Informational text that might be associated with the underlying sailing.
   */
  SailingNotes: z
    .string()
    .describe(
      "Informational text that might be associated with the underlying sailing."
    ),
  /**
   * An list of annotation strings assigned to one or more items in the Times list.
   */
  Annotations: z
    .array(z.string())
    .describe(
      "An list of annotation strings assigned to one or more items in the Times list."
    ),
  /**
   * Scheduled departure details, including departure times.
   */
  Times: z
    .array(
      z.object({
        /** The date and time of the departure. */
        DepartingTime: zDotnetDate().describe(
          "The date and time of the departure."
        ),
        /** The date and time of the arrival. */
        ArrivingTime: zDotnetDate()
          .nullable()
          .describe("The date and time of the arrival."),
        /**
         * Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both.
         */
        LoadingRule: z
          .union([z.literal(1), z.literal(2), z.literal(3)])
          .describe(
            "Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both."
          ),
        /**
         * Unique identifier for the vessel that's planned to service this departure.
         */
        VesselID: z
          .number()
          .describe(
            "Unique identifier for the vessel that's planned to service this departure."
          ),
        /**
         * The name of the vessel that's planned to service this departure.
         */
        VesselName: z
          .string()
          .describe(
            "The name of the vessel that's planned to service this departure."
          ),
        /**
         * A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible.
         */
        VesselHandicapAccessible: z
          .boolean()
          .describe(
            "A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible."
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
         * An list of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes.
         */
        Routes: z
          .array(z.number())
          .describe(
            "An list of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes."
          ),
        /**
         * An list of index integers indicating the elements in the Annotations list that apply to this departure.
         */
        AnnotationIndexes: z
          .array(z.number())
          .describe(
            "An list of index integers indicating the elements in the Annotations list that apply to this departure."
          ),
      })
    )
    .describe("Scheduled departure details, including departure times."),
  /**
   * An list of annotation strings assigned to one or more items in the Times list formatted for IVR.
   */
  AnnotationsIVR: z
    .array(z.string())
    .describe(
      "An list of annotation strings assigned to one or more items in the Times list formatted for IVR."
    ),
});

export type TerminalCombo = z.infer<typeof terminalComboSchema>;

/**
 * Terminal Combos List Schema - represents an list of terminal combinations
 */
export const terminalCombosListSchema = z
  .array(terminalComboSchema)
  .describe(
    "This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboList = z.infer<typeof terminalCombosListSchema>;

/**
 * Schema for Schedule - represents schedule information
 */
export const scheduleSchema = z.object({
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
  /**
   * An list of RouteID integers representing all the routes accounted for in this resultset.
   */
  AllRoutes: z
    .array(z.number())
    .describe(
      "An list of RouteID integers representing all the routes accounted for in this resultset."
    ),
  /**
   * A grouping of departure and arrival terminal pairs.
   */
  TerminalCombos: terminalCombosListSchema.describe(
    "A grouping of departure and arrival terminal pairs."
  ),
});

export type Schedule = z.infer<typeof scheduleSchema>;
