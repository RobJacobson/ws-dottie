// WSF Schedule API React Query hooks

import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/dateUtils";

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
 * @returns React Query result object containing cache flush date information
 */
export const useCacheFlushDateSchedule = () =>
  useQuery({
    queryKey: ["wsf", "schedule", "cacheFlushDate"],
    queryFn: () => getCacheFlushDateSchedule(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
  });

// ============================================================================
// VALID DATE RANGE HOOKS
// ============================================================================

/**
 * React Query hook for fetching valid date range from WSF Schedule API
 *
 * Retrieves the valid date range for which schedule data is available.
 * This endpoint provides the date range that can be used for other schedule queries.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing valid date range
 */
export const useValidDateRange = (
  options?: Parameters<typeof useQuery<ValidDateRange>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "validDateRange"],
    queryFn: () => getValidDateRange(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// TERMINALS HOOKS
// ============================================================================

/**
 * React Query hook for fetching terminals from WSF Schedule API
 *
 * Retrieves all valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing departing terminals
 */
export const useTerminals = (
  params: { tripDate: Date },
  options?: Parameters<typeof useQuery<ScheduleTerminal[]>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminals({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
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
  options?: Parameters<typeof useQuery<ScheduleTerminalCombo[]>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMates",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminalsAndMates({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
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
  options?: Parameters<typeof useQuery<ScheduleTerminalCombo[]>>[0]
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
    ...tanstackQueryOptions.WEEKLY_UPDATES,
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
  options?: Parameters<typeof useQuery<ScheduleTerminal[]>>[0]
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
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// ROUTES HOOKS
// ============================================================================

/**
 * React Query hook for fetching routes from WSF Schedule API
 *
 * Retrieves all valid routes for a given trip date. A valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing routes
 */
export const useRoutes = (
  params: { tripDate: Date },
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "routes", jsDateToYyyyMmDd(params.tripDate)],
    queryFn: () => getRoutes({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching routes by terminals from WSF Schedule API
 *
 * Provides valid routes for a given terminal combination and trip date. Valid terminal
 * combinations may be found using terminalsAndMates. Similarly, a valid trip date may be
 * determined using validDateRange.
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
  options?: Parameters<typeof useQuery<Route[]>>[0]
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
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching routes with disruptions from WSF Schedule API
 *
 * Retrieves all valid routes with disruption information for a given trip date. A valid
 * trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing routes with disruption information
 */
export const useRoutesWithDisruptions = (
  params: { tripDate: Date },
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routesWithDisruptions",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getRoutesWithDisruptions({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// ROUTE DETAILS HOOKS
// ============================================================================

/**
 * React Query hook for fetching route details from WSF Schedule API
 *
 * Retrieves detailed information for all routes on a given trip date. A valid trip date
 * may be determined using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param params - Object containing tripDate and optional enabled flag
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.enabled - Optional flag to enable/disable the query
 * @param options - Optional React Query options
 * @returns React Query result object containing route details
 */
export const useRouteDetails = (
  params: { tripDate: Date },
  options?: Parameters<typeof useQuery<Route[]>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetails",
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getRouteDetails({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching route details by terminals from WSF Schedule API
 *
 * Provides detailed information for routes between specific terminals on a given trip date.
 * Valid terminal combinations may be found using terminalsAndMates. Similarly, a valid trip
 * date may be determined using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param params - Object containing tripDate, departingTerminalId, arrivingTerminalId and optional enabled flag
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param params.enabled - Optional flag to enable/disable the query
 * @param options - Optional React Query options
 * @returns React Query result object containing route details for the terminal combination
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
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching route details by route from WSF Schedule API
 *
 * Provides detailed information for a specific route on a given trip date. Valid routes
 * may be found using routes. Similarly, a valid trip date may be determined using
 * validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param params - Object containing tripDate, routeId and optional enabled flag
 * @param params.tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param params.routeId - The unique identifier for the route
 * @param params.enabled - Optional flag to enable/disable the query
 * @param options - Optional React Query options
 * @returns React Query result object containing route details for the specified route
 */
export const useRouteDetailsByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: Parameters<typeof useQuery<RouteDetails | null>>[0]
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
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// SEASONS HOOKS
// ============================================================================

/**
 * React Query hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves all active seasons that may be used for schedule queries.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing active seasons
 */
export const useActiveSeasons = (
  options?: Parameters<typeof useQuery<ActiveSeason[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// SCHEDULED ROUTES HOOKS
// ============================================================================

/**
 * React Query hook for fetching scheduled routes from WSF Schedule API
 *
 * Retrieves all scheduled routes that may be used for schedule queries.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled routes
 */
export const useScheduledRoutes = (
  options?: Parameters<typeof useQuery<ScheduledRoute[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "scheduledRoutes"],
    queryFn: () => getScheduledRoutes(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Retrieves scheduled routes for a specific season. Valid seasons may be found
 * using activeSeasons.
 *
 * @param scheduleId - The unique identifier for the season
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled routes for the season
 */
export const useScheduledRoutesBySeason = (
  scheduleId: number,
  options?: Parameters<typeof useQuery<ScheduledRoute[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "scheduledRoutes", "bySeason", scheduleId],
    queryFn: () => getScheduledRoutesBySeason({ scheduleId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// SAILINGS HOOKS
// ============================================================================

/**
 * React Query hook for fetching sailings from WSF Schedule API
 *
 * Retrieves all sailings for a given scheduled route. Valid scheduled routes may be found
 * using scheduledRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing sailings for the scheduled route
 */
export const useSailings = (
  schedRouteId: number,
  options?: Parameters<typeof useQuery<Sailing[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "sailings", schedRouteId],
    queryFn: () => getSailings({ schedRouteId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailings for a given scheduled route, including past sailings.
 * Valid scheduled routes may be found using scheduledRoutes.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing all sailings for the scheduled route
 */
export const useAllSailings = (
  schedRouteId: number,
  options?: Parameters<typeof useQuery<Sailing[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "allSailings", schedRouteId],
    queryFn: () => getAllSailings({ schedRouteId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// TIME ADJUSTMENTS HOOKS
// ============================================================================

/**
 * React Query hook for fetching time adjustments from WSF Schedule API
 *
 * Retrieves all time adjustments that may affect scheduled sailings.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustments
 */
export const useTimeAdjustments = (
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "timeAdjustments"],
    queryFn: () => getTimeAdjustments(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching time adjustments by route from WSF Schedule API
 *
 * Retrieves time adjustments for a specific route that may affect scheduled sailings.
 *
 * @param routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustments for the route
 */
export const useTimeAdjustmentsByRoute = (
  routeId: number,
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "timeAdjustments", "byRoute", routeId],
    queryFn: () => getTimeAdjustmentsByRoute({ routeId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustments for a specific scheduled route that may affect scheduled sailings.
 *
 * @param schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustments for the scheduled route
 */
export const useTimeAdjustmentsBySchedRoute = (
  schedRouteId: number,
  options?: Parameters<typeof useQuery<TimeAdjustment[]>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustments",
      "bySchedRoute",
      schedRouteId,
    ],
    queryFn: () => getTimeAdjustmentsBySchedRoute({ schedRouteId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// SCHEDULE HOOKS
// ============================================================================

/**
 * React Query hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves the complete schedule for a given route and trip date. Valid routes may be found
 * using routes. Similarly, a valid trip date may be determined using validDateRange.
 * Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule for the route
 */
export const useScheduleByRoute = (
  tripDate: Date,
  routeId: number,
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByRoute",
      jsDateToYyyyMmDd(tripDate),
      routeId,
    ],
    queryFn: () => getScheduleByRoute({ tripDate, routeId }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves the complete schedule for a given terminal combination and trip date. Valid
 * terminal combinations may be found using terminalsAndMates. Similarly, a valid trip date
 * may be determined using validDateRange. Please format the trip date input as 'YYYY-MM-DD'.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule for the terminal combination
 */
export const useScheduleByTerminals = (
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number,
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByTerminals",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalId,
      arrivingTerminalId,
    ],
    queryFn: () =>
      getScheduleByTerminals({
        tripDate,
        departingTerminalId,
        arrivingTerminalId,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule for a given route. Valid routes may be found using routes.
 *
 * @param routeId - The unique identifier for the route
 * @param onlyRemainingTimes - Optional flag to return only remaining sailings for today
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule for the route
 */
export const useScheduleTodayByRoute = (
  routeId: number,
  onlyRemainingTimes?: boolean,
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByRoute",
      routeId,
      onlyRemainingTimes,
    ],
    queryFn: () => getScheduleTodayByRoute({ routeId, onlyRemainingTimes }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

/**
 * React Query hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Retrieves today's schedule for a given terminal combination. Valid terminal combinations
 * may be found using terminalsAndMates.
 *
 * @param departingTerminalId - The unique identifier for the departing terminal
 * @param arrivingTerminalId - The unique identifier for the arriving terminal
 * @param onlyRemainingTimes - Optional flag to return only remaining sailings for today
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule for the terminal combination
 */
export const useScheduleTodayByTerminals = (
  departingTerminalId: number,
  arrivingTerminalId: number,
  onlyRemainingTimes?: boolean,
  options?: Parameters<typeof useQuery<ScheduleResponse | null>>[0]
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByTerminals",
      departingTerminalId,
      arrivingTerminalId,
      onlyRemainingTimes,
    ],
    queryFn: () =>
      getScheduleTodayByTerminals({
        departingTerminalId,
        arrivingTerminalId,
        onlyRemainingTimes,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// ALERTS HOOKS
// ============================================================================

/**
 * React Query hook for fetching alerts from WSF Schedule API
 *
 * Retrieves all alerts that may affect scheduled sailings.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing alerts
 */
export const useAlerts = (options?: Parameters<typeof useQuery<Alert[]>>[0]) =>
  useQuery({
    queryKey: ["wsf", "schedule", "alerts"],
    queryFn: () => getAlerts(),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });

// ============================================================================
// ALTERNATIVE FORMATS HOOKS
// ============================================================================

/**
 * React Query hook for fetching alternative formats from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name.
 *
 * @param subjectName - The subject name for which to retrieve alternative formats
 * @param options - Optional React Query options
 * @returns React Query result object containing alternative formats
 */
export const useAlternativeFormats = (
  subjectName: string,
  options?: Parameters<typeof useQuery<AlternativeFormat[]>>[0]
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "alternativeFormats", subjectName],
    queryFn: () => getAlternativeFormats({ subjectName }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
