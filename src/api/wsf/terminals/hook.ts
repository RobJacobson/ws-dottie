// WSF Terminals hooks

import { useQuery } from "@tanstack/react-query";

import {
  createCacheFlushOptions,
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
} from "@/shared/caching/config";

import {
  // Cache Flush Date API functions
  getCacheFlushDateTerminals,
  // Terminal Basics API functions
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  // Terminal Locations API functions
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  // Terminal Sailing Space API functions
  getTerminalSailingSpace,
  getTerminalSailingSpaceByRoute,
  getTerminalSailingSpaceByTerminalAndRoute,
  getTerminalSailingSpaceByTerminalId,
  // Terminal Verbose API functions
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  // Terminal Wait Times API functions
  getTerminalWaitTimes,
  getTerminalWaitTimesByRoute,
  getTerminalWaitTimesByRouteAndTerminal,
  getTerminalWaitTimesByTerminal,
} from "./api";
import type {
  TerminalBasics,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalsCacheFlushDate,
  TerminalVerbose,
  TerminalWaitTime,
} from "./types";

// ============================================================================
// TERMINAL BASICS HOOKS
// ============================================================================

/**
 * React Query hook for fetching all terminal basics
 *
 * @returns Query result containing array of TerminalBasics objects
 */
export const useTerminalBasics = () => {
  return useQuery({
    queryKey: ["terminals", "basics"],
    queryFn: getTerminalBasics,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * React Query hook for fetching specific terminal basics by terminal ID
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns Query result containing TerminalBasics object for the specified terminal
 */
export const useTerminalBasicsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "basics", "byTerminalId", terminalId],
    queryFn: () => getTerminalBasicsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// TERMINAL LOCATIONS HOOKS
// ============================================================================

/**
 * Hook for fetching terminal locations from WSF Terminals API
 *
 * Retrieves location information for all terminals including coordinates,
 * addresses, and geographic data. This endpoint provides the physical
 * location details for all WSF terminals.
 *
 * This data is updated infrequently and provides static terminal location
 * information that doesn't change often, such as terminal coordinates and addresses.
 *
 * @returns React Query result containing an array of TerminalLocation objects with terminal location information
 */
export const useTerminalLocations = () => {
  return useQuery({
    queryKey: ["terminals", "locations"],
    queryFn: getTerminalLocations,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * This data is updated infrequently and provides static terminal location
 * information that doesn't change often, such as terminal coordinates and addresses.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalLocation objects with location information for the specified terminal
 */
export const useTerminalLocationsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "locations", "byTerminalId", terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// TERMINAL SAILING SPACE HOOKS
// ============================================================================

/**
 * Hook for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information
 */
export const useTerminalSailingSpace = () => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace"],
    queryFn: getTerminalSailingSpace,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal sailing space data for a specific terminal from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal identified by terminal ID,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal, providing real-time information about space availability, current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for the specified terminal
 */
export const useTerminalSailingSpaceByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byTerminalId", terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal sailing space data by route from WSF Terminals API
 *
 * Retrieves current space availability information for terminals on a specific route,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to terminals associated with the specified route, providing real-time information about
 * space availability, current vehicle capacity, estimated wait times, and space status
 * for upcoming sailings on that route.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param routeId - The unique identifier for the route
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for terminals on the specified route
 */
export const useTerminalSailingSpaceByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byRoute", routeId],
    queryFn: () => getTerminalSailingSpaceByRoute(routeId),
    enabled: !!routeId,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal sailing space data by terminal and route from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal on a specific route,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal on a specific route, providing real-time information about space availability,
 * current vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param params - Object containing terminal and route information
 * @param params.terminalId - The unique identifier for the terminal
 * @param params.routeId - The unique identifier for the route
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for the specified terminal on the specified route
 */
export const useTerminalSailingSpaceByTerminalAndRoute = (params: {
  terminalId: number;
  routeId: number;
}) => {
  return useQuery({
    queryKey: [
      "terminals",
      "sailingSpace",
      "byTerminalAndRoute",
      params.terminalId,
      params.routeId,
    ],
    queryFn: () => getTerminalSailingSpaceByTerminalAndRoute(params),
    enabled: !!(params.terminalId && params.routeId),
    ...createFrequentUpdateOptions(),
  });
};

// ============================================================================
// TERMINAL WAIT TIMES HOOKS
// ============================================================================

/**
 * Hook for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves current wait time information for all terminals including
 * estimated wait times, queue lengths, and congestion data. This endpoint
 * provides real-time information about terminal congestion and wait times
 * for all WSF terminals.
 *
 * @returns React Query result containing an array of TerminalWaitTime objects with wait time information
 */
export const useTerminalWaitTimes = () => {
  return useQuery({
    queryKey: ["terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal wait times by route from WSF Terminals API
 *
 * Retrieves current wait time information for terminals on a specific route,
 * including estimated wait times, queue lengths, and congestion data. This
 * endpoint filters the resultset to terminals associated with the specified
 * route, providing real-time information about terminal congestion and wait
 * times for that route.
 *
 * @param routeId - The unique identifier for the route
 * @returns React Query result containing an array of TerminalWaitTime objects with wait time information for terminals on the specified route
 */
export const useTerminalWaitTimesByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["terminals", "waitTimes", "byRoute", routeId],
    queryFn: () => getTerminalWaitTimesByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal wait times by terminal from WSF Terminals API
 *
 * Retrieves current wait time information for a specific terminal identified
 * by terminal ID, including estimated wait times, queue lengths, and congestion
 * data. This endpoint filters the resultset to a single terminal, providing
 * real-time information about terminal congestion and wait times for that
 * specific terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalWaitTime objects with wait time information for the specified terminal
 */
export const useTerminalWaitTimesByTerminal = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "waitTimes", "byTerminal", terminalId],
    queryFn: () => getTerminalWaitTimesByTerminal(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal wait times by route and terminal from WSF Terminals API
 *
 * Retrieves current wait time information for a specific terminal on a specific
 * route, including estimated wait times, queue lengths, and congestion data.
 * This endpoint filters the resultset to a single terminal on a specific route,
 * providing real-time information about terminal congestion and wait times for
 * that specific terminal-route combination.
 *
 * @param params - Object containing route and terminal information
 * @param params.routeId - The unique identifier for the route
 * @param params.terminalId - The unique identifier for the terminal
 * @returns React Query result containing an array of TerminalWaitTime objects with wait time information for the specified terminal on the specified route
 */
export const useTerminalWaitTimesByRouteAndTerminal = (params: {
  routeId: number;
  terminalId: number;
}) => {
  return useQuery({
    queryKey: [
      "terminals",
      "waitTimes",
      "byRouteAndTerminal",
      params.routeId,
      params.terminalId,
    ],
    queryFn: () => getTerminalWaitTimesByRouteAndTerminal(params),
    enabled: !!(params.routeId && params.terminalId),
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// TERMINAL VERBOSE HOOKS
// ============================================================================

/**
 * Hook for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive terminal information
 */
export const useTerminalVerbose = () => {
  return useQuery({
    queryKey: ["terminals", "verbose"],
    queryFn: getTerminalVerbose,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including location, facilities, parking information, and operational status. This endpoint
 * filters the resultset to a single terminal, providing detailed information about terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive information for the specified terminal
 */
export const useTerminalVerboseByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "verbose", "byTerminalId", terminalId],
    queryFn: () => getTerminalVerboseByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook function for fetching cache flush date from WSF Terminals API with React Query
 */
export const useCacheFlushDateTerminals = () =>
  useQuery({
    queryKey: ["terminals", "cacheFlushDate"],
    queryFn: getCacheFlushDateTerminals,
    ...createCacheFlushOptions(),
  });
