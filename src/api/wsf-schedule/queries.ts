// WSF Schedule API React Query hooks

import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";
import type { QueryOptionsWithoutKey } from "@/shared/types";

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
 * @param options - Optional React Query options
 * @returns React Query result object containing cache flush date information
 *
 * @example
 * ```typescript
 * const { data: flushDate } = useCacheFlushDateSchedule();
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const useCacheFlushDateSchedule = (
  options?: QueryOptionsWithoutKey<Date>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateSchedule(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
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
 * @param options - Optional React Query options
 * @returns React Query result object containing valid date range
 *
 * @example
 * ```typescript
 * const { data: dateRange } = useValidDateRange();
 * console.log(dateRange?.StartDate); // "2024-01-01T00:00:00Z"
 * ```
 */
export const useValidDateRange = (
  options?: QueryOptionsWithoutKey<ValidDateRange>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// TERMINALS HOOKS
// ============================================================================

/**
 * React Query hook for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing departing terminals
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminals = (
  params: { tripDate: Date },
  options?: QueryOptionsWithoutKey<ScheduleTerminal[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminals({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations
 */
export const useTerminalsAndMates = (
  params: { tripDate: Date },
  options?: QueryOptionsWithoutKey<ScheduleTerminalCombo[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMates",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminalsAndMates({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching terminals and mates by route from WSF Schedule API
 *
 * Provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using routes. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations for the route
 */
export const useTerminalsAndMatesByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: QueryOptionsWithoutKey<ScheduleTerminalCombo[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMatesByRoute",
      jsDateToYyyyMmDd(params.tripDate),
      params.routeId,
    ],
    queryFn: () =>
      getTerminalsAndMatesByRoute({
        tripDate: params.tripDate,
        routeId: params.routeId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching terminal mates from WSF Schedule API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and terminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalId - The unique identifier for the departing terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing arriving terminals
 */
export const useTerminalMates = (
  params: { tripDate: Date; terminalId: number },
  options?: QueryOptionsWithoutKey<ScheduleTerminal[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalMates",
      jsDateToYyyyMmDd(params.tripDate),
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalMates({
        tripDate: params.tripDate,
        terminalId: params.terminalId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// ROUTES HOOKS
// ============================================================================

/**
 * React Query hook for fetching routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing routes
 *
 * @example
 * ```typescript
 * const { data: routes } = useRoutes({ tripDate: new Date('2024-01-15') });
 * console.log(routes?.[0]?.RouteAbbrev); // "ANA-SID"
 * ```
 */
export const useRoutes = (
  params: { tripDate: Date },
  options?: QueryOptionsWithoutKey<Route[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "routes", jsDateToYyyyMmDd(params.tripDate)],
    queryFn: () => getRoutes({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching routes by terminals from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes filtered by departing
 * and arriving terminals for a given trip date. Routes in the resultset are filtered
 * to match the specified terminal combination. Valid departing and arriving terminals
 * may be found using the terminalsAndMates endpoint.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing routes for the terminal combination
 */
export const useRoutesByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: QueryOptionsWithoutKey<Route[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routesByTerminals",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () =>
      getRoutesByTerminals({
        tripDate: params.tripDate,
        departingTerminalId: params.departingTerminalId,
        arrivingTerminalId: params.arrivingTerminalId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching routes with disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing routes with disruption information
 */
export const useRoutesWithDisruptions = (
  params: { tripDate: Date },
  options?: QueryOptionsWithoutKey<Route[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routesWithDisruptions",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getRoutesWithDisruptions({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// ROUTE DETAILS HOOKS
// ============================================================================

/**
 * React Query hook for fetching route details from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing route details
 */
export const useRouteDetails = (
  params: { tripDate: Date },
  options?: QueryOptionsWithoutKey<Route[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetails",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getRouteDetails({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching route details by terminals from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes filtered by departing and
 * arriving terminals for a given trip date. Routes in the resultset are filtered to match
 * the specified terminal combination. Valid departing and arriving terminals may be found
 * using the terminalsAndMates endpoint.
 *
 * @param params - Object containing tripDate, departingTerminalId, arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing route details for the terminal combination
 */
export const useRouteDetailsByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: QueryOptionsWithoutKey<Route[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByTerminals",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () =>
      getRouteDetailsByTerminals({
        tripDate: params.tripDate,
        departingTerminalId: params.departingTerminalId,
        arrivingTerminalId: params.arrivingTerminalId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching route details by route from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing route details for the specified route
 */
export const useRouteDetailsByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: QueryOptionsWithoutKey<RouteDetails | null>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByRoute",
      jsDateToYyyyMmDd(params.tripDate),
      params.routeId,
    ],
    queryFn: () =>
      getRouteDetailsByRoute({
        tripDate: params.tripDate,
        routeId: params.routeId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// SEASONS HOOKS
// ============================================================================

/**
 * React Query hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing active seasons
 */
export const useActiveSeasons = (
  options?: QueryOptionsWithoutKey<ActiveSeason[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @returns React Query result object containing scheduled routes
 */
export const useScheduledRoutes = (
  options?: QueryOptionsWithoutKey<ScheduledRoute[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "scheduledRoutes"],
    queryFn: () => getScheduledRoutes(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param params - Object containing scheduleId
 * @param params.scheduleId - The unique identifier for the season (schedule ID)
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled routes for the season
 */
export const useScheduledRoutesBySeason = (
  params: { scheduleId: number },
  options?: QueryOptionsWithoutKey<ScheduledRoute[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduledRoutes",
      "bySeason",
      params.scheduleId,
    ],
    queryFn: () =>
      getScheduledRoutesBySeason({ scheduleId: params.scheduleId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing sailings for the scheduled route
 */
export const useSailings = (
  params: { schedRouteId: number },
  options?: QueryOptionsWithoutKey<Sailing[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "sailings", params.schedRouteId],
    queryFn: () => getSailings({ schedRouteId: params.schedRouteId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing all sailings for the scheduled route
 */
export const useAllSailings = (
  params: { schedRouteId: number },
  options?: QueryOptionsWithoutKey<Sailing[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "allSailings", params.schedRouteId],
    queryFn: () => getAllSailings({ schedRouteId: params.schedRouteId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @returns React Query result object containing time adjustments
 */
export const useTimeAdjustments = (
  options?: QueryOptionsWithoutKey<TimeAdjustment[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "timeAdjustments"],
    queryFn: () => getTimeAdjustments(),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param params - Object containing routeId
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustments for the route
 */
export const useTimeAdjustmentsByRoute = (
  params: { routeId: number },
  options?: QueryOptionsWithoutKey<TimeAdjustment[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "timeAdjustments", "byRoute", params.routeId],
    queryFn: () => getTimeAdjustmentsByRoute({ routeId: params.routeId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustments for the scheduled route
 */
export const useTimeAdjustmentsBySchedRoute = (
  params: { schedRouteId: number },
  options?: QueryOptionsWithoutKey<TimeAdjustment[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustments",
      "bySchedRoute",
      params.schedRouteId,
    ],
    queryFn: () =>
      getTimeAdjustmentsBySchedRoute({ schedRouteId: params.schedRouteId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// SCHEDULE HOOKS
// ============================================================================

/**
 * React Query hook for fetching schedule by route from WSF Schedule API
 *
 * Provides departure times for a trip date and route. The resultset accounts for all
 * contingencies, sailing date ranges and time adjustments. Valid routes may be found
 * using routes. Similarly, a valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule for the route
 */
export const useScheduleByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: QueryOptionsWithoutKey<ScheduleResponse | null>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByRoute",
      jsDateToYyyyMmDd(params.tripDate),
      params.routeId,
    ],
    queryFn: () =>
      getScheduleByRoute({
        tripDate: params.tripDate,
        routeId: params.routeId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching schedule by terminals from WSF Schedule API
 *
 * Provides departure times for a trip date and terminal combination. The resultset
 * accounts for all contingencies, sailing date ranges and time adjustments. Valid
 * terminal combinations may be found using terminalsAndMates. Similarly, a valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule for the terminal combination
 */
export const useScheduleByTerminals = (
  params: {
    tripDate: Date;
    departingTerminalId: number;
    arrivingTerminalId: number;
  },
  options?: QueryOptionsWithoutKey<ScheduleResponse | null>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByTerminals",
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () =>
      getScheduleByTerminals({
        tripDate: params.tripDate,
        departingTerminalId: params.departingTerminalId,
        arrivingTerminalId: params.arrivingTerminalId,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by route from WSF Schedule API
 *
 * Provides today's departure times for a route. Valid routes may be found using routes.
 * For the onlyRemainingTimes value, please indicate 'true' if departure times prior
 * to now should not be included in the resultset and 'false' if they should be included
 * in the resultset.
 *
 * @param params - Object containing routeId and onlyRemainingTimes
 * @param params.routeId - The unique identifier for the route
 * @param params.onlyRemainingTimes - Optional flag to return only remaining sailings for today
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule for the route
 */
export const useScheduleTodayByRoute = (
  params: { routeId: number; onlyRemainingTimes?: boolean },
  options?: QueryOptionsWithoutKey<ScheduleResponse | null>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByRoute",
      params.routeId,
      params.onlyRemainingTimes,
    ],
    queryFn: () =>
      getScheduleTodayByRoute({
        routeId: params.routeId,
        onlyRemainingTimes: params.onlyRemainingTimes,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Provides today's departure times for a terminal combination. Valid terminal combinations
 * may be found using terminalsAndMates. For the onlyRemainingTimes value, please indicate
 * 'true' if departure times prior to now should not be included in the resultset and
 * 'false' if they should be included in the resultset.
 *
 * @param params - Object containing departingTerminalId, arrivingTerminalId, and onlyRemainingTimes
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param params.onlyRemainingTimes - Optional flag to return only remaining sailings for today
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule for the terminal combination
 */
export const useScheduleTodayByTerminals = (
  params: {
    departingTerminalId: number;
    arrivingTerminalId: number;
    onlyRemainingTimes?: boolean;
  },
  options?: QueryOptionsWithoutKey<ScheduleResponse | null>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByTerminals",
      params.departingTerminalId,
      params.arrivingTerminalId,
      params.onlyRemainingTimes,
    ],
    queryFn: () =>
      getScheduleTodayByTerminals({
        departingTerminalId: params.departingTerminalId,
        arrivingTerminalId: params.arrivingTerminalId,
        onlyRemainingTimes: params.onlyRemainingTimes,
      }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @returns React Query result object containing alerts
 */
export const useAlerts = (options?: QueryOptionsWithoutKey<Alert[]>) =>
  useQuery({
    queryKey: ["wsf", "schedule", "alerts"],
    queryFn: () => getAlerts(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });

// ============================================================================
// ALTERNATIVE FORMATS HOOKS
// ============================================================================

/**
 * React Query hook for fetching alternative formats from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name. This endpoint
 * provides access to different data formats and representations that may be
 * useful for various applications and use cases.
 *
 * @param params - Object containing subjectName
 * @param params.subjectName - The subject name for which to retrieve alternative formats
 * @param options - Optional React Query options
 * @returns React Query result object containing alternative formats
 */
export const useAlternativeFormats = (
  params: { subjectName: string },
  options?: QueryOptionsWithoutKey<AlternativeFormat[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "alternativeFormats", params.subjectName],
    queryFn: () => getAlternativeFormats({ subjectName: params.subjectName }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
