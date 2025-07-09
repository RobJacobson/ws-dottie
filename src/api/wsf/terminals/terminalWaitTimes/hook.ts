// Terminal wait times hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import type { TerminalWaitTime } from "../types";
import {
  getTerminalWaitTimes,
  getTerminalWaitTimesByRoute,
  getTerminalWaitTimesByRouteAndTerminal,
  getTerminalWaitTimesByTerminal,
} from "./api";

// Main hooks
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
