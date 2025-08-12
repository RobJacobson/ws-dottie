import { z } from "zod";

// Base schemas for common patterns
const dateSchema = z.date();
const nullableDateSchema = z.date().nullable();
const nullableStringSchema = z.string().nullable();
const nullableNumberSchema = z.number().nullable();
const nullableBooleanSchema = z.boolean().nullable();

// ServiceDisruption schema (currently appears to be empty arrays)
export const serviceDisruptionSchema = z.record(z.string(), z.unknown());

// Annotation schema
export const annotationSchema = z.object({
  AnnotationID: z.number(),
  AnnotationText: z.string(),
  AnnotationIVRText: z.string(),
  AdjustedCrossingTime: nullableNumberSchema,
  AnnotationImg: z.string(),
  TypeDescription: z.string(),
  SortSeq: z.number(),
});

// ContingencyAdjustment schema
export const contingencyAdjustmentSchema = z.object({
  DateFrom: dateSchema,
  DateThru: dateSchema,
  EventID: nullableNumberSchema,
  EventDescription: nullableStringSchema,
  AdjType: z.number(),
  ReplacedBySchedRouteID: nullableNumberSchema,
});

// ScheduledRoute schema
export const scheduledRouteSchema = z.object({
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
});

// Route schema
export const routeSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  Alerts: z.array(serviceDisruptionSchema).optional(),
});

// RouteDetails schema
export const routeDetailsSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  CrossingTime: nullableNumberSchema,
  ReservationFlag: z.boolean(),
  PassengerOnlyFlag: z.boolean(),
  InternationalFlag: z.boolean(),
  VesselWatchID: z.number(),
  GeneralRouteNotes: z.string(),
  SeasonalRouteNotes: z.string(),
  AdaNotes: nullableStringSchema,
  Alerts: z.array(serviceDisruptionSchema),
});

// TerminalTime schema
export const terminalTimeSchema = z.object({
  JourneyTerminalID: z.number(),
  TerminalID: z.number(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  Time: nullableDateSchema,
  DepArrIndicator: nullableNumberSchema,
  IsNA: z.boolean(),
  Annotations: z.array(annotationSchema),
});

// Journey schema
export const journeySchema = z.object({
  JourneyID: z.number(),
  ReservationInd: z.boolean(),
  InternationalInd: z.boolean(),
  InterislandInd: z.boolean(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  TerminalTimes: z.array(terminalTimeSchema),
});

// Sailing schema
export const sailingSchema = z.object({
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
    z.object({
      DateFrom: dateSchema,
      DateThru: dateSchema,
      EventID: nullableNumberSchema,
      EventDescription: nullableStringSchema,
    })
  ),
  Journs: z.array(journeySchema),
});

// Alert schema
export const alertSchema = z.object({
  BulletinID: z.number(),
  BulletinFlag: z.boolean(),
  BulletinText: z.string(),
  CommunicationFlag: z.boolean(),
  CommunicationText: nullableStringSchema,
  RouteAlertFlag: z.boolean(),
  RouteAlertText: z.string(),
  HomepageAlertText: z.string(),
  PublishDate: dateSchema,
  DisruptionDescription: nullableStringSchema,
  AllRoutesFlag: z.boolean(),
  SortSeq: z.number(),
  AlertTypeID: z.number(),
  AlertType: z.string(),
  AlertFullTitle: z.string(),
  AffectedRouteIDs: z.array(z.number()),
  IVRText: nullableStringSchema,
});

// TimeAdjustment schema
export const timeAdjustmentSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  RouteDescription: z.string(),
  RouteSortSeq: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  ActiveSailingDateRange: z.object({
    DateFrom: dateSchema,
    DateThru: dateSchema,
    EventID: nullableNumberSchema,
    EventDescription: nullableStringSchema,
  }),
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
  AdjDateFrom: dateSchema,
  AdjDateThru: dateSchema,
  AdjType: z.number(),
  TidalAdj: z.boolean(),
  TimeToAdj: nullableDateSchema,
  Annotations: z.array(annotationSchema),
  EventID: nullableNumberSchema,
  EventDescription: nullableStringSchema,
});

// ScheduleTerminal schema
export const scheduleTerminalSchema = z.object({
  TerminalID: z.number(),
  Description: z.string(),
});

// ScheduleTerminalCombo schema
export const scheduleTerminalComboSchema = z.object({
  DepartingTerminalID: z.number(),
  DepartingDescription: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingDescription: z.string(),
});

// ScheduleTime schema
export const scheduleTimeSchema = z.object({
  DepartingTime: dateSchema,
  ArrivingTime: dateSchema,
  LoadingRule: z.number(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  Routes: z.array(z.number()),
  AnnotationIndexes: z.array(z.number()),
});

// ScheduleResponseTerminalCombo schema
export const scheduleResponseTerminalComboSchema = z.object({
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingTerminalName: z.string(),
  SailingNotes: z.string(),
  Annotations: z.array(z.string()),
  AnnotationsIVR: z.array(z.string()),
  Times: z.array(scheduleTimeSchema),
});

// ScheduleResponse schema
export const scheduleResponseSchema = z.object({
  ScheduleID: z.number(),
  ScheduleName: z.string(),
  ScheduleSeason: z.number(),
  SchedulePDFUrl: z.string(),
  ScheduleStart: dateSchema,
  ScheduleEnd: dateSchema,
  AllRoutes: z.array(z.number()),
  TerminalCombos: z.array(scheduleResponseTerminalComboSchema),
});

// ScheduleDeparture schema
export const scheduleDepartureSchema = z.object({
  SailingID: z.number(),
  SchedRouteID: z.number(),
  DepartureTime: dateSchema,
  ArrivalTime: dateSchema,
  VesselID: z.number(),
  VesselName: z.string(),
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingTerminalName: z.string(),
  IsCancelled: z.boolean(),
  Notes: z.string().optional(),
  LastUpdated: dateSchema,
});

// Schedule schema
export const scheduleSchema = z.object({
  RouteID: z.number(),
  RouteName: z.string(),
  SailingDate: dateSchema,
  Departures: z.array(scheduleDepartureSchema),
  LastUpdated: dateSchema,
});

// ValidDateRange schema
export const validDateRangeSchema = z.object({
  DateFrom: dateSchema,
  DateThru: dateSchema,
});

// ScheduleCacheFlushDate schema
export const scheduleCacheFlushDateSchema = dateSchema;

// ActiveSeason schema
export const activeSeasonSchema = z.object({
  ScheduleID: z.number(),
  ScheduleName: z.string(),
  ScheduleSeason: z.number(),
  SchedulePDFUrl: z.string(),
  ScheduleStart: dateSchema,
  ScheduleEnd: dateSchema,
});

// AlternativeFormat schema
export const alternativeFormatSchema = z.object({
  AltID: z.number(),
  SubjectID: z.number(),
  SubjectName: z.string(),
  AltTitle: z.string(),
  AltUrl: z.string(),
  AltDesc: z.string(),
  FileType: z.string(),
  Status: z.string(),
  SortSeq: z.number(),
  FromDate: nullableDateSchema,
  ThruDate: nullableDateSchema,
  ModifiedDate: nullableDateSchema,
  ModifiedBy: z.string(),
});

// Array schemas for API responses
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
