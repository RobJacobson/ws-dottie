// WSF Schedule API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";

import type { TerminalBasics as ScheduleTerminal } from "../terminals/types";
import type { Vessel } from "../vessels/types";
import type {
  Route,
  ScheduleDeparture as Sailing,
  Schedule,
  ScheduleCacheFlushDate,
  TimeAdjustment,
  ValidDateRange,
} from "./types";

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
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl("/routes/{tripDate}", { tripDate })
  );

/**
 * API function for fetching routes between specific terminals from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes filtered by departing
 * and arriving terminals for a given trip date. Routes in the resultset are filtered
 * to match the specified terminal combination. Valid departing and arriving terminals
 * may be found using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects filtered by terminal combination
 */
export const getRoutesByTerminals = (params: {
  tripDate: Date;
  departingTerminalId: number;
  arrivingTerminalId: number;
}): Promise<Route[]> =>
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl(
      "/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
      params
    )
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
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl("/routeshavingservicedisruptions/{tripDate}", { tripDate })
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
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl("/routedetails/{tripDate}", { tripDate })
  );

/**
 * API function for fetching detailed route information between specific terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. Valid departing and arriving terminals may be found
 * using the terminalsAndMates endpoint.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects with detailed information filtered by terminal combination
 */
export const getRouteDetailsByTerminals = (params: {
  tripDate: Date;
  departingTerminalId: number;
  arrivingTerminalId: number;
}): Promise<Route[]> =>
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl(
      "/routedetails/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
      params
    )
  );

/**
 * API function for fetching detailed route information by route ID from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param params - Object containing trip date and route information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to an array of Route objects containing detailed information for the specified route
 */
export const getRouteDetailsByRoute = (params: {
  tripDate: Date;
  routeId: number;
}): Promise<Route[]> =>
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl("/routedetails/{tripDate}/{routeId}", params)
  );

/**
 * API function for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @returns Promise resolving to an array of Route objects representing all scheduled routes
 */
export const getScheduledRoutes = (): Promise<Route[]> =>
  fetchWsfArray<Route>("schedule", "/schedroutes");

/**
 * API function for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param seasonId - The unique identifier for the season (schedule ID)
 * @returns Promise resolving to an array of Route objects representing scheduled routes for the specified season
 */
export const getScheduledRoutesBySeason = (
  seasonId: number
): Promise<Route[]> =>
  fetchWsfArray<Route>(
    "schedule",
    buildWsfUrl("/schedroutes/{seasonId}", { seasonId })
  );

/**
 * API function for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @returns Promise resolving to an array of Route objects containing active season information
 */
export const getActiveSeasons = (): Promise<Route[]> =>
  fetchWsfArray<Route>("schedule", "/activeseasons");

/**
 * API function for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns Promise resolving to an array of Route objects containing alert information
 */
export const getAlerts = (): Promise<Route[]> =>
  fetchWsfArray<Route>("schedule", "/alerts");

// ============================================================================
// SCHEDULES API FUNCTIONS
// ============================================================================

/**
 * API function for fetching schedule by route from WSF Schedule API
 */
export const getScheduleByRoute = (params: {
  tripDate: Date;
  routeID: number;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl("/schedule/{tripDate}/{routeID}", params)
  );

/**
 * API function for fetching schedule by terminals from WSF Schedule API
 */
export const getScheduleByTerminals = (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl(
      "/schedule/{tripDate}/{departingTerminalID}/{arrivingTerminalID}",
      params
    )
  );

/**
 * API function for fetching today's schedule by route from WSF Schedule API
 */
export const getScheduleTodayByRoute = (params: {
  routeID: number;
  onlyRemainingTimes?: boolean;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl("/scheduletoday/{routeID}", params)
  );

/**
 * API function for fetching today's schedule by terminals from WSF Schedule API
 */
export const getScheduleTodayByTerminals = (params: {
  departingTerminalID: number;
  arrivingTerminalID: number;
  onlyRemainingTimes?: boolean;
}): Promise<Schedule[]> =>
  fetchWsfArray<Schedule>(
    "schedule",
    buildWsfUrl(
      "/scheduletoday/{departingTerminalID}/{arrivingTerminalID}",
      params
    )
  );

/**
 * API function for fetching sailings from WSF Schedule API
 */
export const getSailings = (params: {
  schedRouteID: number;
}): Promise<Sailing[]> =>
  fetchWsfArray<Sailing>(
    "schedule",
    buildWsfUrl("/sailings/{schedRouteID}", params)
  );

/**
 * API function for fetching all sailings from WSF Schedule API
 */
export const getAllSailings = (params: {
  schedRouteID: number;
  year: number;
}): Promise<Sailing[]> =>
  fetchWsfArray<Sailing>(
    "schedule",
    buildWsfUrl("/allsailings/{schedRouteID}/{year}", params)
  );

// ============================================================================
// TERMINALS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching all terminals from WSF Schedule API
 *
 * Retrieves all valid departing terminals for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal information
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminals = (tripDate: Date): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminals/{tripDate}", { tripDate })
  );

/**
 * API function for fetching terminals by route from WSF Schedule API
 *
 * Retrieves all terminal combinations for a specific route.
 *
 * @param routeId - The route ID to get terminals for
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalsByRoute = (
  routeId: number
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalsandmatesbyroute/{routeId}", { routeId })
  );

/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all terminal combinations (departing and arriving) for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal combinations
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalsAndMates = (
  tripDate: Date
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalsandmates/{tripDate}", { tripDate })
  );

/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Retrieves all arriving terminals for a specific departing terminal on a given date.
 *
 * @param tripDate - The date for which to get terminal mates
 * @param terminalId - The departing terminal ID
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalMates = (
  tripDate: Date,
  terminalId: number
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalmates/{tripDate}/{terminalId}", {
      tripDate,
      terminalId,
    })
  );

// ============================================================================
// VESSELS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching all vessels from WSF Schedule API
 */
export const getVessels = (): Promise<Vessel[]> =>
  fetchWsfArray<Vessel>("schedule", "/vessels");

/**
 * API function for fetching vessels by route from WSF Schedule API
 */
export const getVesselsByRoute = (routeID: number): Promise<Vessel[]> =>
  fetchWsfArray<Vessel>(
    "schedule",
    buildWsfUrl("/vessels/{routeID}", { routeID })
  );

// ============================================================================
// TIME ADJUSTMENTS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching all time adjustments from WSF Schedule API
 */
export const getTimeAdjustments = (): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>("schedule", "/timeadj");

/**
 * API function for fetching time adjustments by route from WSF Schedule API
 */
export const getTimeAdjustmentsByRoute = (
  routeID: number
): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>(
    "schedule",
    buildWsfUrl("/timeadjbyroute/{routeID}", { routeID })
  );

/**
 * API function for fetching time adjustments by scheduled route from WSF Schedule API
 */
export const getTimeAdjustmentsBySchedRoute = (
  schedRouteID: number
): Promise<TimeAdjustment[]> =>
  fetchWsfArray<TimeAdjustment>(
    "schedule",
    buildWsfUrl("/timeadjbyschedroute/{schedRouteID}", { schedRouteID })
  );

// ============================================================================
// VALID DATE RANGE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching valid date range from WSF API
 * This is a general infrastructure endpoint used across all WSF API operations
 */
export const getValidDateRange = (): Promise<ValidDateRange | null> =>
  fetchWsf<ValidDateRange>("schedule", "/validdaterange");

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This endpoint
 * is used to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns Promise resolving to ScheduleCacheFlushDate object or null if fetch fails
 */
export const getCacheFlushDateSchedule =
  (): Promise<ScheduleCacheFlushDate | null> =>
    fetchWsf<ScheduleCacheFlushDate>("schedule", "/cacheflushdate");
