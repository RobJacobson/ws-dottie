/**
 * @fileoverview WSF Schedule API Output Schemas for Sailings
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API sailing operations.
 */

import { z } from "@/shared/zod-openapi-init";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for ActiveDateRange - represents active date range information
 */
export const activeDateRangeSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "Start date when sailing date range becomes active, as a UTC datetime. E.g., '2025-09-21T07:00:00.000Z' for Fall 2025 season start. If consumer needs specific time, translate trip date value to 3:00 AM on that date. Indicates when sailing date range begins."
    ),
    DateThru: zDotnetDate().describe(
      "End date when sailing date range stops being active, as a UTC datetime. E.g., '2025-12-27T08:00:00.000Z' for Fall 2025 season end. If consumer needs specific time, translate trip date value to next calendar date at 2:59 AM. Indicates when sailing date range ends."
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
        "Human-readable explanation of sailing date range, as an event description. E.g., null when explanation is not needed, description when date range relates to specific events like 'Early Fall' or 'Late Fall'. Provides context for why sailing date range exists."
      ),
  })
  .describe(
    "Represents active date range for sailing including start/end dates, event ID, and event description. E.g., Fall 2025 date range from September 21 to December 27. Used for identifying when specific sailing groups are active."
  );

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
export const annotationSchema = z
  .object({
    AnnotationID: z
      .number()
      .describe(
        "Unique annotation identifier, as an integer ID. E.g., '13333' for 'No interisland vehicles' annotation, '13334' for 'Loads or unloads eastbound traffic' annotation. Used as primary key for annotation identification."
      ),
    AnnotationText: z
      .string()
      .nullable()
      .describe(
        "Human-readable descriptive content of annotation, as an annotation description. E.g., 'No interisland vehicles. Foot passenger and bikes okay.' for vehicle restriction, 'Sundays <i>only</i>' for day type restriction, null when annotation text is unavailable. Provides annotation information for display."
      ),
    AnnotationIVRText: z
      .string()
      .nullable()
      .describe(
        "Annotation text formatted for Interactive Voice Response systems, as an IVR description. E.g., 'No interisland vehicles. Foot passengers and bikes okay.' for IVR playback, 'Sundays only' for simplified IVR text, null when IVR text is unavailable. Used for telephone-based schedule information systems."
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
        "URL to image representing annotation graphically, as an image URL. E.g., 'https://www.wsdot.wa.gov/ferries/images/legends/triangle_down_red.gif' for vehicle restriction icon, 'https://www.wsdot.wa.gov/ferries/images/legends/Sun_blue.gif' for Sunday-only icon, null when image URL is unavailable. Used for visual annotation display."
      ),
    TypeDescription: z
      .string()
      .nullable()
      .describe(
        "Logical grouping category for annotation, as a type description. E.g., 'Informational' for general information annotations, 'Day Type' for day-of-week restrictions, null when type is unavailable. Used for annotation categorization and filtering."
      ),
    SortSeq: z
      .number()
      .describe(
        "Preferred sort order for annotation display, as an integer. E.g., '10' for first annotation, '30' for third annotation, '100' for later annotation. Lower values appear first when sorting annotations in ascending order. Used for annotation display ordering."
      ),
  })
  .describe(
    "Represents annotation information including annotation ID, text descriptions, IVR text, crossing time override, image URL, type, and sort order. E.g., annotation 13333 'No interisland vehicles' (Informational type, sort 10). Used for displaying additional sailing information and restrictions."
  );

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
export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z
      .number()
      .describe(
        "Unique identifier for terminal time within journey, as an integer ID. E.g., '236937' for Friday Harbor terminal time, '236938' for Orcas Island terminal time. Used as primary key for terminal time identification within journey."
      ),
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '15' for Orcas Island terminal, '18' for Shaw Island terminal. Used to identify which terminal this time applies to."
      ),
    TerminalDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable full name of terminal, as a terminal name. E.g., 'Friday Harbor' for terminal 10, 'Orcas Island' for terminal 15, 'Shaw Island' for terminal 18, null when terminal name is unavailable. Provides terminal identification for display."
      ),
    TerminalBriefDescription: z
      .string()
      .nullable()
      .describe(
        "Brief shortened name for terminal, as a terminal abbreviation. E.g., 'Friday Harbor' for terminal 10, 'Orcas' for terminal 15, 'Shaw' for terminal 18, null when brief description is unavailable. Used for compact terminal display."
      ),
    Time: zDotnetDate()
      .nullable()
      .describe(
        "Departure or arrival time at terminal, as a UTC datetime. E.g., '1900-01-01T14:05:00.000Z' for 2:05 PM departure, null when journey does not stop at this terminal. Note: Date portion (1900-01-01) is placeholder, use time portion for actual schedule time. Used for terminal timing information."
      ),
    DepArrIndicator: z
      .union([z.literal(1), z.literal(2)])
      .nullable()
      .describe(
        "Indicator whether stop represents departure or arrival, as a dep/arr code. Valid values: 1 (Departure), 2 (Arrival). E.g., '1' for departure from Friday Harbor, '2' for arrival at Anacortes, null when journey does not stop at terminal. Used to determine if time is departure or arrival."
      ),
    IsNA: z
      .boolean()
      .describe(
        "Indicator whether journey interacts with this terminal, as a boolean. E.g., false when journey stops at terminal, true when journey does not interact with terminal (skips terminal). Used to identify terminals skipped by journey."
      ),
    Annotations: annotationsListSchema
      .nullable()
      .describe(
        "Array of informational annotations associated with terminal time, as annotation objects. E.g., array containing 'No interisland vehicles' annotation, null when no annotations apply. Used for displaying additional terminal time information and restrictions."
      ),
  })
  .describe(
    "Represents terminal time information within journey including terminal identification, departure/arrival time, indicator, skip flag, and annotations. E.g., Friday Harbor terminal (ID 10) with departure time 2:05 PM (dep indicator 1). Used for journey terminal stop information."
  );

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
export const journeySchema = z
  .object({
    JourneyID: z
      .number()
      .describe(
        "Unique journey identifier, as an integer ID. E.g., '166518' for journey from Friday Harbor to Anacortes, '166519' for journey from Orcas Island to Friday Harbor. Used as primary key for journey identification."
      ),
    ReservationInd: z
      .boolean()
      .describe(
        "Indicator whether journey contains reservable departures, as a boolean. E.g., false for most journeys on San Juan Islands route, true when reservations are available. Used to determine if journey supports advance reservations."
      ),
    InternationalInd: z
      .boolean()
      .describe(
        "Indicator whether journey travels outside United States, as a boolean. E.g., false for domestic routes, true for international routes like Anacortes/Sidney B.C. Used to identify international voyages."
      ),
    InterislandInd: z
      .boolean()
      .describe(
        "Indicator whether journey operates primarily between islands and single mainland, as a boolean. E.g., false for mainland-to-island journeys, true for interisland journeys like Friday Harbor-Lopez-Shaw-Orcas pattern. Used to identify interisland routes."
      ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for vessel planned to service journey, as an integer ID. E.g., '38' for Yakima vessel, '2' for Chelan vessel, '33' for Tillikum vessel, '69' for Samish vessel. Used to identify which vessel operates journey."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of vessel planned to service journey, as a vessel name. E.g., 'Yakima' for vessel 38, 'Chelan' for vessel 2, 'Tillikum' for vessel 33, 'Samish' for vessel 69, null when vessel name is unavailable. Provides vessel identification for display."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicator whether vessel is ADA accessible, as a boolean. E.g., true for accessible vessels like Yakima, Chelan, Tillikum, Samish. Used to determine accessibility for passengers with disabilities."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number representing single vessel servicing all stops in journey, as an integer. E.g., '1' for first vessel position, '2' for second vessel position, '3' for third vessel position, '4' for fourth vessel position. Used for vessel scheduling and position tracking."
      ),
    TerminalTimes: terminalTimesListSchema
      .nullable()
      .describe(
        "Array of terminal departures and arrivals made by same vessel, as terminal time objects. E.g., array containing Friday Harbor departure, Orcas Island arrival, Shaw Island arrival, Lopez Island arrival, Anacortes arrival, null when terminal times are unavailable. Represents complete journey terminal stops."
      ),
  })
  .describe(
    "Represents journey information including journey ID, reservation/international/interisland indicators, vessel details, and terminal times. E.g., journey 166518 with Yakima vessel (ID 38, position 2) traveling from Friday Harbor to Anacortes with multiple terminal stops. Used for journey identification and vessel routing."
  );

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
export const sailingSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique schedule season identifier, as an integer ID. E.g., '193' for Fall 2025 schedule. Used to identify which schedule season this sailing belongs to."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique scheduled route identifier, as an integer ID. E.g., '2401' for Anacortes/San Juan Islands route in Fall 2025. Used to identify which scheduled route this sailing belongs to."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique underlying route identifier, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route. Used to identify base route for sailing."
      ),
    SailingID: z
      .number()
      .describe(
        "Unique sailing identifier, as an integer ID. E.g., '166518' for sailing from Friday Harbor to Anacortes. Used as primary key for sailing identification."
      ),
    SailingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable title describing sailing, as a sailing description. E.g., 'Leave Port Townsend' for Port Townsend/Coupeville route, null when description is unavailable. Provides sailing identification for display."
      ),
    SailingNotes: z
      .string()
      .nullable()
      .describe(
        "Informational text associated with sailing, as sailing notes. E.g., null when no notes, notes when special conditions apply. Provides additional sailing information."
      ),
    DisplayColNum: z
      .number()
      .describe(
        "Suggested number of columns for rendering departures on desktop webpage, as an integer. E.g., '1' for single column display, '2' for two column display. Used for layout optimization in schedule displays."
      ),
    SailingDir: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Direction of travel for sailing, as a direction code. Valid values: 1 (Westbound), 2 (Eastbound). E.g., '1' for westbound sailing from Anacortes to Friday Harbor, '2' for eastbound sailing from Friday Harbor to Anacortes. Used to determine sailing direction."
      ),
    DayOpDescription: z
      .string()
      .nullable()
      .describe(
        "Days of operation grouping for sailing, as a day operation description. E.g., 'Daily' for daily sailings, 'Sundays only' for Sunday-only sailings, 'Sails daily except Sundays' for weekday sailings, null when day operation is unavailable. Used for identifying when sailing operates."
      ),
    DayOpUseForHoliday: z
      .boolean()
      .describe(
        "Indicator whether sailing should apply for holidays, as a boolean. E.g., true when sailing operates on holidays, false when sailing does not apply on holidays. Used to determine holiday schedule applicability."
      ),
    ActiveDateRanges: activeDateRangesListSchema
      .nullable()
      .describe(
        "Array of date ranges detailing when sailing is active, as active date range objects. E.g., array containing Fall 2025 date range from September 21 to December 27, null when date ranges are unavailable. Used for identifying active periods for sailing."
      ),
    Journs: journeysListSchema
      .nullable()
      .describe(
        "Array of journeys representing vessel stops at terminals making full trip in sailing direction, as journey objects. E.g., array containing journey with Yakima vessel from Friday Harbor to Anacortes via multiple island stops, null when journeys are unavailable. Represents complete sailing vessel routing."
      ),
  })
  .describe(
    "Represents sailing information including schedule/route/sailing IDs, description, direction, days of operation, holiday flag, active date ranges, and journeys. E.g., sailing 166518 (westbound, daily) for Anacortes/San Juan Islands route with journeys from Friday Harbor to Anacortes. Used for schedule structure and sailing group identification."
  );

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
