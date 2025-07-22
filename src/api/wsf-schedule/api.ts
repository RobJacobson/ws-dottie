// WSF Schedule API functions

import { jsDateToYyyyMmDd } from "@/shared/fetching/dateUtils";
import { createFetchFunction } from "@/shared/fetching/fetchApi";

import type {
  ActiveSeason,
  Alert,
  AlternativeFormat,
  Route,
  RouteDetails,
  Sailing,
  ScheduledRoute,
  ScheduleResponse,
  ScheduleTerminal,
  ScheduleTerminalCombo,
  TimeAdjustment,
  ValidDateRange,
} from "./types";

// Module-scoped fetch function for WSF schedule API
const fetchSchedule = createFetchFunction(
  "https://www.wsdot.wa.gov/ferries/api/schedule/rest"
);

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the cache flush date for the schedule API. This endpoint helps
 * determine when cached data should be refreshed. When the date returned
 * from this operation is modified, drop your application cache and retrieve
 * fresh data from the service.
 *
 * @returns Promise resolving to Date object containing cache flush information
 */
export const getCacheFlushDateSchedule = (): Promise<Date | null> =>
  fetchSchedule<Date>("/cacheflushdate");

// ============================================================================
// VALID DATE RANGE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 * Please consider using cacheflushdate to coordinate the caching of this data in your application.
 *
 * @returns Promise resolving to ValidDateRange object containing valid date range information
 */
export const getValidDateRange = (): Promise<ValidDateRange | null> =>
  fetchSchedule<ValidDateRange>("/validdaterange");

// ============================================================================
// TERMINALS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of ScheduleTerminal objects containing terminal information
 */
export const getTerminals = (tripDate: Date): Promise<ScheduleTerminal[]> =>
  fetchSchedule<ScheduleTerminal[]>(`/terminals/${jsDateToYyyyMmDd(tripDate)}`);

/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using validDateRange. Please format the trip date
 * input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combinations
 */
export const getTerminalsAndMates = (
  tripDate: Date
): Promise<ScheduleTerminalCombo[]> =>
  fetchSchedule<ScheduleTerminalCombo[]>(
    `/terminalsandmates/${jsDateToYyyyMmDd(tripDate)}`
  );

/**
 * API function for fetching terminals and mates by route from WSF Schedule API
 *
 * Provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using routes. Similarly, a valid trip date may be determined
 * using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combinations for the route
 */
export const getTerminalsAndMatesByRoute = (
  tripDate: Date,
  routeId: number
): Promise<ScheduleTerminalCombo[]> =>
  fetchSchedule<ScheduleTerminalCombo[]>(
    `/terminalsandmatesbyroute/${jsDateToYyyyMmDd(tripDate)}/${routeId}`
  );

/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param terminalId - The unique identifier for the departing terminal
 * @returns Promise resolving to an array of ScheduleTerminal objects containing arriving terminals
 */
export const getTerminalMates = (
  tripDate: Date,
  terminalId: number
): Promise<ScheduleTerminal[]> =>
  fetchSchedule<ScheduleTerminal[]>(
    `/terminalmates/${jsDateToYyyyMmDd(tripDate)}/${terminalId}`
  );

// ============================================================================
// ROUTES API FUNCTIONS
// ============================================================================

/**
 * API function for fetching all routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects containing basic route information
 */
export const getRoutes = (tripDate: Date): Promise<Route[]> =>
  fetchSchedule<Route[]>(`/routes/${jsDateToYyyyMmDd(tripDate)}`);

/**
 * API function for fetching routes between specific terminals from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes filtered by departing
 * and arriving terminals for a given trip date. Routes in the resultset are filtered
 * to match the specified terminal combination. Valid departing and arriving terminals
 * may be found using the terminalsAndMates endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects filtered by terminal combination
 */
export const getRoutesByTerminals = (
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number
): Promise<Route[]> =>
  fetchSchedule<Route[]>(
    `/routes/${jsDateToYyyyMmDd(tripDate)}/${departingTerminalId}/${arrivingTerminalId}`
  );

/**
 * API function for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects that have service disruptions
 */
export const getRoutesWithDisruptions = (tripDate: Date): Promise<Route[]> =>
  fetchSchedule<Route[]>(
    `/routeshavingservicedisruptions/${jsDateToYyyyMmDd(tripDate)}`
  );

/**
 * API function for fetching detailed route information from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns Promise resolving to an array of Route objects containing detailed route information
 */
export const getRouteDetails = (tripDate: Date): Promise<Route[]> =>
  fetchSchedule<Route[]>(`/routedetails/${jsDateToYyyyMmDd(tripDate)}`);

/**
 * API function for fetching detailed route information between specific terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. Valid departing and arriving terminals may be found
 * using the terminalsAndMates endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects with detailed information filtered by terminal combination
 */
export const getRouteDetailsByTerminals = (
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number
): Promise<Route[]> =>
  fetchSchedule<Route[]>(
    `/routedetails/${jsDateToYyyyMmDd(tripDate)}/${departingTerminalId}/${arrivingTerminalId}`
  );

/**
 * API function for fetching detailed route information by route ID from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to a RouteDetails object containing detailed information for the specified route
 */
export const getRouteDetailsByRoute = (
  tripDate: Date,
  routeId: number
): Promise<RouteDetails | null> =>
  fetchSchedule<RouteDetails>(
    `/routedetails/${jsDateToYyyyMmDd(tripDate)}/${routeId}`
  );

// ============================================================================
// ACTIVE SEASONS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @returns Promise resolving to an array of ActiveSeason objects containing active season information
 */
export const getActiveSeasons = (): Promise<ActiveSeason[]> =>
  fetchSchedule<ActiveSeason[]>("/activeseasons");

// ============================================================================
// SCHEDULED ROUTES API FUNCTIONS
// ============================================================================

/**
 * API function for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @returns Promise resolving to an array of ScheduledRoute objects representing all scheduled routes
 */
export const getScheduledRoutes = (): Promise<ScheduledRoute[]> =>
  fetchSchedule<ScheduledRoute[]>("/schedroutes");

/**
 * API function for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param scheduleId - The unique identifier for the season (schedule ID)
 * @returns Promise resolving to an array of ScheduledRoute objects representing scheduled routes for the specified season
 */
export const getScheduledRoutesBySeason = (
  scheduleId: number
): Promise<ScheduledRoute[]> =>
  fetchSchedule<ScheduledRoute[]>(`/schedroutes/${scheduleId}`);

// ============================================================================
// SAILINGS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching sailings from WSF Schedule API
 *
 * Provides sailings for a particular scheduled route. Sailings are departure times
 * organized by direction of travel (eastbound / westbound), days of operation groups
 * (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall).
 * Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule.
 * Scheduled routes may be determined using schedRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of Sailing objects containing sailing information
 */
export const getSailings = (schedRouteId: number): Promise<Sailing[]> =>
  fetchSchedule<Sailing[]>(`/sailings/${schedRouteId}`);

/**
 * API function for fetching all sailings from WSF Schedule API
 *
 * Provides all sailings for a particular scheduled route. Sailings are departure times
 * organized by direction of travel (eastbound / westbound), days of operation groups
 * (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall).
 * Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule.
 * Scheduled routes may be determined using schedRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of Sailing objects containing all sailing information
 */
export const getAllSailings = (schedRouteId: number): Promise<Sailing[]> =>
  fetchSchedule<Sailing[]>(`/allsailings/${schedRouteId}`);

// ============================================================================
// TIME ADJUSTMENTS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching time adjustments from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations that deviate on specific dates
 * from the scheduled times found in the sailings resultset (eg. tidal cancellations
 * affecting Port Townsend departures on 9/9/2014).
 *
 * @returns Promise resolving to an array of TimeAdjustment objects containing time adjustment information
 */
export const getTimeAdjustments = (): Promise<TimeAdjustment[]> =>
  fetchSchedule<TimeAdjustment[]>("/timeadj");

/**
 * API function for fetching time adjustments by route from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations for a route that deviate on
 * specific dates from the scheduled times found in the sailings resultset (eg. tidal
 * cancellations affecting Port Townsend departures on 9/9/2014). A valid route may
 * be determined using routes.
 *
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to an array of TimeAdjustment objects containing time adjustment information for the route
 */
export const getTimeAdjustmentsByRoute = (
  routeId: number
): Promise<TimeAdjustment[]> =>
  fetchSchedule<TimeAdjustment[]>(`/timeadjbyroute/${routeId}`);

/**
 * API function for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations for a scheduled route that
 * deviate on specific dates from the scheduled times found in the sailings resultset
 * (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid
 * scheduled route may be determined using schedRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of TimeAdjustment objects containing time adjustment information for the scheduled route
 */
export const getTimeAdjustmentsBySchedRoute = (
  schedRouteId: number
): Promise<TimeAdjustment[]> =>
  fetchSchedule<TimeAdjustment[]>(`/timeadjbyschedroute/${schedRouteId}`);

// ============================================================================
// SCHEDULE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching schedule by route from WSF Schedule API
 *
 * Provides departure times for a trip date and route. The resultset accounts for all
 * contingencies, sailing date ranges and time adjustments. Valid routes may be found
 * using routes. Similarly, a valid trip date may be determined using validDateRange.
 * Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to a ScheduleResponse object containing schedule information, or null if no schedule found
 */
export const getScheduleByRoute = (
  tripDate: Date,
  routeId: number
): Promise<ScheduleResponse | null> =>
  fetchSchedule<ScheduleResponse>(
    `/schedule/${jsDateToYyyyMmDd(tripDate)}/${routeId}`
  );

/**
 * API function for fetching schedule by terminals from WSF Schedule API
 *
 * Provides departure times for a trip date and terminal combination. The resultset
 * accounts for all contingencies, sailing date ranges and time adjustments. Valid
 * departing and arriving terminals may be found using terminalsAndMates. Similarly,
 * a valid trip date may be determined using validDateRange. Please format the trip
 * date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to a ScheduleResponse object containing schedule information, or null if no schedule found
 */
export const getScheduleByTerminals = (
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number
): Promise<ScheduleResponse | null> =>
  fetchSchedule<ScheduleResponse>(
    `/schedule/${jsDateToYyyyMmDd(tripDate)}/${departingTerminalId}/${arrivingTerminalId}`
  );

/**
 * API function for fetching today's schedule by route from WSF Schedule API
 *
 * Provides today's departure times for a route. Valid routes may be found using routes.
 * For the onlyRemainingTimes value, please indicate 'true' if departure times prior
 * to now should not be included in the resultset and 'false' if they should be included
 * in the resultset.
 *
 * @param routeId - The unique identifier for the route
 * @param onlyRemainingTimes - Whether to include only remaining departure times (defaults to false)
 * @returns Promise resolving to a ScheduleResponse object containing today's schedule information, or null if no schedule found
 */
export const getScheduleTodayByRoute = (
  routeId: number,
  onlyRemainingTimes: boolean = false
): Promise<ScheduleResponse | null> =>
  fetchSchedule<ScheduleResponse>(
    `/scheduletoday/${routeId}/${onlyRemainingTimes}`
  );

/**
 * API function for fetching today's schedule by terminals from WSF Schedule API
 *
 * Provides today's departure times for a terminal combination. Valid departing and
 * arriving terminals may be found using terminalsAndMates. For the onlyRemainingTimes
 * value, please indicate 'true' if departure times prior to now should not be included
 * in the resultset and 'false' if they should be included in the resultset.
 *
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @param onlyRemainingTimes - Whether to include only remaining departure times (defaults to false)
 * @returns Promise resolving to a ScheduleResponse object containing today's schedule information, or null if no schedule found
 */
export const getScheduleTodayByTerminals = (
  departingTerminalId: number,
  arrivingTerminalId: number,
  onlyRemainingTimes: boolean = false
): Promise<ScheduleResponse | null> =>
  fetchSchedule<ScheduleResponse>(
    `/scheduletoday/${departingTerminalId}/${arrivingTerminalId}/${onlyRemainingTimes}`
  );

// ============================================================================
// ALERTS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns Promise resolving to an array of Alert objects containing alert information
 */
export const getAlerts = (): Promise<Alert[]> =>
  fetchSchedule<Alert[]>("/alerts");

// ============================================================================
// ALTERNATIVE FORMATS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching alternative format data from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name. This endpoint
 * provides access to different data formats and representations that may be
 * useful for various applications and use cases.
 *
 * @param subjectName - The subject name for which to retrieve alternative formats
 * @returns Promise resolving to an array of AlternativeFormat objects containing format information
 */
export const getAlternativeFormats = (
  subjectName: string
): Promise<AlternativeFormat[]> =>
  fetchSchedule<AlternativeFormat[]>(`/alternativeformats/${subjectName}`);
