/**
 * @fileoverview WSF Schedule API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API, which provides ferry schedule and route information.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for CacheFlushDate - represents cache flush date information
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate()
  .optional()
  .describe(
    "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
  );

export type SchedulesCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;

/**
 * Schema for ValidDateRange - represents valid date range for schedule data
 *
 * This operation retrieves a date range for which schedule data is currently published & available.
 */
export const validDateRangeSchema = z
  .object({
    /**
     * Schedule information is available from this trip date onward.
     */
    DateFrom: zDotnetDate().describe(
      "Schedule information is available from this trip date onward."
    ),
    /**
     * Schedule information is not available after this trip date.
     */
    DateThru: zDotnetDate().describe(
      "Schedule information is not available after this trip date."
    ),
  })
  .describe(
    "This operation retrieves a date range for which schedule data is currently published & available."
  );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

/**
 * Base schedule schema containing common schedule fields
 *
 * This operation retrieves a summary of active seasons.
 */
export const scheduleBaseSchema = z.object({
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
   * A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
   */
  ScheduleEnd: zDotnetDate().describe(
    "A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
  ),
});

export type ScheduleBase = z.infer<typeof scheduleBaseSchema>;

/**
 * Base route schema containing common route fields
 */
export const routeBaseSchema = z.object({
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
  /** The route's abbreviation. */
  RouteAbbrev: z.string().nullable().describe("The route's abbreviation."),
  /** The full name of the route. */
  Description: z.string().nullable().describe("The full name of the route."),
  /**
   * Unique identifier that identifies the region associated with the route.
   */
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the route."
    ),
});

export type RouteBase = z.infer<typeof routeBaseSchema>;

/**
 * Schema for Terminal - represents terminal information
 */
export const terminalSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().nullable().describe("The name of the terminal."),
});

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Schema for TerminalMate - represents terminal mate information
 */
export const terminalMateSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingDescription: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingDescription: z
    .string()
    .describe("The name of the arriving terminal."),
});

export type TerminalMate = z.infer<typeof terminalMateSchema>;

/**
 * Terminal Mates List Schema - represents an list of terminal mates
 */
export const terminalMatesListSchema = z
  .array(terminalMateSchema)
  .describe(
    "This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalMateList = z.infer<typeof terminalMatesListSchema>;

/**
 * Schema for ServiceDisruption - represents service disruption information
 */
export const serviceDisruptionSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert is also being used as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .describe("The service disruption text associated with the alert."),
});

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Service Disruptions List Schema - represents an list of service disruptions
 */
export const serviceDisruptionsListSchema = z
  .array(serviceDisruptionSchema)
  .describe(
    "This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type ServiceDisruptionList = z.infer<
  typeof serviceDisruptionsListSchema
>;

/**
 * Schema for Route - represents basic route information
 */
export const routeSchema = routeBaseSchema.extend({
  /**
   * Service disruption alerts that are currently affecting the route.
   */
  ServiceDisruptions: serviceDisruptionsListSchema
    .nullable()
    .describe(
      "Service disruption alerts that are currently affecting the route."
    ),
});

export type Route = z.infer<typeof routeSchema>;

/**
 * Schema for Alert - represents alert information
 */
export const alertSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert is also being used as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /**
   * A flag that, when true, indicates the alert is also being used as a communications announcement.
   */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a communications announcement."
    ),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The alert text, tailored as a brief route announcement. */
  AlertDescription: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a brief route announcement."),
  /**
   * If present, indicates service disruption text associated with the alert.
   */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /** The full text of the alert. */
  AlertFullText: z.string().nullable().describe("The full text of the alert."),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type Alert = z.infer<typeof alertSchema>;

/**
 * Alerts List Schema - represents an list of alerts
 */
export const alertsListSchema = z.array(alertSchema);

export type AlertList = z.infer<typeof alertsListSchema>;

/**
 * Schema for RouteDetail - represents detailed route information
 */
export const routeDetailSchema = routeBaseSchema.extend({
  /**
   * Unique identifier used to group routes for VesselWatch.
   */
  VesselWatchID: z
    .number()
    .describe("Unique identifier used to group routes for VesselWatch."),
  /**
   * Indicates whether or not the route is reservable.
   */
  ReservationFlag: z
    .boolean()
    .describe("Indicates whether or not the route is reservable."),
  /**
   * Indicates whether or not the route operates outside the US.
   */
  InternationalFlag: z
    .boolean()
    .describe("Indicates whether or not the route operates outside the US."),
  /**
   * If this flag is true, then the route does not service vehicles.
   */
  PassengerOnlyFlag: z
    .boolean()
    .describe(
      "If this flag is true, then the route does not service vehicles."
    ),
  /**
   * An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes.
   */
  CrossingTime: z
    .string()
    .nullable()
    .describe(
      "An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes."
    ),
  /** ADA information associated with the route. */
  AdaNotes: z
    .string()
    .nullable()
    .describe("ADA information associated with the route."),
  /** Miscellaneous information associated with the route. */
  GeneralRouteNotes: z
    .string()
    .nullable()
    .describe("Miscellaneous information associated with the route."),
  /**
   * Route notes specific to the season that the trip date is associated with.
   */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe(
      "Route notes specific to the season that the trip date is associated with."
    ),
  /** Alerts associated with the route. */
  Alerts: alertsListSchema.describe("Alerts associated with the route."),
});

export type RouteDetail = z.infer<typeof routeDetailSchema>;

/**
 * Schema for RouteDetailsList - represents a list of route details
 */
export const routeDetailsListSchema = z
  .array(routeDetailSchema)
  .describe(
    "This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type RouteDetailsList = z.infer<typeof routeDetailsListSchema>;

/**
 * Schema for ActiveSeason - represents active season information
 */
export const activeSeasonSchema = scheduleBaseSchema;

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;

/**
 * Schema for ContingencyAdj - represents contingency adjustment information
 */
export const contingencyAdjSchema = z.object({
  /**
   * The precise date and time that the contingency adjustment starts.
   */
  DateFrom: zDotnetDate().describe(
    "The precise date and time that the contingency adjustment starts."
  ),
  /**
   * The precise date and time that the contingency adjustment ends.
   */
  DateThru: zDotnetDate().describe(
    "The precise date and time that the contingency adjustment ends."
  ),
  /** Unique identifier for an event. */
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  /** Describes what prompted this contingency adjustment. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Describes what prompted this contingency adjustment."),
  /**
   * Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation.
   */
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  /**
   * If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it.
   */
  ReplacedBySchedRouteID: z
    .number()
    .nullable()
    .describe(
      "If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it."
    ),
});

export type ContingencyAdj = z.infer<typeof contingencyAdjSchema>;

/**
 * Contingency Adjs List Schema - represents an list of contingency adjustments
 */
export const contingencyAdjsListSchema = z
  .array(contingencyAdjSchema)
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type ContingencyAdjList = z.infer<typeof contingencyAdjsListSchema>;

/**
 * Schema for SchedRoute - represents scheduled route information
 */
export const schedRouteSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /**
   * If true, see additions in the ContingencyAdj list for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj list).
   */
  ContingencyOnly: z
    .boolean()
    .describe(
      "If true, see additions in the ContingencyAdj list for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj list)."
    ),
  /** Unique identifier for the underlying route. */
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  /** The underlying route's abbreviation. */
  RouteAbbrev: z.string().describe("The underlying route's abbreviation."),
  /** The full name of the scheduled route. */
  Description: z.string().describe("The full name of the scheduled route."),
  /** Notes for this scheduled route. */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe("Notes for this scheduled route."),
  /**
   * Unique identifier that identifies the region associated with the underlying route.
   */
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the underlying route."
    ),
  /**
   * Service disruption alerts that are currently affecting the scheduled route.
   */
  ServiceDisruptions: serviceDisruptionsListSchema.describe(
    "Service disruption alerts that are currently affecting the scheduled route."
  ),
  /**
   * Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service.
   */
  ContingencyAdj: contingencyAdjsListSchema.describe(
    "Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service."
  ),
});

export type SchedRoute = z.infer<typeof schedRouteSchema>;

/**
 * Sched Routes List Schema - represents an list of scheduled routes
 */
export const schedRoutesListSchema = z
  .array(schedRouteSchema)
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type SchedRouteList = z.infer<typeof schedRoutesListSchema>;

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
   * A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am."
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
  ActiveSailingDateRange: activeDateRangeSchema
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
  Annotations: annotationsListSchema.describe(
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
export const scheduleSchema = scheduleBaseSchema.extend({
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

/**
 * Schema for AlertDetail - represents detailed alert information
 */
export const alertDetailSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a bulletin."
    ),
  /** The alert text, tailored as a bulletin. */
  BulletinText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a bulletin."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a communications announcement.
   */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a communications announcement."
    ),
  /** The alert text, tailored as a communications announcement. */
  CommunicationText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a communications announcement."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a route announcement.
   */
  RouteAlertFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a route announcement."
    ),
  /** The alert text, tailored as a route announcement. */
  RouteAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a route announcement."),
  /** The alert text, tailored for a landing page. */
  HomepageAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for a landing page."),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /**
   * If present, indicates service disruption text associated with the alert.
   */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /**
   * A flag that, when true, indicates that the alert affects all routes.
   */
  AllRoutesFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the alert affects all routes."
    ),
  /**
   * A preferred sort order (sort-ascending with respect to other alerts).
   */
  SortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other alerts)."
    ),
  /**
   * Unique identifier for the type or category that the alert belongs to.
   */
  AlertTypeID: z
    .number()
    .describe(
      "Unique identifier for the type or category that the alert belongs to."
    ),
  /**
   * A type / category that the alert belongs to (eg. "General Information").
   */
  AlertType: z
    .string()
    .describe(
      'A type / category that the alert belongs to (eg. "General Information").'
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /**
   * An list of integers that represent the unique identifiers of routes affected by the alert.
   */
  AffectedRouteIDs: z
    .array(z.number())
    .describe(
      "An list of integers that represent the unique identifiers of routes affected by the alert."
    ),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type AlertDetail = z.infer<typeof alertDetailSchema>;

/**
 * Alert Details List Schema - represents an list of detailed alerts
 */
export const alertDetailsListSchema = z
  .array(alertDetailSchema)
  .describe(
    "This operation provides alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type AlertDetailList = z.infer<typeof alertDetailsListSchema>;
