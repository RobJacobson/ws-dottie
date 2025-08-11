import { z } from "zod";

// Base helpers
const zDate = () => z.date();
const zNullableDate = () => z.date().nullable();
const zNullableString = () => z.string().nullable();
const zNullableNumber = () => z.number().nullable();

export const serviceDisruptionSchema = z.record(z.string(), z.unknown());

export const annotationSchema = z
  .object({
    AnnotationID: z.number(),
    AnnotationText: z.string(),
    AnnotationIVRText: z.string(),
    AdjustedCrossingTime: zNullableNumber(),
    AnnotationImg: z.string(),
    TypeDescription: z.string(),
    SortSeq: z.number(),
  })
  .catchall(z.unknown());

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zDate(),
    DateThru: zDate(),
    EventID: zNullableNumber(),
    EventDescription: zNullableString(),
    AdjType: z.number(),
    ReplacedBySchedRouteID: zNullableNumber(),
  })
  .catchall(z.unknown());

export const scheduledRouteSchema = z
  .object({
    ScheduleID: z.number(),
    SchedRouteID: z.number(),
    ContingencyOnly: z.boolean(),
    RouteID: z.number(),
    RouteAbbrev: z.string(),
    Description: z.string(),
    SeasonalRouteNotes: z.string(),
    RegionID: z.number(),
    ServiceDisruptions: z.array(serviceDisruptionSchema),
    ContingencyAdj: z.array(contingencyAdjustmentSchema),
  })
  .catchall(z.unknown());

export const routeSchema = z
  .object({
    RouteID: z.number(),
    RouteAbbrev: z.string(),
    Description: z.string(),
    RegionID: z.number(),
    Alerts: z.array(serviceDisruptionSchema).optional(),
  })
  .catchall(z.unknown());

export const routeDetailsSchema = z
  .object({
    RouteID: z.number(),
    RouteAbbrev: z.string(),
    Description: z.string(),
    RegionID: z.number(),
    CrossingTime: zNullableNumber(),
    ReservationFlag: z.boolean(),
    PassengerOnlyFlag: z.boolean(),
    InternationalFlag: z.boolean(),
    VesselWatchID: z.number(),
    GeneralRouteNotes: z.string(),
    SeasonalRouteNotes: z.string(),
    AdaNotes: zNullableString(),
    Alerts: z.array(serviceDisruptionSchema),
  })
  .catchall(z.unknown());

export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z.number(),
    TerminalID: z.number(),
    TerminalDescription: z.string(),
    TerminalBriefDescription: z.string(),
    Time: zNullableDate(),
    DepArrIndicator: zNullableNumber(),
    IsNA: z.boolean(),
    Annotations: z.array(annotationSchema),
  })
  .catchall(z.unknown());

export const journeySchema = z
  .object({
    JourneyID: z.number(),
    ReservationInd: z.boolean(),
    InternationalInd: z.boolean(),
    InterislandInd: z.boolean(),
    VesselID: z.number(),
    VesselName: z.string(),
    VesselHandicapAccessible: z.boolean(),
    VesselPositionNum: z.number(),
    TerminalTimes: z.array(terminalTimeSchema),
  })
  .catchall(z.unknown());

export const sailingSchema = z
  .object({
    ScheduleID: z.number(),
    SchedRouteID: z.number(),
    RouteID: z.number(),
    SailingID: z.number(),
    SailingDescription: z.string(),
    SailingNotes: z.string(),
    DisplayColNum: z.number(),
    SailingDir: z.number(),
    DayOpDescription: z.string(),
    DayOpUseForHoliday: z.boolean(),
    ActiveDateRanges: z.array(
      z
        .object({
          DateFrom: zDate(),
          DateThru: zDate(),
          EventID: zNullableNumber(),
          EventDescription: zNullableString(),
        })
        .catchall(z.unknown())
    ),
    Journs: z.array(journeySchema),
  })
  .catchall(z.unknown());

export const alertSchema = z
  .object({
    BulletinID: z.number(),
    BulletinFlag: z.boolean(),
    BulletinText: z.string(),
    CommunicationFlag: z.boolean(),
    CommunicationText: zNullableString(),
    RouteAlertFlag: z.boolean(),
    RouteAlertText: z.string(),
    HomepageAlertText: z.string(),
    PublishDate: zDate(),
    DisruptionDescription: zNullableString(),
    AllRoutesFlag: z.boolean(),
    SortSeq: z.number(),
    AlertTypeID: z.number(),
    AlertType: z.string(),
    AlertFullTitle: z.string(),
    AffectedRouteIDs: z.array(z.number()),
    IVRText: zNullableString(),
  })
  .catchall(z.unknown());

export const timeAdjustmentSchema = z
  .object({
    ScheduleID: z.number(),
    SchedRouteID: z.number(),
    RouteID: z.number(),
    RouteDescription: z.string(),
    RouteSortSeq: z.number(),
    SailingID: z.number(),
    SailingDescription: z.string(),
    ActiveSailingDateRange: z
      .object({
        DateFrom: zDate(),
        DateThru: zDate(),
        EventID: zNullableNumber(),
        EventDescription: zNullableString(),
      })
      .catchall(z.unknown()),
    SailingDir: z.number(),
    JourneyID: z.number(),
    VesselID: z.number(),
    VesselName: z.string(),
    VesselHandicapAccessible: z.boolean(),
    VesselPositionNum: z.number(),
    TerminalID: z.number(),
    TerminalDescription: z.string(),
    TerminalBriefDescription: z.string(),
    JourneyTerminalID: z.number(),
    DepArrIndicator: z.number(),
    AdjDateFrom: zDate(),
    AdjDateThru: zDate(),
    AdjType: z.number(),
    TidalAdj: z.boolean(),
    TimeToAdj: zNullableDate(),
    Annotations: z.array(annotationSchema),
    EventID: zNullableNumber(),
    EventDescription: zNullableString(),
  })
  .catchall(z.unknown());

export const scheduleTerminalSchema = z
  .object({
    TerminalID: z.number(),
    Description: z.string(),
  })
  .catchall(z.unknown());

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number(),
    DepartingDescription: z.string(),
    ArrivingTerminalID: z.number(),
    ArrivingDescription: z.string(),
  })
  .catchall(z.unknown());

export const scheduleTimeSchema = z
  .object({
    DepartingTime: zDate(),
    ArrivingTime: zDate(),
    LoadingRule: z.number(),
    VesselID: z.number(),
    VesselName: z.string(),
    VesselHandicapAccessible: z.boolean(),
    VesselPositionNum: z.number(),
    Routes: z.array(z.number()),
    AnnotationIndexes: z.array(z.number()),
  })
  .catchall(z.unknown());

export const scheduleResponseTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number(),
    DepartingTerminalName: z.string(),
    ArrivingTerminalID: z.number(),
    ArrivingTerminalName: z.string(),
    SailingNotes: z.string(),
    Annotations: z.array(z.string()),
    AnnotationsIVR: z.array(z.string()),
    Times: z.array(scheduleTimeSchema),
  })
  .catchall(z.unknown());

export const scheduleResponseSchema = z
  .object({
    ScheduleID: z.number(),
    ScheduleName: z.string(),
    ScheduleSeason: z.number(),
    SchedulePDFUrl: z.string(),
    ScheduleStart: zDate(),
    ScheduleEnd: zDate(),
    AllRoutes: z.array(z.number()),
    TerminalCombos: z.array(scheduleResponseTerminalComboSchema),
  })
  .catchall(z.unknown());

export const scheduleDepartureSchema = z
  .object({
    SailingID: z.number(),
    SchedRouteID: z.number(),
    DepartureTime: zDate(),
    ArrivalTime: zDate(),
    VesselID: z.number(),
    VesselName: z.string(),
    DepartingTerminalID: z.number(),
    DepartingTerminalName: z.string(),
    ArrivingTerminalID: z.number(),
    ArrivingTerminalName: z.string(),
    IsCancelled: z.boolean(),
    Notes: z.string().optional(),
    LastUpdated: zDate(),
  })
  .catchall(z.unknown());

export const scheduleSchema = z
  .object({
    RouteID: z.number(),
    RouteName: z.string(),
    SailingDate: zDate(),
    Departures: z.array(scheduleDepartureSchema),
    LastUpdated: zDate(),
  })
  .catchall(z.unknown());

export const validDateRangeSchema = z
  .object({
    DateFrom: zDate(),
    DateThru: zDate(),
  })
  .catchall(z.unknown());

export const scheduleCacheFlushDateSchema = zDate();

export const activeSeasonSchema = z
  .object({
    ScheduleID: z.number(),
    ScheduleName: z.string(),
    ScheduleSeason: z.number(),
    SchedulePDFUrl: z.string(),
    ScheduleStart: zDate(),
    ScheduleEnd: zDate(),
  })
  .catchall(z.unknown());

export const alternativeFormatSchema = z
  .object({
    AltID: z.number(),
    SubjectID: z.number(),
    SubjectName: z.string(),
    AltTitle: z.string(),
    AltUrl: z.string(),
    AltDesc: z.string(),
    FileType: z.string(),
    Status: z.string(),
    SortSeq: z.number(),
    FromDate: zNullableDate(),
    ThruDate: zNullableDate(),
    ModifiedDate: zNullableDate(),
    ModifiedBy: z.string(),
  })
  .catchall(z.unknown());

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

// Loose fallbacks for endpoints with occasionally inconsistent shapes
export const routesArrayLooseSchema = z.array(
  z.record(z.string(), z.unknown())
);
export const routeDetailsLooseSchema = z.record(z.string(), z.unknown());

// Types
export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
export type ScheduleCacheFlushDate = z.infer<
  typeof scheduleCacheFlushDateSchema
>;
export type ActiveSeason = z.infer<typeof activeSeasonSchema>;
export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;
export type ContingencyAdjustment = z.infer<typeof contingencyAdjustmentSchema>;
export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;
export type Route = z.infer<typeof routeSchema>;
export type RouteDetails = z.infer<typeof routeDetailsSchema>;
export type Annotation = z.infer<typeof annotationSchema>;
export type TerminalTime = z.infer<typeof terminalTimeSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type Sailing = z.infer<typeof sailingSchema>;
export type Alert = z.infer<typeof alertSchema>;
export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;
export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;
export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;
export type ScheduleTime = z.infer<typeof scheduleTimeSchema>;
export type ScheduleResponseTerminalCombo = z.infer<
  typeof scheduleResponseTerminalComboSchema
>;
export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;
export type ScheduleDeparture = z.infer<typeof scheduleDepartureSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type AlternativeFormat = z.infer<typeof alternativeFormatSchema>;
