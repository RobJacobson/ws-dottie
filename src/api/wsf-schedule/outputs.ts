import { z } from "zod";

import { zWsdotDate, zWsfDate } from "@/shared/validation";

/**
 * WSF Schedule API Output Schemas
 *
 * This file contains all output/response schemas for the Washington State Ferries
 * Schedule API. These schemas validate and transform API responses, ensuring type
 * safety and consistent data structures.
 */

// Base schemas
export const serviceDisruptionSchema = z
  .record(z.string(), z.unknown())
  .describe(
    "Service disruption information stored as key-value pairs. Contains dynamic disruption data that varies by route and time, including alerts, delays, cancellations, and other operational issues affecting ferry service."
  );

export const annotationSchema = z
  .object({
    AnnotationID: z
      .number()
      .describe(
        "Unique identifier for the annotation. Used to reference specific annotation details and maintain consistency across API responses."
      ),
    AnnotationText: z
      .string()
      .describe(
        "Human-readable text describing the annotation. Provides context about schedule changes, special conditions, or important notices that affect ferry operations."
      ),
    AnnotationIVRText: z
      .string()
      .describe(
        "Text version of the annotation optimized for Interactive Voice Response systems. Used for phone-based schedule inquiries and automated announcements."
      ),
    AdjustedCrossingTime: z
      .number()
      .nullable()
      .describe(
        "Adjusted crossing time in minutes, if applicable. Null when no time adjustment is needed. Positive values indicate delays, negative values indicate early departures."
      ),
    AnnotationImg: z
      .string()
      .describe(
        "URL or identifier for an image associated with the annotation. May contain visual information about the annotation, such as route maps or service notices."
      ),
    TypeDescription: z
      .string()
      .describe(
        "Human-readable description of the annotation type. Categorizes the nature of the annotation (e.g., 'Delay', 'Cancellation', 'Special Service')."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures annotations are displayed in the correct order across different systems and interfaces."
      ),
  })
  .describe(
    "Annotation information for schedule changes, special conditions, or important notices. Provides additional context about ferry operations and helps passengers understand service modifications."
  );

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsfDate().describe(
      "Start date for the contingency adjustment period. Indicates when the adjustment becomes effective and begins affecting ferry schedules."
    ),
    DateThru: zWsfDate().describe(
      "End date for the contingency adjustment period. Indicates when the adjustment expires and normal scheduling resumes."
    ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for the event causing the contingency adjustment. Null when no specific event is associated with the adjustment."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the event causing the contingency adjustment. Provides context about why the schedule modification is necessary (e.g., 'Maintenance', 'Weather', 'Special Event')."
      ),
    AdjType: z
      .number()
      .describe(
        "Type of adjustment being applied. Numeric code indicating the nature of the contingency change (e.g., 1=Delay, 2=Cancellation, 3=Route Change)."
      ),
    ReplacedBySchedRouteID: z
      .number()
      .nullable()
      .describe(
        "ID of the scheduled route that replaces the affected route during the contingency period. Null when no replacement route is provided or when the adjustment doesn't involve route substitution."
      ),
  })
  .describe(
    "Contingency adjustment information for schedule changes due to special events, maintenance, weather conditions, or other operational requirements. These adjustments modify normal ferry schedules to accommodate exceptional circumstances."
  );

// Route schemas
export const scheduledRouteSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique identifier for the schedule season. Links the route to a specific schedule period and determines when the route is active."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route instance. Represents a specific route configuration within a schedule, allowing for multiple variations of the same route."
      ),
    ContingencyOnly: z
      .boolean()
      .describe(
        "Indicates whether this route is only available during contingency situations. True when the route is a backup option that operates when normal routes are disrupted."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Links to the base route definition and identifies the specific ferry corridor this schedule applies to."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics."
      ),
    SeasonalRouteNotes: z
      .string()
      .describe(
        "Seasonal notes about the route. Contains information about route availability during different seasons, including summer schedules, winter modifications, and holiday operations."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region."
      ),
    ServiceDisruptions: z
      .array(serviceDisruptionSchema)
      .describe(
        "Array of service disruption information for this route. Contains current disruption status, alerts, and operational issues affecting this specific route."
      ),
    ContingencyAdj: z
      .array(contingencyAdjustmentSchema)
      .describe(
        "Array of contingency adjustments for this route. Contains schedule modifications and special conditions that affect this route's normal operation."
      ),
  })
  .describe(
    "Scheduled route information including route details, schedule associations, operational status, and contingency information. This schema represents a complete view of how a route operates within a specific schedule period."
  );

export const routeSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Primary key for route identification and used consistently across all WSF systems and APIs."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island, 'ANA-SID' for Anacortes to Sidney BC)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics for passenger information."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region within the WSF system."
      ),
    Alerts: z
      .array(serviceDisruptionSchema)
      .optional()
      .describe(
        "Optional array of service disruption alerts for this route. Contains current disruption status, delays, cancellations, or other operational issues affecting this specific route."
      ),
  })
  .describe(
    "Basic route information including identification, description, geographic region, and optional alert status. This schema provides the fundamental route data used across the WSF system for passenger information and operational management."
  );

export const routeDetailsSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Primary key for route identification and used consistently across all WSF systems and APIs."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region."
      ),
    CrossingTime: z
      .number()
      .nullable()
      .describe(
        "Typical crossing time in minutes for this route. Null when crossing time is not available. Represents the scheduled duration from departure to arrival."
      ),
    ReservationFlag: z
      .boolean()
      .describe(
        "Indicates whether reservations are required for this route. True when advance booking is necessary, false when first-come-first-served boarding is available."
      ),
    PassengerOnlyFlag: z
      .boolean()
      .describe(
        "Indicates whether this route is passenger-only (no vehicles). True when only passengers are allowed, false when vehicles can be transported."
      ),
    InternationalFlag: z
      .boolean()
      .describe(
        "Indicates whether this route crosses international boundaries. True for routes to Canada (e.g., Anacortes to Sidney BC), false for domestic routes."
      ),
    VesselWatchID: z
      .number()
      .describe(
        "Identifier for vessel monitoring on this route. Used for tracking vessel locations, status, and operational information specific to this route."
      ),
    GeneralRouteNotes: z
      .string()
      .describe(
        "General notes about the route. Contains important information for travelers, operational details, and general route characteristics."
      ),
    SeasonalRouteNotes: z
      .string()
      .describe(
        "Seasonal notes about the route. Contains information about route availability during different seasons, including summer schedules and winter modifications."
      ),
    AdaNotes: z
      .string()
      .nullable()
      .describe(
        "Americans with Disabilities Act notes for this route. Contains accessibility information, requirements, and accommodations available for passengers with disabilities."
      ),
    Alerts: z
      .array(serviceDisruptionSchema)
      .describe(
        "Array of service disruption alerts for this route. Contains current disruption status, delays, cancellations, or other operational issues affecting this specific route."
      ),
  })
  .describe(
    "Detailed route information including operational characteristics, accessibility notes, seasonal variations, and current alert status. This schema provides comprehensive route details for passenger information and operational management."
  );

// Terminal schemas
export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal within the journey context. Links to the specific terminal instance and maintains consistency across the journey."
      ),
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal. Primary key for terminal identification and used consistently across all WSF systems and APIs."
      ),
    TerminalDescription: z
      .string()
      .describe(
        "Full description of the terminal. Provides detailed information about the terminal's location, facilities, and operational characteristics."
      ),
    TerminalBriefDescription: z
      .string()
      .describe(
        "Brief description of the terminal. Short identifier used in displays, schedules, and references for passenger convenience."
      ),
    Time: zWsdotDate()
      .nullable()
      .describe(
        "Scheduled time for arrival or departure at this terminal. Null when time is not available. All times are in Pacific Time Zone (PT/PDT)."
      ),
    DepArrIndicator: z
      .number()
      .nullable()
      .describe(
        "Indicator for departure or arrival. Numeric code indicating whether this is a departure time (1) or arrival time (2). Null when the indicator is not available."
      ),
    IsNA: z
      .boolean()
      .describe(
        "Indicates whether this terminal time is not applicable. True when the terminal is not part of the journey, false when the terminal is actively used."
      ),
    Annotations: z
      .array(annotationSchema)
      .describe(
        "Array of annotations for this terminal time. Contains schedule changes, special conditions, or important notices affecting this specific terminal visit."
      ),
  })
  .describe(
    "Terminal time information including scheduled times, terminal details, and associated annotations. This schema represents when a vessel arrives at or departs from a specific terminal during its journey."
  );

export const scheduleTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal. Primary key for terminal identification and used consistently across all WSF systems and APIs."
      ),
    TerminalName: z
      .string()
      .describe(
        "Name of the terminal. Human-readable identifier for the terminal location (e.g., 'Seattle', 'Bainbridge Island', 'Anacortes')."
      ),
    TerminalDescription: z
      .string()
      .describe(
        "Full description of the terminal. Provides detailed information about the terminal's location, facilities, and operational characteristics."
      ),
    TerminalBriefDescription: z
      .string()
      .describe(
        "Brief description of the terminal. Short identifier used in displays, schedules, and references for passenger convenience."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the terminal. Groups terminals by geographic area and helps organize ferry operations by service region."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures terminals are displayed in the correct order across different systems and interfaces."
      ),
  })
  .describe(
    "Schedule terminal information including identification, description, geographic region, and display ordering. This schema provides the fundamental terminal data used for schedule displays and passenger information."
  );

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the departing terminal. Links to the terminal where the journey begins and passengers board the ferry."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Description of the departing terminal. Provides context about the departure location and helps passengers identify where to board."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the arriving terminal. Links to the terminal where the journey ends and passengers disembark."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Description of the arriving terminal. Provides context about the destination location and helps passengers identify where they will arrive."
      ),
  })
  .describe(
    "Terminal combination information representing a journey from one terminal to another. This schema defines the origin and destination for ferry routes and helps passengers understand their travel path."
  );

// Journey and sailing schemas
export const journeySchema = z
  .object({
    JourneyID: z
      .number()
      .describe(
        "Unique identifier for the journey. Primary key for journey identification and represents a complete ferry trip from departure to arrival."
      ),
    ReservationInd: z
      .boolean()
      .describe(
        "Indicates whether reservations are required for this journey. True when advance booking is necessary, false when first-come-first-served boarding is available."
      ),
    InternationalInd: z
      .boolean()
      .describe(
        "Indicates whether this journey crosses international boundaries. True for journeys to Canada (e.g., Anacortes to Sidney BC), false for domestic routes."
      ),
    InterislandInd: z
      .boolean()
      .describe(
        "Indicates whether this journey is between islands. True for interisland ferry routes, false for mainland-to-island or mainland-to-mainland routes."
      ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this journey. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this journey. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel is accessible to passengers with disabilities. True when accessibility features are available, false when accessibility is limited."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number for the vessel in the journey sequence. Used for ordering multiple vessels on the same route and operational tracking."
      ),
    TerminalTimes: z
      .array(terminalTimeSchema)
      .describe(
        "Array of terminal times for this journey. Contains arrival and departure times at each terminal, providing the complete journey timeline."
      ),
  })
  .describe(
    "Journey information including vessel assignment, accessibility details, operational characteristics, and terminal timing information. This schema represents a complete ferry trip with all associated details."
  );

export const sailingSchema = z
  .object({
    SailingID: z
      .number()
      .describe(
        "Unique identifier for the sailing. Primary key for sailing identification and represents a specific ferry departure and arrival."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route. Links to the route configuration and schedule information for this sailing."
      ),
    DepartureTime: zWsdotDate().describe(
      "Scheduled departure time for this sailing. When the ferry leaves the departing terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    ArrivalTime: zWsdotDate().describe(
      "Scheduled arrival time for this sailing. When the ferry arrives at the destination terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this sailing. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this sailing. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the departing terminal. Links to the terminal where the journey begins and passengers board the ferry."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "Name of the departing terminal. Human-readable identifier for the departure location (e.g., 'Seattle', 'Bainbridge Island')."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the arriving terminal. Links to the terminal where the journey ends and passengers disembark."
      ),
    ArrivingTerminalName: z
      .string()
      .describe(
        "Name of the arriving terminal. Human-readable identifier for the destination location (e.g., 'Bainbridge Island', 'Seattle')."
      ),
    IsCancelled: z
      .boolean()
      .describe(
        "Indicates whether this sailing has been cancelled. True when the sailing is not operating, false when the sailing is proceeding as scheduled."
      ),
    Notes: z
      .string()
      .optional()
      .describe(
        "Optional notes about this sailing. Contains additional information, special conditions, or important notices affecting this specific sailing."
      ),
    LastUpdated: zWsdotDate().describe(
      "Timestamp when this sailing information was last updated. Indicates the freshness of the data and helps determine when information was last modified."
    ),
  })
  .describe(
    "Sailing information including timing, vessel assignment, terminal details, and operational status. This schema represents a complete ferry sailing with all associated details for passenger information and operational management."
  );

// Alert and time adjustment schemas
export const alertSchema = z
  .object({
    AlertID: z
      .number()
      .describe(
        "Unique identifier for the alert. Primary key for alert identification and used to reference specific alert details across systems."
      ),
    AlertText: z
      .string()
      .describe(
        "Text content of the alert. Contains the alert message and important information that passengers need to know about service changes."
      ),
    AlertIVRText: z
      .string()
      .describe(
        "Text version of the alert optimized for Interactive Voice Response systems. Used for phone-based inquiries and automated announcements."
      ),
    AlertImg: z
      .string()
      .describe(
        "URL or identifier for an image associated with the alert. May contain visual information about the alert, such as route maps or service notices."
      ),
    TypeDescription: z
      .string()
      .describe(
        "Human-readable description of the alert type. Categorizes the nature of the alert (e.g., 'Delay', 'Cancellation', 'Special Service', 'Maintenance')."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures alerts are displayed in the correct order across different systems and interfaces."
      ),
  })
  .describe(
    "Alert information for schedule changes, service disruptions, or important notices affecting ferry operations. These alerts help passengers understand current service status and any modifications to normal operations."
  );

export const timeAdjustmentSchema = z
  .object({
    TimeAdjustmentID: z
      .number()
      .describe(
        "Unique identifier for the time adjustment. Primary key for adjustment identification and used to track specific schedule modifications."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the route affected by this adjustment. Links to the route information and identifies which ferry corridor is modified."
      ),
    SchedRouteID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for the scheduled route affected by this adjustment. Null when adjustment applies to all routes, specific ID when only one route is modified."
      ),
    DateFrom: zWsfDate().describe(
      "Start date for the time adjustment period. Indicates when the adjustment becomes effective and begins affecting ferry schedules."
    ),
    DateThru: zWsfDate().describe(
      "End date for the time adjustment period. Indicates when the adjustment expires and normal scheduling resumes."
    ),
    DepartureTimeAdjustment: z
      .number()
      .describe(
        "Adjustment to departure time in minutes. Positive values indicate delays, negative values indicate early departures. Zero means no departure time change."
      ),
    ArrivalTimeAdjustment: z
      .number()
      .describe(
        "Adjustment to arrival time in minutes. Positive values indicate delays, negative values indicate early arrivals. Zero means no arrival time change."
      ),
    Reason: z
      .string()
      .describe(
        "Reason for the time adjustment. Explains why the schedule change is necessary (e.g., 'Maintenance', 'Weather', 'Special Event', 'Operational')."
      ),
    LastUpdated: zWsfDate().describe(
      "Timestamp when this adjustment information was last updated. Indicates the freshness of the data and helps determine when information was last modified."
    ),
  })
  .describe(
    "Time adjustment information for schedule modifications due to operational requirements, weather conditions, maintenance, or other factors. These adjustments modify normal ferry schedules to accommodate exceptional circumstances."
  );

// Schedule schemas
export const scheduleTimeSchema = z
  .object({
    DepartingTime: zWsdotDate().describe(
      "Scheduled departure time for this schedule entry. When the ferry leaves the departing terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    ArrivingTime: zWsdotDate().describe(
      "Scheduled arrival time for this schedule entry. When the ferry arrives at the destination terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    LoadingRule: z
      .number()
      .describe(
        "Loading rule identifier for this schedule entry. Determines the order and method of vehicle loading, passenger boarding, and operational procedures."
      ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this schedule entry. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this schedule entry. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel is accessible to passengers with disabilities. True when accessibility features are available, false when accessibility is limited."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number for the vessel in the schedule sequence. Used for ordering multiple vessels on the same route and operational tracking."
      ),
    Routes: z
      .array(z.number())
      .describe(
        "Array of route IDs associated with this schedule entry. May include multiple routes for complex operations or when a vessel serves multiple corridors."
      ),
    AnnotationIndexes: z
      .array(z.number())
      .describe(
        "Array of annotation indexes for this schedule entry. Links to relevant annotations, notices, or special conditions affecting this schedule time."
      ),
  })
  .describe(
    "Schedule time information including timing, vessel assignment, operational details, and associated annotations for a specific schedule entry. This schema represents when a ferry departs and arrives with all operational context."
  );

export const scheduleResponseTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the departing terminal. Links to the terminal where the journey begins and passengers board the ferry."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "Name of the departing terminal. Human-readable identifier for the departure location (e.g., 'Seattle', 'Bainbridge Island', 'Anacortes')."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the arriving terminal. Links to the terminal where the journey ends and passengers disembark."
      ),
    ArrivingTerminalName: z
      .string()
      .describe(
        "Name of the arriving terminal. Human-readable identifier for the destination location (e.g., 'Bainbridge Island', 'Seattle', 'Sidney BC')."
      ),
    SailingNotes: z
      .string()
      .describe(
        "Notes about the sailing for this terminal combination. Contains additional information, special conditions, or important notices affecting this route."
      ),
    Annotations: z
      .array(z.string())
      .describe(
        "Array of annotation text for this terminal combination. Contains important notices, schedule changes, or special conditions affecting this route."
      ),
    AnnotationsIVR: z
      .array(z.string())
      .describe(
        "Array of annotation text optimized for Interactive Voice Response systems. Used for phone-based inquiries and automated announcements about this route."
      ),
    Times: z
      .array(scheduleTimeSchema)
      .describe(
        "Array of schedule times for this terminal combination. Contains all scheduled departures and arrivals, providing the complete timetable for this route."
      ),
  })
  .describe(
    "Schedule response terminal combination information including terminal details, sailing notes, annotations, and comprehensive timing information. This schema provides complete schedule data for a specific route between two terminals."
  );

export const scheduleResponseSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique identifier for the schedule. Primary key for schedule identification and represents a complete schedule period."
      ),
    ScheduleName: z
      .string()
      .describe(
        "Name of the schedule. Human-readable identifier for the schedule period (e.g., 'Summer 2024', 'Winter 2024-25')."
      ),
    ScheduleSeason: z
      .number()
      .describe(
        "Season identifier for the schedule. Numeric code indicating which season this schedule applies to (e.g., 1=Summer, 2=Winter, 3=Spring, 4=Fall)."
      ),
    SchedulePDFUrl: z
      .string()
      .describe(
        "URL to the PDF version of the schedule. Provides access to printable schedule information and official documentation for passengers and staff."
      ),
    ScheduleStart: zWsdotDate().describe(
      "Start date for the schedule period. Indicates when this schedule becomes effective and begins governing ferry operations."
    ),
    ScheduleEnd: zWsdotDate().describe(
      "End date for the schedule period. Indicates when this schedule expires and is replaced by the next schedule period."
    ),
    AllRoutes: z
      .array(z.number())
      .describe(
        "Array of all route IDs included in this schedule. Contains all routes covered by this schedule period and provides complete route coverage information."
      ),
    TerminalCombos: z
      .array(scheduleResponseTerminalComboSchema)
      .describe(
        "Array of terminal combinations for this schedule. Contains all available route combinations and their timing, providing the complete schedule matrix."
      ),
  })
  .describe(
    "Complete schedule response information including schedule details, route coverage, and terminal combination data. This schema represents the entire schedule for a specific period with all associated operational details."
  );

export const scheduleDepartureSchema = z
  .object({
    SailingID: z
      .number()
      .describe(
        "Unique identifier for the sailing. Primary key for sailing identification and represents a specific ferry departure and arrival."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route. Links to the route configuration and schedule information for this sailing."
      ),
    DepartureTime: zWsdotDate().describe(
      "Scheduled departure time for this sailing. When the ferry leaves the departing terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    ArrivalTime: zWsdotDate().describe(
      "Scheduled arrival time for this sailing. When the ferry arrives at the destination terminal. All times are in Pacific Time Zone (PT/PDT)."
    ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this sailing. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this sailing. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the departing terminal. Links to the terminal where the journey begins and passengers board the ferry."
      ),
    DepartingTerminalName: z
      .string()
      .describe(
        "Name of the departing terminal. Human-readable identifier for the departure location (e.g., 'Seattle', 'Bainbridge Island')."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for the arriving terminal. Links to the terminal where the journey ends and passengers disembark."
      ),
    ArrivingTerminalName: z
      .string()
      .describe(
        "Name of the arriving terminal. Human-readable identifier for the destination location (e.g., 'Bainbridge Island', 'Seattle')."
      ),
    IsCancelled: z
      .boolean()
      .describe(
        "Indicates whether this sailing has been cancelled. True when the sailing is not operating, false when the sailing is proceeding as scheduled."
      ),
    Notes: z
      .string()
      .optional()
      .describe(
        "Optional notes about this sailing. Contains additional information, special conditions, or important notices affecting this specific sailing."
      ),
    LastUpdated: zWsdotDate().describe(
      "Timestamp when this sailing information was last updated. Indicates the freshness of the data and helps determine when information was last modified."
    ),
  })
  .describe(
    "Schedule departure information including timing, vessel assignment, terminal details, and operational status. This schema represents a complete ferry sailing with all associated details for passenger information and operational management."
  );

export const scheduleSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Links to the route information and identifies which ferry corridor this schedule applies to."
      ),
    RouteName: z
      .string()
      .describe(
        "Name of the ferry route. Human-readable identifier for the route (e.g., 'Seattle - Bainbridge Island', 'Anacortes - Sidney BC')."
      ),
    SailingDate: zWsdotDate().describe(
      "Date for this schedule. Indicates which day this schedule applies to and determines the specific schedule variant for that date."
    ),
    Departures: z
      .array(scheduleDepartureSchema)
      .describe(
        "Array of departures for this route and date. Contains all scheduled sailings, providing the complete timetable for the specified route and date."
      ),
    LastUpdated: zWsdotDate().describe(
      "Timestamp when this schedule information was last updated. Indicates the freshness of the data and helps determine when information was last modified."
    ),
  })
  .describe(
    "Schedule information for a specific route and date, including all scheduled departures and operational details. This schema provides the complete schedule for a route on a specific day."
  );

// Utility schemas
export const validDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date for the valid date range. Indicates the earliest date for which schedule data is currently published and available from the WSF system."
    ),
    DateThru: zWsdotDate().describe(
      "End date for the valid date range. Indicates the latest date for which schedule data is currently published and available from the WSF system."
    ),
  })
  .describe(
    "Valid date range information indicating the period for which schedule data is currently published and available. This helps applications determine the date range they can request schedule information for."
  );

export const scheduleCacheFlushDateSchema = zWsdotDate().describe(
  "Cache flush date for the schedule API. When this date changes, cached schedule data should be refreshed to ensure passengers have the most current information."
);

export const activeSeasonSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique identifier for the schedule season. Primary key for season identification and represents a complete schedule period."
      ),
    ScheduleName: z
      .string()
      .describe(
        "Name of the schedule season. Human-readable identifier for the season period (e.g., 'Summer 2024', 'Winter 2024-25')."
      ),
    ScheduleSeason: z
      .number()
      .describe(
        "Season number for the schedule. Numeric identifier for the season period, used for ordering and categorization."
      ),
    SchedulePDFUrl: z
      .string()
      .describe(
        "URL to the PDF version of the schedule. Provides access to printable schedule information and official documentation for passengers and staff."
      ),
    ScheduleStart: zWsdotDate().describe(
      "Start date for the schedule season. Indicates when this season becomes effective and begins governing ferry operations."
    ),
    ScheduleEnd: zWsdotDate().describe(
      "End date for the schedule season. Indicates when this season expires and is replaced by the next schedule season."
    ),
  })
  .describe(
    "Active season information including schedule details and availability period for the current schedule season. This schema helps applications identify which schedule period is currently active and when it expires."
  );

export const alternativeFormatSchema = z
  .object({
    AltID: z
      .number()
      .describe(
        "Unique identifier for the alternative format. Primary key for format identification and used to reference specific format versions."
      ),
    SubjectID: z
      .number()
      .describe(
        "Unique identifier for the subject. Links to the main content or topic that this alternative format represents."
      ),
    SubjectName: z
      .string()
      .describe(
        "Name of the subject. Human-readable identifier for the content or topic (e.g., 'Schedule', 'Fares', 'Terminals')."
      ),
    AltTitle: z
      .string()
      .describe(
        "Title of the alternative format. Human-readable identifier for the format version (e.g., 'PDF Schedule', 'Excel Fares', 'CSV Terminals')."
      ),
    AltUrl: z
      .string()
      .describe(
        "URL to access the alternative format. Provides direct access to the content in the specified format for download or viewing."
      ),
    AltDesc: z
      .string()
      .describe(
        "Description of the alternative format. Explains the format characteristics, content, and intended use for passengers and developers."
      ),
    FileType: z
      .string()
      .describe(
        "File type of the alternative format. Indicates the format extension or MIME type (e.g., 'PDF', 'XLSX', 'CSV', 'JSON')."
      ),
    Status: z
      .string()
      .describe(
        "Status of the alternative format. Indicates availability and access status (e.g., 'Active', 'Inactive', 'Maintenance')."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures formats are displayed in the correct order across different systems and interfaces."
      ),
    FromDate: zWsdotDate()
      .nullable()
      .describe(
        "Start date for the alternative format availability. Null when always available, specific date when format becomes accessible."
      ),
    ThruDate: zWsdotDate()
      .nullable()
      .describe(
        "End date for the alternative format availability. Null when always available, specific date when format expires or becomes inaccessible."
      ),
    ModifiedDate: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp when this alternative format was last modified. Indicates the freshness of the content and helps determine when information was last updated."
      ),
    ModifiedBy: z
      .string()
      .describe(
        "Identifier for who modified this alternative format. Tracks content ownership, responsibility, and modification history."
      ),
  })
  .describe(
    "Alternative format information for accessing schedule data in different formats, such as PDFs, spreadsheets, or other file types. This schema provides access to schedule information in formats suitable for different use cases and applications."
  );

// Array schemas
export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);
export const routesArraySchema = z.array(routeSchema);
export const sailingsArraySchema = z.array(sailingSchema);
export const alertsArraySchema = z.array(alertSchema);
export const timeAdjustmentsArraySchema = z.array(timeAdjustmentSchema);
export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);
export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);
export const activeSeasonsArraySchema = z.array(activeSeasonSchema);
export const alternativeFormatsArraySchema = z.array(alternativeFormatSchema);

// Loose fallback schemas
export const routesArrayLooseSchema = z.array(
  z.record(z.string(), z.unknown())
);
export const routeDetailsLooseSchema = z.record(z.string(), z.unknown());

// Type exports
export type ActiveSeason = z.infer<typeof activeSeasonSchema>;
export type AlternativeFormat = z.infer<typeof alternativeFormatSchema>;
export type Route = z.infer<typeof routeSchema>;
export type RouteDetails = z.infer<typeof routeDetailsSchema>;
export type Sailing = z.infer<typeof sailingSchema>;
export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;
export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;
export type Alert = z.infer<typeof alertSchema>;
export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;
export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;
export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;
export type ScheduleDeparture = z.infer<typeof scheduleDepartureSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;
export type Annotation = z.infer<typeof annotationSchema>;
export type ContingencyAdjustment = z.infer<typeof contingencyAdjustmentSchema>;
export type TerminalTime = z.infer<typeof terminalTimeSchema>;
export type Journey = z.infer<typeof journeySchema>;
