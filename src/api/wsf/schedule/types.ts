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
 * Route information from WSF Schedule API
 * Based on /routes endpoint
 */
export type Route = {
  RouteID: number;
  RouteName: string;
  RouteAbbrev: string;
  RouteDescription: string;
  RouteColor: string;
  SortSeq: number;
  CrossingTime: number;
  Distance: number;
  IsActive: boolean;
  ServiceRoutes: ServiceRoute[];
};

/**
 * Service route information
 */
export type ServiceRoute = {
  ServiceRouteID: number;
  ServiceRouteName: string;
  ServiceRouteAbbrev: string;
  IsActive: boolean;
};

/**
 * Schedule departure information
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
 * Schedule information
 */
export type Schedule = {
  RouteID: number;
  RouteName: string;
  SailingDate: Date;
  Departures: ScheduleDeparture[];
  LastUpdated: Date;
};

/**
 * Alert information
 */
export type Alert = {
  AlertID: number;
  RouteID: number;
  RouteName: string;
  AlertTitle: string;
  AlertMessage: string;
  StartDate: Date;
  EndDate: Date;
  Severity: "low" | "medium" | "high";
  IsActive: boolean;
};

/**
 * Active season information
 */
export type ActiveSeason = {
  SeasonID: number;
  SeasonName: string;
  StartDate: Date;
  EndDate: Date;
  IsActive: boolean;
  RouteIDs: number[];
};

/**
 * Time adjustment information
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

/**
 * Schedule cache flush date response
 */
export type ScheduleCacheFlushDate = {
  LastUpdated: Date;
  Source: string;
};
