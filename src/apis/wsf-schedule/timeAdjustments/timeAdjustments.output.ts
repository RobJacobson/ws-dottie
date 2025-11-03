/**
 * @fileoverview WSF Schedule API Output Schemas for Time Adjustments
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API time adjustment operations.
 */

import { z } from "@/shared/zod-openapi-init";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for TimeAdjustment - represents time adjustment information
 */
export const timeAdjustmentSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique schedule season identifier, as an integer ID. E.g., '193' for Fall 2025 schedule. Used to identify which schedule season this adjustment belongs to."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique scheduled route identifier, as an integer ID. E.g., '2383' for Port Townsend/Coupeville route in Fall 2025. Used to identify which scheduled route this adjustment belongs to."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique underlying route identifier, as an integer ID. E.g., '8' for Port Townsend/Coupeville route. Used to identify base route for adjustment."
      ),
    RouteDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable full name of route, as a route description. E.g., 'Port Townsend / Coupeville' for route 8, null when route description is unavailable. Provides route identification for display."
      ),
    RouteSortSeq: z
      .number()
      .describe(
        "Preferred sort order for route display, as an integer. E.g., '30' for Port Townsend/Coupeville route. Lower values appear first when sorting routes in ascending order. Used for route display ordering."
      ),
    SailingID: z
      .number()
      .describe(
        "Unique sailing identifier, as an integer ID. E.g., '7693' for 'Fall Leave Port Townsend' sailing. Used to identify which sailing this adjustment applies to."
      ),
    SailingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable title describing sailing, as a sailing description. E.g., 'Fall Leave Port Townsend' for Port Townsend/Coupeville route sailing, null when description is unavailable. Provides sailing identification for display."
      ),
    ActiveSailingDateRange: z
      .object({
        DateFrom: zDotnetDate().describe(
          "Start date when sailing date range becomes active, as a UTC datetime. E.g., '2025-10-13T07:00:00.000Z' for Fall sailing start. If consumer needs specific time, translate trip date value to 3:00 AM on that date. Indicates when sailing date range begins."
        ),
        DateThru: zDotnetDate().describe(
          "End date when sailing date range stops being active, as a UTC datetime. E.g., '2025-12-27T08:00:00.000Z' for Fall sailing end. If consumer needs specific time, translate trip date value to next calendar date at 2:59 AM. Indicates when sailing date range ends."
        ),
        EventID: z
          .number()
          .nullable()
          .describe(
            "Unique identifier for event associated with sailing date range, as an integer ID. E.g., null when no specific event triggers date range. Used to link date range to specific events or contingencies."
          ),
        EventDescription: z
          .string()
          .nullable()
          .describe(
            "Human-readable explanation of sailing date range, as an event description. E.g., null when explanation is not needed. Provides context for why sailing date range exists."
          ),
      })
      .nullable()
      .describe(
        "Active date range for sailing including start/end dates, event ID, and event description. E.g., Fall 2025 date range from October 13 to December 27. Used for identifying when specific sailing is active."
      ),
    SailingDir: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Direction of travel for sailing, as a direction code. Valid values: 1 (Westbound), 2 (Eastbound). E.g., '1' for westbound sailing from Port Townsend, '2' for eastbound sailing. Used to determine sailing direction."
      ),
    JourneyID: z
      .number()
      .describe(
        "Unique journey identifier, as an integer ID. E.g., '164527' for journey from Port Townsend, '164528' for second journey. Used to identify which journey this adjustment applies to."
      ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for vessel planned to service journey, as an integer ID. E.g., '66' for Salish vessel. Used to identify which vessel operates journey."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of vessel planned to service journey, as a vessel name. E.g., 'Salish' for vessel 66, null when vessel name is unavailable. Provides vessel identification for display."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicator whether vessel is ADA accessible, as a boolean. E.g., true for accessible vessels like Salish. Used to determine accessibility for passengers with disabilities."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number representing single vessel servicing all stops in journey, as an integer. E.g., '1' for first vessel position. Used for vessel scheduling and position tracking."
      ),
    JourneyTerminalID: z
      .number()
      .describe(
        "Unique identifier for terminal time within journey, as an integer ID. E.g., '233261' for Port Townsend terminal time, '233262' for second terminal time. Used as primary key for terminal time identification within journey."
      ),
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for terminal, as an integer ID. E.g., '17' for Port Townsend terminal. Used to identify which terminal this adjustment applies to."
      ),
    TerminalDescription: z
      .string()
      .describe(
        "Human-readable full name of terminal, as a terminal name. E.g., 'Port Townsend' for terminal 17. Provides terminal identification for display."
      ),
    TerminalBriefDescription: z
      .string()
      .describe(
        "Brief shortened name for terminal, as a terminal abbreviation. E.g., 'P. Townsend' for Port Townsend terminal. Used for compact terminal display."
      ),
    TimeToAdj: zDotnetDate().describe(
      "Departure or arrival time being added or cancelled, as a UTC datetime. E.g., '1900-01-02T01:15:00.000Z' for 1:15 AM departure time adjustment. Note: Date portion (1900-01-01) is placeholder, use time portion for actual schedule time. Used for identifying which time is being adjusted."
    ),
    AdjDateFrom: zDotnetDate().describe(
      "Starting trip date when adjustment should be applied, as a UTC datetime. E.g., '2025-11-03T08:00:00.000Z' for adjustment starting November 3, 2025. Indicates when adjustment period begins."
    ),
    AdjDateThru: zDotnetDate().describe(
      "Ending trip date when adjustment should be applied, as a UTC datetime. E.g., '2025-11-03T08:00:00.000Z' for adjustment ending November 3, 2025 (single date). If same as AdjDateFrom, adjustment applies to single date only. Indicates when adjustment period ends."
    ),
    TidalAdj: z
      .boolean()
      .describe(
        "Indicator whether adjustment is result of tidal conditions, as a boolean. E.g., true for tidal adjustments like Port Townsend cancellations, false for non-tidal adjustments. Used to identify tidal-related schedule modifications."
      ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for event prompting adjustment, as an integer ID. E.g., null when no specific event triggers adjustment. Used to link adjustment to specific events or contingencies."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable explanation of adjustment, as an event description. E.g., null when explanation is unavailable. Provides context for why adjustment exists."
      ),
    DepArrIndicator: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Indicator whether adjustment applies to departure or arrival, as a dep/arr code. Valid values: 1 (Departure), 2 (Arrival). E.g., '1' for departure adjustment. Used to determine if adjustment affects departure or arrival time."
      ),
    AdjType: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Type of time adjustment, as an adjustment type code. Valid values: 1 (Addition), 2 (Cancellation). E.g., '2' for cancellation adjustment, '1' for addition adjustment. Used to determine if adjustment adds or removes service."
      ),
    Annotations: z
      .array(
        z
          .object({
            AnnotationID: z
              .number()
              .describe(
                "Unique annotation identifier, as an integer ID. Used as primary key for annotation identification."
              ),
            AnnotationText: z
              .string()
              .nullable()
              .describe(
                "Human-readable descriptive content of annotation, as an annotation description. E.g., null when annotation text is unavailable. Provides annotation information for display."
              ),
            AnnotationIVRText: z
              .string()
              .nullable()
              .describe(
                "Annotation text formatted for Interactive Voice Response systems, as an IVR description. E.g., null when IVR text is unavailable. Used for telephone-based schedule information systems."
              ),
            AdjustedCrossingTime: z
              .number()
              .nullable()
              .describe(
                "Adjusted crossing time override in minutes, as minutes. E.g., null when annotation does not override crossing time. Present when annotation requires override of standard CrossingTime value from route details. Used for special sailing time adjustments."
              ),
            AnnotationImg: z
              .string()
              .nullable()
              .describe(
                "URL to image representing annotation graphically, as an image URL. E.g., null when image URL is unavailable. Used for visual annotation display."
              ),
            TypeDescription: z
              .string()
              .nullable()
              .describe(
                "Logical grouping category for annotation, as a type description. E.g., null when type is unavailable. Used for annotation categorization and filtering."
              ),
            SortSeq: z
              .number()
              .describe(
                "Preferred sort order for annotation display, as an integer. Lower values appear first when sorting annotations in ascending order. Used for annotation display ordering."
              ),
          })
          .describe(
            "Represents annotation information including annotation ID, text descriptions, IVR text, crossing time override, image URL, type, and sort order. Used for displaying additional adjustment information and restrictions."
          )
      )
      .describe(
        "Array of informational annotations associated with departure/arrival time, as annotation objects. E.g., empty array when no annotations, array containing annotation details when annotations apply. Used for displaying additional adjustment information."
      ),
  })
  .describe(
    "Represents time adjustment information including schedule/route/sailing/journey IDs, vessel details, terminal information, adjustment dates and times, tidal flag, adjustment type, and annotations. E.g., cancellation adjustment (type 2) for Port Townsend departure at 1:15 AM on November 3, 2025 due to tidal conditions. Used for identifying schedule deviations, special date modifications, and time adjustments."
  );

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
