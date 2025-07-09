// Schedule Routes hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import type { Route } from "../types";
import {
  getActiveSeasons,
  getAlerts,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
} from "./api";

// Main hooks
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
 * @returns React Query result containing an array of Route objects with active season information
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
 * @returns React Query result containing an array of Route objects with alert information
 */
export const useAlerts = () => {
  return useQuery({
    queryKey: ["schedule", "alerts"],
    queryFn: getAlerts,
    ...createInfrequentUpdateOptions(),
  });
};
