/**
 * @fileoverview WSF Schedule API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API, which provides ferry schedule and route information.
 */

import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";
import { numbersListSchema, stringsListSchema } from "@/apis/shared/schemas";

/**
 * Schema for CacheFlushDate - represents cache flush date information
 */
export const cacheFlushDateSchema = z.object({
  CacheFlushDate: zWsdotDate()
    .nullable()
    .describe(
      "If present, notes the date that certain service data was last changed."
    ),
});

export type CacheFlushDate = z.infer<typeof cacheFlushDateSchema>;

/**
 * Schema for ValidDateRange - represents valid date range for schedule data
 */
export const validDateRangeSchema = z.object({
  DateFrom: zWsdotDate().describe(
    "Schedule information is available from this trip date onward."
  ),
  DateThru: zWsdotDate().describe(
    "Schedule information is not available after this trip date."
  ),
});

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;

/**
 * Base schedule schema containing common schedule fields
 */
export const scheduleBaseSchema = z.object({
  ScheduleID: z.number().describe("Unique identifier for a season."),
  ScheduleName: z.string().describe("The name of the season."),
  ScheduleSeason: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
    .describe(
      "Indicates a quarterly identifier. 0 for Spring, 1 for Summer, 2 for Fall and 3 for Winter."
    ),
  SchedulePDFUrl: z.string().describe("A URL to the season in PDF format."),
  ScheduleStart: zWsdotDate().describe(
    "A trip date that represents the start of the season. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a ScheduleStart of 2014-06-15 is returned, this would indicate the season starts precisely on 2014-06-15 at 3:00am."
  ),
  ScheduleEnd: zWsdotDate().describe(
    "A trip date that represents the end of the season. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a ScheduleEnd of 2014-09-20 is returned, this would indicate the season ends precisely on 2014-09-21 at 2:59am."
  ),
});

export type ScheduleBase = z.infer<typeof scheduleBaseSchema>;

/**
 * Schedules List Schema - represents an list of schedules
 */
export const schedulesListSchema = z.array(scheduleBaseSchema);

export type ScheduleList = z.infer<typeof schedulesListSchema>;

/**
 * Base route schema containing common route fields
 */
export const routeBaseSchema = z.object({
  RouteID: z.number().describe("Unique identifier for a route."),
  RouteAbbrev: z.string().nullable().describe("The route's abbreviation."),
  Description: z.string().nullable().describe("The full name of the route."),
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the route."
    ),
});

export type RouteBase = z.infer<typeof routeBaseSchema>;

/**
 * Routes List Schema - represents an list of routes
 */
export const routesListSchema = z.array(routeBaseSchema);

export type RouteList = z.infer<typeof routesListSchema>;

/**
 * Schema for Terminal - represents terminal information
 */
export const terminalSchema = z.object({
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  Description: z.string().nullable().describe("The name of the terminal."),
});

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Terminals List Schema - represents an list of terminals
 */
export const terminalsListSchema = z.array(terminalSchema);

export type TerminalList = z.infer<typeof terminalsListSchema>;

/**
 * Schema for TerminalMate - represents terminal mate information
 */
export const terminalMateSchema = z.object({
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  DepartingDescription: z
    .string()
    .describe("The name of the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  ArrivingDescription: z
    .string()
    .describe("The name of the arriving terminal."),
});

export type TerminalMate = z.infer<typeof terminalMateSchema>;

/**
 * Terminal Mates List Schema - represents an list of terminal mates
 */
export const terminalMatesListSchema = z.array(terminalMateSchema);

export type TerminalMateList = z.infer<typeof terminalMatesListSchema>;

/**
 * Schema for ServiceDisruption - represents service disruption information
 */
export const serviceDisruptionSchema = z.object({
  BulletinID: z.number().describe("Unique identifier for the alert."),
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  DisruptionDescription: z
    .string()
    .describe("The service disruption text associated with the alert."),
});

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Service Disruptions List Schema - represents an list of service disruptions
 */
export const serviceDisruptionsListSchema = z.array(serviceDisruptionSchema);

export type ServiceDisruptionList = z.infer<
  typeof serviceDisruptionsListSchema
>;

/**
 * Schema for Route - represents basic route information
 */
export const routeSchema = routeBaseSchema.extend({
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
  BulletinID: z.number().describe("Unique identifier for the alert."),
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a communications announcement."
    ),
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  AlertDescription: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a brief route announcement."),
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  AlertFullTitle: z.string().describe("The title of the alert."),
  AlertFullText: z.string().describe("The full text of the alert."),
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
  VesselWatchID: z
    .number()
    .describe("Unique identifier used to group routes for VesselWatch."),
  ReservationFlag: z
    .boolean()
    .describe("Indicates whether or not the route is reservable."),
  InternationalFlag: z
    .boolean()
    .describe("Indicates whether or not the route operates outside the US."),
  PassengerOnlyFlag: z
    .boolean()
    .describe(
      "If this flag is true, then the route does not service vehicles."
    ),
  CrossingTime: z
    .string()
    .nullable()
    .describe(
      "An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes."
    ),
  AdaNotes: z
    .string()
    .nullable()
    .describe("ADA information associated with the route."),
  GeneralRouteNotes: z
    .string()
    .nullable()
    .describe("Miscellaneous information associated with the route."),
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe(
      "Route notes specific to the season that the trip date is associated with."
    ),
  Alerts: alertsListSchema.describe("Alerts associated with the route."),
});

export type RouteDetail = z.infer<typeof routeDetailSchema>;

/**
 * Schema for ActiveSeason - represents active season information
 */
export const activeSeasonSchema = scheduleBaseSchema;

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;

/**
 * Schema for ContingencyAdj - represents contingency adjustment information
 */
export const contingencyAdjSchema = z.object({
  DateFrom: zWsdotDate().describe(
    "The precise date and time that the contingency adjustment starts."
  ),
  DateThru: zWsdotDate().describe(
    "The precise date and time that the contingency adjustment ends."
  ),
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  EventDescription: z
    .string()
    .nullable()
    .describe("Describes what prompted this contingency adjustment."),
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
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
export const contingencyAdjsListSchema = z.array(contingencyAdjSchema);

export type ContingencyAdjList = z.infer<typeof contingencyAdjsListSchema>;

/**
 * Schema for SchedRoute - represents scheduled route information
 */
export const schedRouteSchema = z.object({
  ScheduleID: z.number().describe("Unique identifier for a season."),
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  ContingencyOnly: z
    .boolean()
    .describe(
      "If true, see additions in the ContingencyAdj list for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj list)."
    ),
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  RouteAbbrev: z.string().describe("The underlying route's abbreviation."),
  Description: z.string().describe("The full name of the scheduled route."),
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe("Notes for this scheduled route."),
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the underlying route."
    ),
  ServiceDisruptions: serviceDisruptionsListSchema.describe(
    "Service disruption alerts that are currently affecting the scheduled route."
  ),
  ContingencyAdj: contingencyAdjsListSchema.describe(
    "Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service."
  ),
});

export type SchedRoute = z.infer<typeof schedRouteSchema>;

/**
 * Sched Routes List Schema - represents an list of scheduled routes
 */
export const schedRoutesListSchema = z.array(schedRouteSchema);

export type SchedRouteList = z.infer<typeof schedRoutesListSchema>;

/**
 * Schema for ActiveDateRange - represents active date range information
 */
export const activeDateRangeSchema = z.object({
  DateFrom: zWsdotDate().describe(
    "A trip date that represents the start of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to 3:00am. For example, if a DateFrom of 2014-06-15 is returned, this would indicate the active date range starts precisely on 2014-06-15 at 3:00am."
  ),
  DateThru: zWsdotDate().describe(
    "A trip date that represents the end of the active sailing date range. If the consumer needs specifics about time, they can translate this trip date value to the next calendar date at 2:59am. For example, if a DateThru of 2014-09-20 is returned, this would indicate the active date range ends precisely on 2014-09-21 at 2:59am."
  ),
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this sailing date range."),
});

export type ActiveDateRange = z.infer<typeof activeDateRangeSchema>;

/**
 * Active Date Ranges List Schema - represents an list of active date ranges
 */
export const activeDateRangesListSchema = z.array(activeDateRangeSchema);

export type ActiveDateRangeList = z.infer<typeof activeDateRangesListSchema>;

/**
 * Schema for Annotation - represents annotation information
 */
export const annotationSchema = z.object({
  AnnotationID: z.number().describe("Unique identifier for an annotation."),
  AnnotationText: z
    .string()
    .nullable()
    .describe("The descriptive content of the annotation."),
  AnnotationIVRText: z
    .string()
    .nullable()
    .describe("The descriptive content of the annotation formatted for IVR."),
  AdjustedCrossingTime: z
    .number()
    .nullable()
    .describe(
      "Adjusted crossing time in minutes. Present when the annotation requires an override of the CrossingTime value found in route details."
    ),
  AnnotationImg: z
    .string()
    .nullable()
    .describe(
      "A URL to an image that can be used to graphically represent this annotation."
    ),
  TypeDescription: z
    .string()
    .nullable()
    .describe(
      "A logical grouping for the annotation (Day Type, Informational, etc)."
    ),
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
export const annotationsListSchema = z.array(annotationSchema);

export type AnnotationList = z.infer<typeof annotationsListSchema>;

/**
 * Schema for TerminalTime - represents terminal time information
 */
export const terminalTimeSchema = z.object({
  JourneyTerminalID: z
    .number()
    .describe("Unique identifier for a terminal time."),
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  TerminalDescription: z
    .string()
    .nullable()
    .describe("The full name of the terminal."),
  TerminalBriefDescription: z
    .string()
    .nullable()
    .describe("A brief / shortened name for the terminal."),
  Time: zWsdotDate()
    .nullable()
    .describe(
      "The time of the departure / arrival. If the journey does not stop at this terminal no value will be present."
    ),
  DepArrIndicator: z
    .union([z.literal(1), z.literal(2)])
    .nullable()
    .describe(
      "Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. If the journey does not stop at this terminal no value will be present."
    ),
  IsNA: z
    .boolean()
    .describe(
      "If true indicates that the journey does not interact with this terminal."
    ),
  Annotations: annotationsListSchema
    .nullable()
    .describe("Informational attributes associated with the terminal time."),
});

export type TerminalTime = z.infer<typeof terminalTimeSchema>;

/**
 * Terminal Times List Schema - represents an list of terminal times
 */
export const terminalTimesListSchema = z.array(terminalTimeSchema);

export type TerminalTimeList = z.infer<typeof terminalTimesListSchema>;

/**
 * Schema for Journey - represents journey information
 */
export const journeySchema = z.object({
  JourneyID: z.number().describe("Unique identifier for a journey."),
  ReservationInd: z
    .boolean()
    .describe(
      "Indicates whether or not the journey contains reservable departures."
    ),
  InternationalInd: z
    .boolean()
    .describe("Indicates whether or not the journey travels outside the US."),
  InterislandInd: z
    .boolean()
    .describe(
      "If true, this indicates that the journey operates primarily between islands and a single mainland."
    ),
  VesselID: z
    .number()
    .describe(
      "Unique identifier for the vessel that's planned to service this journey."
    ),
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel that's planned to service this journey."),
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible."
    ),
  VesselPositionNum: z
    .number()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
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
export const journeysListSchema = z.array(journeySchema);

export type JourneyList = z.infer<typeof journeysListSchema>;

/**
 * Schema for Sailing - represents sailing information
 */
export const sailingSchema = z.object({
  ScheduleID: z.number().describe("Unique identifier for a season."),
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  SailingID: z.number().describe("Unique identifier for a sailing."),
  SailingDescription: z
    .string()
    .nullable()
    .describe("A title that describes the sailing (eg. Leave Port Townsend)."),
  SailingNotes: z
    .string()
    .nullable()
    .describe("Informational text that might be associated with the sailing."),
  DisplayColNum: z
    .number()
    .describe(
      "A suggested number of columns to use when rendering departures to a desktop webpage."
    ),
  SailingDir: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  DayOpDescription: z
    .string()
    .nullable()
    .describe('A days of operation grouping for the sailing (eg. "Daily").'),
  DayOpUseForHoliday: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the sailing should apply for holidays."
    ),
  ActiveDateRanges: activeDateRangesListSchema
    .nullable()
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
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
export const sailingsListSchema = z.array(sailingSchema);

export type SailingList = z.infer<typeof sailingsListSchema>;

/**
 * Schema for TimeAdjustment - represents time adjustment information
 */
export const timeAdjustmentSchema = z.object({
  ScheduleID: z.number().describe("Unique identifier for a season."),
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  RouteDescription: z
    .string()
    .nullable()
    .describe("The full name of the route."),
  RouteSortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other routes)."
    ),
  SailingID: z.number().describe("Unique identifier for a sailing."),
  SailingDescription: z
    .string()
    .nullable()
    .describe("A title that describes the sailing (eg. Leave Port Townsend)."),
  ActiveSailingDateRange: activeDateRangesListSchema
    .nullable()
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
  SailingDir: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  JourneyID: z.number().describe("Unique identifier for a journey."),
  VesselID: z
    .number()
    .describe(
      "Unique identifier for the vessel that's planned to service this journey."
    ),
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel that's planned to service this journey."),
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible."
    ),
  VesselPositionNum: z
    .number()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
  JourneyTerminalID: z
    .number()
    .describe("Unique identifier for a terminal time."),
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  TerminalDescription: z.string().describe("The full name of the terminal."),
  TerminalBriefDescription: z
    .string()
    .describe("A brief / shortened name for the terminal."),
  TimeToAdj: zWsdotDate().describe(
    "The departure / arrival time that is either being added or cancelled."
  ),
  AdjDateFrom: zWsdotDate().describe(
    "The starting trip date when the adjustment should be applied."
  ),
  AdjDateThru: zWsdotDate().describe(
    "The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date."
  ),
  TidalAdj: z
    .boolean()
    .describe(
      "Indicates whether or not the adjustment is a result of tidal conditions."
    ),
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this adjustment."),
  DepArrIndicator: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival."
    ),
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  Annotations: annotationsListSchema.describe(
    "Informational attributes associated with the departure / arrival time."
  ),
});

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

/**
 * Time Adjustments List Schema - represents an list of time adjustments
 */
export const timeAdjustmentsListSchema = z.array(timeAdjustmentSchema);

export type TimeAdjustmentList = z.infer<typeof timeAdjustmentsListSchema>;

/**
 * Schema for TerminalCombo - represents terminal combination information
 */
export const terminalComboSchema = z.object({
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  DepartingTerminalName: z
    .string()
    .describe("The name of the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  ArrivingTerminalName: z
    .string()
    .describe("The name of the arriving terminal."),
  SailingNotes: z
    .string()
    .describe(
      "Informational text that might be associated with the underlying sailing."
    ),
  Annotations: stringsListSchema.describe(
    "An list of annotation strings assigned to one or more items in the Times list."
  ),
  Times: z
    .array(
      z.object({
        DepartingTime: zWsdotDate().describe(
          "The date and time of the departure."
        ),
        ArrivingTime: zWsdotDate()
          .nullable()
          .describe("The date and time of the arrival."),
        LoadingRule: z
          .union([z.literal(1), z.literal(2), z.literal(3)])
          .describe(
            "Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both."
          ),
        VesselID: z
          .number()
          .describe(
            "Unique identifier for the vessel that's planned to service this departure."
          ),
        VesselName: z
          .string()
          .describe(
            "The name of the vessel that's planned to service this departure."
          ),
        VesselHandicapAccessible: z
          .boolean()
          .describe(
            "A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible."
          ),
        VesselPositionNum: z
          .number()
          .describe(
            "A number that represents a single vessel that services all of the stops in the journey."
          ),
        Routes: numbersListSchema.describe(
          "An list of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes."
        ),
        AnnotationIndexes: numbersListSchema.describe(
          "An list of index integers indicating the elements in the Annotations list that apply to this departure."
        ),
      })
    )
    .describe("Scheduled departure details, including departure times."),
  AnnotationsIVR: stringsListSchema.describe(
    "An list of annotation strings assigned to one or more items in the Times list formatted for IVR."
  ),
});

export type TerminalCombo = z.infer<typeof terminalComboSchema>;

/**
 * Terminal Combos List Schema - represents an list of terminal combinations
 */
export const terminalCombosListSchema = z.array(terminalComboSchema);

export type TerminalComboList = z.infer<typeof terminalCombosListSchema>;

/**
 * Schema for Schedule - represents schedule information
 */
export const scheduleSchema = scheduleBaseSchema.extend({
  AllRoutes: numbersListSchema.describe(
    "An list of RouteID integers representing all the routes accounted for in this resultset."
  ),
  TerminalCombos: terminalCombosListSchema.describe(
    "A grouping of departure and arrival terminal pairs."
  ),
});

export type Schedule = z.infer<typeof scheduleSchema>;

/**
 * Schema for AlertDetail - represents detailed alert information
 */
export const alertDetailSchema = z.object({
  BulletinID: z.number().describe("Unique identifier for the alert."),
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a bulletin."
    ),
  BulletinText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a bulletin."),
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a communications announcement."
    ),
  CommunicationText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a communications announcement."),
  RouteAlertFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a route announcement."
    ),
  RouteAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a route announcement."),
  HomepageAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for a landing page."),
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  AllRoutesFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the alert affects all routes."
    ),
  SortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other alerts)."
    ),
  AlertTypeID: z
    .number()
    .describe(
      "Unique identifier for the type or category that the alert belongs to."
    ),
  AlertType: z
    .string()
    .describe(
      'A type / category that the alert belongs to (eg. "General Information").'
    ),
  AlertFullTitle: z.string().describe("The title of the alert."),
  AffectedRouteIDs: numbersListSchema.describe(
    "An list of integers that represent the unique identifiers of routes affected by the alert."
  ),
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type AlertDetail = z.infer<typeof alertDetailSchema>;

/**
 * Alert Details List Schema - represents an list of detailed alerts
 */
export const alertDetailsListSchema = z.array(alertDetailSchema);

export type AlertDetailList = z.infer<typeof alertDetailsListSchema>;
