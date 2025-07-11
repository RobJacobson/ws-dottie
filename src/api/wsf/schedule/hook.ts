// WSF Schedule API React Query hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import type { TerminalBasics } from "../terminals/types";
import {
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getAlternativeFormats,
  getCacheFlushDateSchedule,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getSailings,
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsAndMatesByRoute,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getValidDateRange,
} from "./api";
import type {
  ActiveSeason,
  Alert,
  AlternativeFormat,
  Route,
  RouteDetails,
  Sailing,
  Schedule,
  ScheduleCacheFlushDate,
  ScheduledRoute,
  ScheduleResponse,
  ScheduleTerminal,
  ScheduleTerminalCombo,
  TimeAdjustment,
  ValidDateRange,
} from "./types";

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * React Query hook for fetching cache flush date from WSF Schedule API
 *
 * Retrieves the cache flush date for the schedule API. This endpoint helps
 * determine when cached data should be refreshed. When the date returned
 * from this operation is modified, drop your application cache and retrieve
 * fresh data from the service.
 *
 * @returns React Query result object containing cache flush date information
 */
export const useCacheFlushDateSchedule = () =>
  useQuery({
    queryKey: ["schedule", "cacheFlushDate"],
    queryFn: getCacheFlushDateSchedule,
    ...createInfrequentUpdateOptions(),
  });

// ============================================================================
// VALID DATE RANGE HOOKS
// ============================================================================

/**
 * React Query hook for fetching valid date range from WSF Schedule API
 *
 * Retrieves a date range for which schedule data is currently published & available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 * Please consider using cacheflushdate to coordinate the caching of this data in your application.
 *
 * @returns React Query result object containing valid date range information
 */
export const useValidDateRange = () =>
  useQuery({
    queryKey: ["schedule", "validDateRange"],
    queryFn: getValidDateRange,
    ...createInfrequentUpdateOptions(),
  });

// ============================================================================
// TERMINALS HOOKS
// ============================================================================

/**
 * React Query hook for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal information
 */
export const useTerminals = (
  tripDate: Date,
  options?: Parameters<typeof useQuery<ScheduleTerminal[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "terminals", tripDate.toISOString().split("T")[0]],
    queryFn: () => getTerminals(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using validDateRange. Please format the trip date
 * input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations
 */
export const useTerminalsAndMates = (
  tripDate: Date,
  options?: Parameters<typeof useQuery<ScheduleTerminalCombo[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "terminalsAndMates",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getTerminalsAndMates(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching terminals and mates by route from WSF Schedule API
 *
 * Provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using routes. Similarly, a valid trip date may be determined
 * using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param params - Object containing trip date and route information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations for the route
 */
export const useTerminalsAndMatesByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: Parameters<typeof useQuery<ScheduleTerminalCombo[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "terminalsAndMatesByRoute",
      params.tripDate.toISOString().split("T")[0],
      params.routeId,
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    enabled: !!params.tripDate && !!params.routeId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching terminal mates from WSF Schedule API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param terminalId - The unique identifier for the departing terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing arriving terminals
 */
export const useTerminalMates = (
  tripDate: Date,
  terminalId: number,
  options?: Parameters<typeof useQuery<ScheduleTerminal[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "terminalMates",
      tripDate.toISOString().split("T")[0],
      terminalId,
    ],
    queryFn: () => getTerminalMates(tripDate, terminalId),
    enabled: !!tripDate && !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// ROUTES HOOKS
// ============================================================================

/**
 * React Query hook for fetching all routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param options - Optional React Query options
 * @returns React Query result object containing basic route information
 */
export const useRoutes = (
  tripDate: Date,
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "routes", tripDate.toISOString().split("T")[0]],
    queryFn: () => getRoutes(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching routes between specific terminals from WSF Schedule API
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
 * @param options - Optional React Query options
 * @returns React Query result object containing routes filtered by terminal combination
 */
export const useRoutesByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "routesByTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getRoutesByTerminals(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalId &&
      !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param options - Optional React Query options
 * @returns React Query result object containing routes with service disruptions
 */
export const useRoutesWithDisruptions = (
  tripDate: Date,
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "routesWithDisruptions",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getRoutesWithDisruptions(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching detailed route information from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information
 */
export const useRouteDetails = (
  tripDate: Date,
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "routeDetails",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getRouteDetails(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching detailed route information between specific terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. This endpoint provides comprehensive route details
 * including sailing times, vessel assignments, and operational information.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information filtered by terminal combination
 */
export const useRouteDetailsByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "routeDetailsByTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalId &&
      !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching detailed route information for a specific route from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route on a given trip date.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information for the specified route.
 *
 * @param params - Object containing trip date and route information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information for the specific route
 */
export const useRouteDetailsByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: Parameters<typeof useQuery<RouteDetails | null>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "routeDetailsByRoute",
      params.tripDate.toISOString().split("T")[0],
      params.routeId,
    ],
    queryFn: () => getRouteDetailsByRoute(params),
    enabled: !!params.tripDate && !!params.routeId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// ACTIVE SEASONS HOOKS
// ============================================================================

/**
 * React Query hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing active season information
 */
export const useActiveSeasons = (
  options?: Parameters<typeof useQuery<ActiveSeason[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "activeSeasons"],
    queryFn: getActiveSeasons,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// SCHEDULED ROUTES HOOKS
// ============================================================================

/**
 * React Query hook for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing all scheduled routes
 */
export const useScheduledRoutes = (
  options?: Parameters<typeof useQuery<ScheduledRoute[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "scheduledRoutes"],
    queryFn: getScheduledRoutes,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param scheduleId - The unique identifier for the season (schedule ID)
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled routes for the specified season
 */
export const useScheduledRoutesBySeason = (
  scheduleId: number,
  options?: Parameters<typeof useQuery<ScheduledRoute[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "scheduledRoutesBySeason", scheduleId],
    queryFn: () => getScheduledRoutesBySeason(scheduleId),
    enabled: !!scheduleId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// SAILINGS HOOKS
// ============================================================================

/**
 * React Query hook for fetching sailings from WSF Schedule API
 *
 * Provides sailings for a particular scheduled route. Sailings are departure times
 * organized by direction of travel (eastbound / westbound), days of operation groups
 * (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall).
 * Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule.
 * Scheduled routes may be determined using schedRoutes.
 *
 * @param params - Object containing scheduled route information
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing sailing information
 */
export const useSailings = (
  params: { schedRouteId: number },
  options?: Parameters<typeof useQuery<Sailing[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "sailings", params.schedRouteId],
    queryFn: () => getSailings(params),
    enabled: !!params.schedRouteId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching all sailings from WSF Schedule API
 *
 * Provides all sailings for a particular scheduled route. Sailings are departure times
 * organized by direction of travel (eastbound / westbound), days of operation groups
 * (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall).
 * Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule.
 * Scheduled routes may be determined using schedRoutes.
 *
 * @param params - Object containing scheduled route information
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing all sailing information
 */
export const useAllSailings = (
  params: { schedRouteId: number },
  options?: Parameters<typeof useQuery<Sailing[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "allSailings", params.schedRouteId],
    queryFn: () => getAllSailings(params),
    enabled: !!params.schedRouteId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// TIME ADJUSTMENTS HOOKS
// ============================================================================

/**
 * React Query hook for fetching time adjustments from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations that deviate on specific dates
 * from the scheduled times found in the sailings resultset (eg. tidal cancellations
 * affecting Port Townsend departures on 9/9/2014).
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustment information
 */
export const useTimeAdjustments = (
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "timeAdjustments"],
    queryFn: getTimeAdjustments,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching time adjustments by route from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations for a route that deviate on
 * specific dates from the scheduled times found in the sailings resultset (eg. tidal
 * cancellations affecting Port Townsend departures on 9/9/2014). A valid route may
 * be determined using routes.
 *
 * @param routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustment information for the route
 */
export const useTimeAdjustmentsByRoute = (
  routeId: number,
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "timeAdjustmentsByRoute", routeId],
    queryFn: () => getTimeAdjustmentsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Provides a listing of all additions and cancellations for a scheduled route that
 * deviate on specific dates from the scheduled times found in the sailings resultset
 * (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid
 * scheduled route may be determined using schedRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustment information for the scheduled route
 */
export const useTimeAdjustmentsBySchedRoute = (
  schedRouteId: number,
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "timeAdjustmentsBySchedRoute", schedRouteId],
    queryFn: () => getTimeAdjustmentsBySchedRoute(schedRouteId),
    enabled: !!schedRouteId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// SCHEDULE HOOKS
// ============================================================================

/**
 * React Query hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route on a given trip date.
 * This endpoint provides comprehensive schedule details including departure times,
 * vessel assignments, and operational information for the specified route.
 *
 * @param params - Object containing trip date and route information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule information for the route
 */
export const useScheduleByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "scheduleByRoute",
      params.tripDate.toISOString().split("T")[0],
      params.routeId,
    ],
    queryFn: () => getScheduleByRoute(params),
    enabled: !!params.tripDate && !!params.routeId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information between specific terminals on a given trip date.
 * This endpoint provides comprehensive schedule details including departure times,
 * vessel assignments, and operational information for the specified terminal combination.
 *
 * @param params - Object containing trip date and terminal information
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule information between terminals
 */
export const useScheduleByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "scheduleByTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getScheduleByTerminals(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalId &&
      !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route. This endpoint provides
 * real-time schedule details including departure times, vessel assignments, and operational
 * information for the specified route on the current date.
 *
 * @param params - Object containing route information and options
 * @param params.routeId - The unique identifier for the route
 * @param params.onlyRemainingTimes - Optional flag to return only remaining departure times
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule information for the route
 */
export const useScheduleTodayByRoute = (
  params: { routeId: number; onlyRemainingTimes?: boolean },
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "scheduleTodayByRoute",
      params.routeId,
      params.onlyRemainingTimes,
    ],
    queryFn: () => getScheduleTodayByRoute(params),
    enabled: !!params.routeId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Retrieves today's schedule information between specific terminals. This endpoint provides
 * real-time schedule details including departure times, vessel assignments, and operational
 * information for the specified terminal combination on the current date.
 *
 * @param params - Object containing terminal information and options
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param params.onlyRemainingTimes - Optional flag to return only remaining departure times
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule information between terminals
 */
export const useScheduleTodayByTerminals = (
  params: {
    departingTerminalId: number;
    arrivingTerminalId: number;
    onlyRemainingTimes?: boolean;
  },
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "schedule",
      "scheduleTodayByTerminals",
      params.departingTerminalId,
      params.arrivingTerminalId,
      params.onlyRemainingTimes,
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    enabled: !!params.departingTerminalId && !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// ALERTS HOOKS
// ============================================================================

/**
 * React Query hook for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing alert information
 */
export const useAlerts = (options?: Parameters<typeof useQuery<Alert[]>>[0]) =>
  useQuery({
    queryKey: ["schedule", "alerts"],
    queryFn: getAlerts,
    ...createInfrequentUpdateOptions(),
    ...options,
  });

// ============================================================================
// ALTERNATIVE FORMATS HOOKS
// ============================================================================

/**
 * React Query hook for fetching alternative format data from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name. This endpoint
 * provides access to different data formats and representations that may be
 * useful for various applications and use cases.
 *
 * @param subjectName - The subject name for which to retrieve alternative formats
 * @param options - Optional React Query options
 * @returns React Query result object containing alternative format information
 */
export const useAlternativeFormats = (
  subjectName: string,
  options?: Parameters<typeof useQuery<AlternativeFormat[]>>[0]
) =>
  useQuery({
    queryKey: ["schedule", "alternativeFormats", subjectName],
    queryFn: () => getAlternativeFormats(subjectName),
    enabled: !!subjectName,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
