/**
 * @fileoverview WSF Schedule API Output Schemas for Time Adjustments
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API time adjustment operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TimeAdjustment - represents time adjustment information
 */
export const timeAdjustmentSchema = z
  .object({
    ScheduleID: z.number().describe("Numeric ID of the schedule season."),
    SchedRouteID: z.number().describe("Numeric ID of the scheduled route."),
    RouteID: z.number().describe("Numeric ID of the underlying route."),
    RouteDescription: z
      .string()
      .nullable()
      .describe("Display name of the route."),
    RouteSortSeq: z
      .number()
      .describe("Display sort order; lower values appear first."),
    SailingID: z.number().describe("Numeric ID of the sailing."),
    SailingDescription: z
      .string()
      .nullable()
      .describe("Display name of the sailing."),
    ActiveSailingDateRange: z
      .object({
        DateFrom: z.date().describe(
          "UTC datetime when the sailing date range begins."
        ),
        DateThru: z.date().describe(
          "UTC datetime when the sailing date range ends."
        ),
        EventID: z
          .number()
          .nullable()
          .describe("Numeric ID of the event associated with the date range."),
        EventDescription: z
          .string()
          .nullable()
          .describe("Description of the event associated with the date range."),
      })
      .nullable()
      .describe("Active date range for the sailing."),
    SailingDir: z
      .union([z.literal(1), z.literal(2)])
      .describe("Sailing direction code: 1 = Westbound, 2 = Eastbound."),
    JourneyID: z.number().describe("Numeric ID of the journey."),
    VesselID: z.number().describe("Numeric ID of the vessel."),
    VesselName: z.string().nullable().describe("Display name of the vessel."),
    VesselHandicapAccessible: z
      .boolean()
      .describe("True if the vessel is ADA accessible; otherwise false."),
    VesselPositionNum: z
      .number()
      .describe("Position number for vessel scheduling."),
    JourneyTerminalID: z
      .number()
      .describe("Numeric ID of the terminal time within the journey."),
    TerminalID: z.number().describe("Numeric ID of the terminal."),
    TerminalDescription: z.string().describe("Display name of the terminal."),
    TerminalBriefDescription: z
      .string()
      .describe("Abbreviated name of the terminal."),
    TimeToAdj: z.date().describe(
      "UTC datetime of the departure or arrival time being adjusted. Note: date portion is placeholder; use time portion."
    ),
    AdjDateFrom: z.date().describe(
      "UTC datetime when the adjustment period begins."
    ),
    AdjDateThru: z.date().describe(
      "UTC datetime when the adjustment period ends."
    ),
    TidalAdj: z
      .boolean()
      .describe(
        "True if the adjustment is due to tidal conditions; otherwise false."
      ),
    EventID: z
      .number()
      .nullable()
      .describe("Numeric ID of the event prompting the adjustment."),
    EventDescription: z
      .string()
      .nullable()
      .describe("Description of the event prompting the adjustment."),
    DepArrIndicator: z
      .union([z.literal(1), z.literal(2)])
      .describe("Indicator code: 1 = Departure, 2 = Arrival."),
    AdjType: z
      .union([z.literal(1), z.literal(2)])
      .describe("Adjustment type code: 1 = Addition, 2 = Cancellation."),
    Annotations: z
      .array(
        z
          .object({
            AnnotationID: z.number().describe("Numeric ID of the annotation."),
            AnnotationText: z
              .string()
              .nullable()
              .describe("Text content of the annotation."),
            AnnotationIVRText: z
              .string()
              .nullable()
              .describe("Annotation text formatted for IVR systems."),
            AdjustedCrossingTime: z
              .number()
              .nullable()
              .describe("Adjusted crossing time override in minutes."),
            AnnotationImg: z
              .string()
              .nullable()
              .describe("URL to image representing the annotation."),
            TypeDescription: z
              .string()
              .nullable()
              .describe("Category or type of the annotation."),
            SortSeq: z
              .number()
              .describe("Display sort order; lower values appear first."),
          })
          .describe("Annotation information for the adjustment.")
      )
      .describe("Array of annotations associated with the adjustment."),
  })
  .describe(
    "Time adjustment representing modifications to scheduled sailing times, including additions, cancellations, and timing changes for specific dates."
  );

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

/**
 * Time Adjustments List Schema - represents an list of time adjustments
 */
export const timeAdjustmentsListSchema = z
  .array(timeAdjustmentSchema)
  .describe("Array of time adjustment records.");

export type TimeAdjustmentList = z.infer<typeof timeAdjustmentsListSchema>;
