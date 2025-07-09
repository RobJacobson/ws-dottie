// WSF Schedule API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html

/**
 * Valid date range information from WSF API
 * Based on /validdaterange endpoint
 */
export type ValidDateRange = {
  startDate: Date;
  endDate: Date;
};

/**
 * Route information from WSF Schedule API
 * Based on /routes endpoint
 */
export type Route = {
  routeId: number;
  routeName: string;
  routeAbbrev: string;
  routeDescription: string;
  routeColor: string;
  sortSeq: number;
  crossingTime: number;
  distance: number;
  isActive: boolean;
  serviceRoutes: ServiceRoute[];
};

/**
 * Service route information
 */
export type ServiceRoute = {
  serviceRouteId: number;
  serviceRouteName: string;
  serviceRouteAbbrev: string;
  isActive: boolean;
};

/**
 * Schedule departure information
 */
export type ScheduleDeparture = {
  sailingId: number;
  schedRouteId: number;
  departureTime: Date;
  arrivalTime: Date;
  vesselId: number;
  vesselName: string;
  departingTerminalId: number;
  departingTerminalName: string;
  arrivingTerminalId: number;
  arrivingTerminalName: string;
  isCancelled: boolean;
  notes?: string;
  lastUpdated: Date;
};

/**
 * Schedule information
 */
export type Schedule = {
  routeId: number;
  routeName: string;
  sailingDate: Date;
  departures: ScheduleDeparture[];
  lastUpdated: Date;
};

/**
 * Alert information
 */
export type Alert = {
  alertId: number;
  routeId: number;
  routeName: string;
  alertTitle: string;
  alertMessage: string;
  startDate: Date;
  endDate: Date;
  severity: "low" | "medium" | "high";
  isActive: boolean;
};

/**
 * Active season information
 */
export type ActiveSeason = {
  seasonId: number;
  seasonName: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  routeIds: number[];
};

/**
 * Time adjustment information
 */
export type TimeAdjustment = {
  adjustmentId: number;
  routeId: number;
  sailingId: number;
  adjustmentMinutes: number;
  adjustmentReason: string;
  effectiveDate: Date;
  isActive: boolean;
};

/**
 * Schedule query parameters
 */
export type ScheduleParams = {
  routeId?: number;
  sailingDate?: Date;
  vesselId?: number;
  terminalId?: number;
};

/**
 * Route query parameters
 */
export type RouteParams = {
  isActive?: boolean;
  terminalId?: number;
};

/**
 * Time adjustment query parameters
 */
export type TimeAdjustmentParams = {
  routeId?: number;
  sailingDate?: Date;
  isActive?: boolean;
};

/**
 * Alert query parameters
 */
export type AlertParams = {
  routeId?: number;
  severity?: "low" | "medium" | "high";
  isActive?: boolean;
};

/**
 * Active season query parameters
 */
export type ActiveSeasonParams = {
  isActive?: boolean;
  routeId?: number;
};

/**
 * Schedule cache flush date response
 */
export type ScheduleCacheFlushDate = {
  lastUpdated: Date;
  source: string;
};
