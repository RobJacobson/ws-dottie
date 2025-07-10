// WSF Schedule API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html

/**
 * Valid date range information from WSF API
 * Based on /validdaterange endpoint
 */
export type ValidDateRange = {
  StartDate: Date;
  EndDate: Date;
};

/**
 * Cache flush date response
 * Based on /cacheflushdate endpoint
 */
export type ScheduleCacheFlushDate = {
  LastUpdated: Date;
  Source: string;
};

/**
 * Active schedule season information
 * Based on /activeseasons endpoint
 */
export type ActiveSeason = {
  ScheduleID: number;
  ScheduleName: string;
  ScheduleSeason: number;
  SchedulePDFUrl: string;
  ScheduleStart: string; // .NET Date format
  ScheduleEnd: string; // .NET Date format
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
  ServiceDisruptions: any[];
  ContingencyAdj: any[];
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
  ServiceDisruptions: any[];
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
  Time: string; // .NET Date format
  DepArrIndicator: number | null;
  IsNA: boolean;
  Annotations: any[];
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
    DateFrom: string; // .NET Date format
    DateThru: string; // .NET Date format
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
  PublishDate: string; // .NET Date format
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
 * Based on /timeadj endpoint
 */
export type TimeAdjustment = {
  AdjustmentID: number;
  RouteID: number;
  SailingID: number;
  AdjustmentMinutes: number;
  AdjustmentReason: string;
  EffectiveDate: Date;
  IsActive: boolean;
};

/**
 * Terminal information for schedule API
 * Based on /terminals endpoint
 */
export type ScheduleTerminal = {
  TerminalID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  TerminalDescription: string;
  RegionID: number;
  IsActive: boolean;
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
