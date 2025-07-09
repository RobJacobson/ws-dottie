// Schedule Routes API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";

import type { Route } from "../types";

// Main API functions
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
