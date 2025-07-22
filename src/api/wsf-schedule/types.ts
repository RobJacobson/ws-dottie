// WSF Schedule API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html

/**
 * Valid date range information from WSF API
 * Based on /validdaterange endpoint
 */
export type ValidDateRange = {
  DateFrom: Date;
  DateThru: Date;
};

/**
 * Cache flush date response
 * Based on /cacheflushdate endpoint
 * Returns a Date object (automatically converted from .NET Date format)
 */
export type ScheduleCacheFlushDate = Date;

/**
 * Active schedule season information
 * Based on /activeseasons endpoint
 */
export type ActiveSeason = {
  ScheduleID: number;
  ScheduleName: string;
  ScheduleSeason: number;
  SchedulePDFUrl: string;
  ScheduleStart: Date; // Automatically converted from .NET Date format
  ScheduleEnd: Date; // Automatically converted from .NET Date format
};

/**
 * Service disruption information
 * Based on /schedroutes endpoint - ServiceDisruptions array
 * Currently appears to be empty arrays in API responses
 */
export type ServiceDisruption = Record<string, unknown>;

/**
 * Contingency adjustment information
 * Based on /schedroutes endpoint - ContingencyAdj array
 */
export type ContingencyAdjustment = {
  DateFrom: Date; // Automatically converted from .NET Date format
  DateThru: Date; // Automatically converted from .NET Date format
  EventID: number | null;
  EventDescription: string | null;
  AdjType: number;
  ReplacedBySchedRouteID: number | null;
};

/**
 * Scheduled route information
 * Based on /schedroutes endpoint
 */
export type ScheduledRoute = {
  ScheduleID: number;
  SchedRouteID: number;
  ContingencyOnly: boolean;
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  SeasonalRouteNotes: string;
  RegionID: number;
  ServiceDisruptions: ServiceDisruption[];
  ContingencyAdj: ContingencyAdjustment[];
};

/**
 * Route information
 * Based on /routes endpoint
 */
export type Route = {
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  RegionID: number;
  Alerts?: ServiceDisruption[]; // Using ServiceDisruption type for consistency
};

/**
 * Route details information
 * Based on /routedetails endpoint - actual API response structure
 * This is a single route object with detailed information
 */
export type RouteDetails = {
  RouteID: number;
  RouteAbbrev: string;
  Description: string;
  RegionID: number;
  CrossingTime: number;
  ReservationFlag: boolean;
  PassengerOnlyFlag: boolean;
  InternationalFlag: boolean;
  VesselWatchID: number;
  GeneralRouteNotes: string;
  SeasonalRouteNotes: string;
  AdaNotes: string;
  Alerts: ServiceDisruption[]; // Using ServiceDisruption type for consistency
};

/**
 * Annotation information
 * Based on actual API response structure from /timeadj endpoint
 */
export type Annotation = {
  AnnotationID: number;
  AnnotationText: string;
  AnnotationIVRText: string;
  AdjustedCrossingTime: number | null;
  AnnotationImg: string;
  TypeDescription: string;
  SortSeq: number;
};

/**
 * Terminal time information
 * Based on sailing data structure
 */
export type TerminalTime = {
  JourneyTerminalID: number;
  TerminalID: number;
  TerminalDescription: string;
  TerminalBriefDescription: string;
  Time: Date; // Automatically converted from .NET Date format
  DepArrIndicator: number | null;
  IsNA: boolean;
  Annotations: Annotation[];
};

/**
 * Journey information
 * Based on sailing data structure
 */
export type Journey = {
  JourneyID: number;
  ReservationInd: boolean;
  InternationalInd: boolean;
  InterislandInd: boolean;
  VesselID: number;
  VesselName: string;
  VesselHandicapAccessible: boolean;
  VesselPositionNum: number;
  TerminalTimes: TerminalTime[];
};

/**
 * Sailing information
 * Based on /sailings endpoint
 */
export type Sailing = {
  ScheduleID: number;
  SchedRouteID: number;
  RouteID: number;
  SailingID: number;
  SailingDescription: string;
  SailingNotes: string;
  DisplayColNum: number;
  SailingDir: number;
  DayOpDescription: string;
  DayOpUseForHoliday: boolean;
  ActiveDateRanges: Array<{
    DateFrom: Date; // Automatically converted from .NET Date format
    DateThru: Date; // Automatically converted from .NET Date format
    EventID: number | null;
    EventDescription: string | null;
  }>;
  Journs: Journey[];
};

/**
 * Service alert information
 * Based on /alerts endpoint
 */
export type Alert = {
  BulletinID: number;
  BulletinFlag: boolean;
  BulletinText: string;
  CommunicationFlag: boolean;
  CommunicationText: string | null;
  RouteAlertFlag: boolean;
  RouteAlertText: string;
  HomepageAlertText: string;
  PublishDate: Date; // Automatically converted from .NET Date format
  DisruptionDescription: string | null;
  AllRoutesFlag: boolean;
  SortSeq: number;
  AlertTypeID: number;
  AlertType: string;
  AlertFullTitle: string;
  AffectedRouteIDs: number[];
  IVRText: string | null;
};

/**
 * Time adjustment information
 * Based on /timeadj endpoint - actual API response structure
 * This is actually a sailing/journey structure with adjustment data embedded
 * Note: Date fields are automatically converted from .NET Date format to JavaScript Date objects
 */
export type TimeAdjustment = {
  ScheduleID: number;
  SchedRouteID: number;
  RouteID: number;
  RouteDescription: string;
  RouteSortSeq: number;
  SailingID: number;
  SailingDescription: string;
  ActiveSailingDateRange: {
    DateFrom: Date; // Automatically converted from .NET Date format
    DateThru: Date; // Automatically converted from .NET Date format
    EventID: number | null;
    EventDescription: string | null;
  };
  SailingDir: number;
  JourneyID: number;
  VesselID: number;
  VesselName: string;
  VesselHandicapAccessible: boolean;
  VesselPositionNum: number;
  TerminalID: number;
  TerminalDescription: string;
  TerminalBriefDescription: string;
  JourneyTerminalID: number;
  DepArrIndicator: number;
  AdjDateFrom: Date; // Automatically converted from .NET Date format
  AdjDateThru: Date; // Automatically converted from .NET Date format
  AdjType: number;
  TidalAdj: boolean;
  TimeToAdj: Date | null; // Automatically converted from .NET Date format (time adjustment) or null if invalid
  Annotations: Annotation[];
  EventID: number | null;
  EventDescription: string | null;
};

/**
 * Terminal information for schedule API
 * Based on /terminals endpoint - actual API response structure
 */
export type ScheduleTerminal = {
  TerminalID: number;
  Description: string;
};

/**
 * Terminal combination information for schedule API
 * Based on /terminalsandmates endpoint - actual API response structure
 */
export type ScheduleTerminalCombo = {
  DepartingTerminalID: number;
  DepartingDescription: string;
  ArrivingTerminalID: number;
  ArrivingDescription: string;
};

/**
 * Schedule information
 * Based on /schedule endpoint
 */
export type Schedule = {
  RouteID: number;
  RouteName: string;
  SailingDate: Date;
  Departures: ScheduleDeparture[];
  LastUpdated: Date;
};

/**
 * Actual schedule response from WSF API
 * Based on /schedule endpoint - this is the real structure
 */
export type ScheduleResponse = {
  ScheduleID: number;
  ScheduleName: string;
  ScheduleSeason: number;
  SchedulePDFUrl: string;
  ScheduleStart: Date;
  ScheduleEnd: Date;
  AllRoutes: number[];
  TerminalCombos: ScheduleResponseTerminalCombo[];
};

/**
 * Terminal combination in schedule response
 */
export type ScheduleResponseTerminalCombo = {
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  SailingNotes: string;
  Annotations: string[];
  AnnotationsIVR: string[];
  Times: ScheduleTime[];
};

/**
 * Schedule time information
 */
export type ScheduleTime = {
  DepartingTime: Date;
  ArrivingTime: Date;
  LoadingRule: number;
  VesselID: number;
  VesselName: string;
  VesselHandicapAccessible: boolean;
  VesselPositionNum: number;
  Routes: number[];
  AnnotationIndexes: number[];
};

/**
 * Schedule departure information
 * Based on schedule data structure
 */
export type ScheduleDeparture = {
  SailingID: number;
  SchedRouteID: number;
  DepartureTime: Date;
  ArrivalTime: Date;
  VesselID: number;
  VesselName: string;
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  IsCancelled: boolean;
  Notes?: string;
  LastUpdated: Date;
};

/**
 * Schedule query parameters
 */
export type ScheduleParams = {
  RouteID?: number;
  SailingDate?: Date;
  VesselID?: number;
  TerminalID?: number;
};

/**
 * Route query parameters
 */
export type RouteParams = {
  IsActive?: boolean;
  TerminalID?: number;
};

/**
 * Time adjustment query parameters
 */
export type TimeAdjustmentParams = {
  RouteID?: number;
  SailingDate?: Date;
  IsActive?: boolean;
};

/**
 * Alternative format information from WSF API
 * Based on /alternativeformats/{SubjectName} endpoint
 */
export type AlternativeFormat = {
  AltID: number;
  SubjectID: number;
  SubjectName: string;
  AltTitle: string;
  AltUrl: string;
  AltDesc: string;
  FileType: string;
  Status: string;
  SortSeq: number;
  FromDate: Date | null; // Automatically converted from MM/DD/YYYY format or null if empty string
  ThruDate: Date | null; // Automatically converted from MM/DD/YYYY format or null if empty string
  ModifiedDate: Date | null; // Automatically converted from MM/DD/YYYY HH:MM:SS AM/PM format or null if empty string
  ModifiedBy: string;
};

/**
 * Alert query parameters
 */
export type AlertParams = {
  RouteID?: number;
  Severity?: "low" | "medium" | "high";
  IsActive?: boolean;
};

/**
 * Active season query parameters
 */
export type ActiveSeasonParams = {
  IsActive?: boolean;
  RouteID?: number;
};
