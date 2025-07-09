// WSF Schedule hooks

import { useQuery } from "@tanstack/react-query";

import {
  createCacheFlushOptions,
  createInfrequentUpdateOptions,
} from "@/shared/caching/config";

import type { TerminalBasics as ScheduleTerminal } from "../terminals/types";
import type { Vessel } from "../vessels/types";
import {
  // Routes API functions
  getActiveSeasons,
  getAlerts,
  // Schedules API functions
  getAllSailings,
  // Cache Flush Date API functions
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
  // Terminals API functions
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsByRoute,
  // Time Adjustments API functions
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  // Valid Date Range API functions
  getValidDateRange,
  // Vessels API functions
  getVessels,
  getVesselsByRoute,
} from "./api";
import type {
  Route,
  ScheduleDeparture as Sailing,
  Schedule,
  ScheduleCacheFlushDate,
  TimeAdjustment,
  ValidDateRange,
} from "./types";

// ============================================================================
// ROUTES HOOKS
// ============================================================================

/**
 * Hook for fetching all routes from WSF Schedule API
 *
 * Retrieves the most basic/brief information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * Valid trip dates may be determined using the validDateRange endpoint.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects with basic route information
 */
export const useRoutes = (tripDate: Date) => {
  return useQuery({
    queryKey: ["schedule", "routes", tripDate.toISOString().split("T")[0]],
    queryFn: () => getRoutes(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching routes between specific terminals from WSF Schedule API
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
 * @returns React Query result containing an array of Route objects filtered by terminal combination
 */
export const useRoutesByTerminals = (params: {
  tripDate: Date;
  departingTerminalId: number;
  arrivingTerminalId: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "byTerminals",
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
  });
};

/**
 * Hook for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves the most basic/brief information for routes currently associated with
 * service disruptions for a given trip date. This endpoint helps identify routes
 * that may have delays, cancellations, or other service issues.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects that have service disruptions
 */
export const useRoutesWithDisruptions = (tripDate: Date) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "withDisruptions",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getRoutesWithDisruptions(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching route details from WSF Schedule API
 *
 * Retrieves highly detailed information pertaining to routes for a given trip date.
 * If only a trip date is included, all routes available for that date of travel are returned.
 * This endpoint provides comprehensive route details including sailing times, vessel assignments,
 * and operational information.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @returns React Query result containing an array of Route objects with detailed route information
 */
export const useRouteDetails = (tripDate: Date) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "details",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getRouteDetails(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching route details by terminals from WSF Schedule API
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
 * @returns React Query result containing an array of Route objects with detailed information filtered by terminal combination
 */
export const useRouteDetailsByTerminals = (params: {
  tripDate: Date;
  departingTerminalId: number;
  arrivingTerminalId: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "detailsByTerminals",
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
  });
};

/**
 * Hook for fetching route details by route from WSF Schedule API
 *
 * Retrieves highly detailed information for a specific route identified by route ID
 * for a given trip date. This endpoint filters the resultset to a single route,
 * providing comprehensive details for that specific route.
 *
 * @param tripDate - The trip date in YYYY-MM-DD format (e.g., '2024-04-01' for April 1, 2024)
 * @param routeId - The unique identifier for the route
 * @returns React Query result containing an array of Route objects with detailed information for the specified route
 */
export const useRouteDetailsByRoute = (tripDate: Date, routeId: number) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "detailsByRoute",
      tripDate.toISOString().split("T")[0],
      routeId,
    ],
    queryFn: () => getRouteDetailsByRoute({ tripDate, routeId }),
    enabled: !!tripDate && !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching scheduled routes from WSF Schedule API
 *
 * Provides a listing of routes that are active for a season. Results include all known
 * scheduled routes spanning current and upcoming seasons. For example, "Anacortes / Sidney B.C."
 * may be a valid route, but if it's not scheduled to run during a specific season,
 * it won't be returned as part of that season's scheduled routes resultset.
 *
 * @returns React Query result containing an array of Route objects representing all scheduled routes
 */
export const useScheduledRoutes = () => {
  return useQuery({
    queryKey: ["schedule", "scheduledRoutes"],
    queryFn: getScheduledRoutes,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Provides a listing of routes that are active for a specific season identified by schedule ID.
 * Results are filtered to only include scheduled routes for the specified season.
 * Seasons may be determined using the activeSeasons endpoint.
 *
 * @param seasonId - The unique identifier for the season (schedule ID)
 * @returns React Query result containing an array of Route objects representing scheduled routes for the specified season
 */
export const useScheduledRoutesBySeason = (seasonId: number) => {
  return useQuery({
    queryKey: ["schedule", "scheduledRoutes", "bySeason", seasonId],
    queryFn: () => getScheduledRoutesBySeason(seasonId),
    enabled: !!seasonId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching active seasons from WSF Schedule API
 *
 * Retrieves a summary of active seasons. This endpoint provides information about
 * current and upcoming ferry service seasons, which can be used to determine
 * valid schedule IDs for other endpoints.
 *
 * @returns React Query result containing an array of Route objects containing active season information
 */
export const useActiveSeasons = () => {
  return useQuery({
    queryKey: ["schedule", "activeSeasons"],
    queryFn: getActiveSeasons,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching alerts from WSF Schedule API
 *
 * Provides alert information tailored for routes, bulletins, service disruptions, etc.
 * This endpoint returns important notifications and updates that may affect ferry service,
 * including weather-related delays, maintenance notices, and other operational alerts.
 *
 * @returns React Query result containing an array of Route objects containing alert information
 */
export const useAlerts = () => {
  return useQuery({
    queryKey: ["schedule", "alerts"],
    queryFn: getAlerts,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// SCHEDULES HOOKS
// ============================================================================

/**
 * Hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route and date.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param tripDate - The trip date for the schedule
 * @param routeId - The route ID to get schedule for
 * @returns React Query result containing Schedule data
 */
export const useScheduleByRoute = (tripDate: Date, routeId: number) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byRoute",
      tripDate.toISOString().split("T")[0],
      routeId,
    ],
    queryFn: () => getScheduleByRoute({ tripDate, routeID: routeId }),
    enabled: !!tripDate && !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information for a specific terminal pair and date.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing trip date and terminal IDs
 * @returns React Query result containing Schedule data
 */
export const useScheduleByTerminals = (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () => getScheduleByTerminals(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalID &&
      !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get today's schedule for
 * @returns React Query result containing Schedule data
 */
export const useScheduleTodayByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "schedules", "todayByRoute", routeId],
    queryFn: () => getScheduleTodayByRoute({ routeID: routeId }),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific terminal pair.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing terminal IDs
 * @returns React Query result containing Schedule data
 */
export const useScheduleTodayByTerminals = (params: {
  departingTerminalID: number;
  arrivingTerminalID: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "todayByTerminals",
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    enabled: !!params.departingTerminalID && !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching sailings from WSF Schedule API
 *
 * Retrieves sailing information for a specific scheduled route.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
export const useSailings = (schedRouteID: number) => {
  return useQuery({
    queryKey: ["schedule", "sailings", schedRouteID],
    queryFn: () => getSailings({ schedRouteID }),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailing information for a specific scheduled route and year.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @param year - The year to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
export const useAllSailings = (schedRouteID: number, year: number) => {
  return useQuery({
    queryKey: ["schedule", "allSailings", schedRouteID, year],
    queryFn: () => getAllSailings({ schedRouteID, year }),
    enabled: !!schedRouteID && !!year,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// TERMINALS HOOKS
// ============================================================================

/**
 * Hook for fetching all terminals from WSF Schedule API
 *
 * Retrieves terminal information for schedule-related operations.
 * This data is updated infrequently and provides static terminal
 * information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal information
 * @returns React Query result with ScheduleTerminal array data
 */
export const useTerminals = (tripDate: Date) => {
  return useQuery({
    queryKey: ["schedule", "terminals", tripDate.toISOString().split("T")[0]],
    queryFn: () => getTerminals(tripDate),
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminals by route from WSF Schedule API
 *
 * Retrieves terminal information for a specific route.
 * This data is updated infrequently and provides static terminal
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get terminals for
 * @returns React Query result with ScheduleTerminal array data
 */
export const useTerminalsByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "terminals", "byRoute", routeId],
    queryFn: () => getTerminalsByRoute(routeId),
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves terminal combinations for schedule-related operations.
 * This data is updated infrequently and provides static terminal
 * pairing information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal combinations
 * @returns React Query result with ScheduleTerminal array data
 */
export const useTerminalsAndMates = (tripDate: Date) => {
  return useQuery({
    queryKey: [
      "schedule",
      "terminals",
      "andMates",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getTerminalsAndMates(tripDate),
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal mates from WSF Schedule API
 *
 * Retrieves terminal mate information for a specific terminal.
 * This data is updated infrequently and provides static terminal
 * pairing information used in scheduling contexts.
 *
 * @param tripDate - The date for which to get terminal mates
 * @param terminalId - The departing terminal ID
 * @returns React Query result with ScheduleTerminal array data
 */
export const useTerminalMates = (tripDate: Date, terminalId: number) => {
  return useQuery({
    queryKey: [
      "schedule",
      "terminals",
      "mates",
      tripDate.toISOString().split("T")[0],
      terminalId,
    ],
    queryFn: () => getTerminalMates(tripDate, terminalId),
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// VESSELS HOOKS
// ============================================================================

/**
 * Hook for fetching all vessels from WSF Schedule API
 *
 * Retrieves vessel information for schedule-related operations.
 * This data is updated infrequently and provides static vessel
 * information used in scheduling contexts.
 *
 * @returns React Query result containing an array of Vessel objects
 */
export const useVessels = () => {
  return useQuery({
    queryKey: ["schedule", "vessels"],
    queryFn: getVessels,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessels by route from WSF Schedule API
 *
 * Retrieves vessel information for a specific route.
 * This data is updated infrequently and provides static vessel
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get vessels for
 * @returns React Query result containing an array of Vessel objects
 */
export const useVesselsByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "vessels", "byRoute", routeId],
    queryFn: () => getVesselsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// TIME ADJUSTMENTS HOOKS
// ============================================================================

/**
 * Hook for fetching all time adjustments from WSF Schedule API
 *
 * Retrieves time adjustment information for schedule operations.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduling contexts.
 *
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustments = () => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments"],
    queryFn: getTimeAdjustments,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching time adjustments by route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific route.
 * This data is updated infrequently and provides static time
 * adjustment information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustmentsByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "byRoute", routeId],
    queryFn: () => getTimeAdjustmentsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific scheduled route.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustmentsBySchedRoute = (schedRouteID: number) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "bySchedRoute", schedRouteID],
    queryFn: () => getTimeAdjustmentsBySchedRoute(schedRouteID),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// VALID DATE RANGE HOOKS
// ============================================================================

/**
 * Hook for fetching valid date range from WSF API
 *
 * Retrieves the valid date range for all WSF API operations.
 * This data is updated infrequently and provides static date
 * range information used to determine which dates are supported by the API.
 *
 * @returns React Query result with ValidDateRange object
 */
export const useValidDateRange = () => {
  return useQuery({
    queryKey: ["schedule", "validDateRange"],
    queryFn: getValidDateRange,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook for fetching cache flush date from WSF Schedule API with React Query
 *
 * Retrieves the last cache flush date for the Schedule API, which indicates
 * when the underlying data was last updated on the server. This hook is used
 * to determine when to invalidate cached schedule data.
 *
 * The cache flush date changes when any schedule-related data is updated,
 * including routes, schedules, terminals, vessels, time adjustments, and alerts.
 *
 * @returns React Query result with ScheduleCacheFlushDate data
 */
export const useCacheFlushDateSchedule = () => {
  return useQuery({
    queryKey: ["schedule", "cacheFlushDate"],
    queryFn: getCacheFlushDateSchedule,
    ...createCacheFlushOptions(),
  });
};
