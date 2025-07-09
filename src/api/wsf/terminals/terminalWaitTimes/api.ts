// Terminal Wait Times API functions

import { fetchWsfArray } from "@/shared/fetching/fetch";

import type { TerminalWaitTime } from "../types";

/**
 * API function for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves current wait time information for all terminals including
 * estimated wait times, queue lengths, and congestion data. This endpoint
 * provides real-time information about terminal congestion and wait times
 * for all WSF terminals.
 *
 * @returns Promise resolving to an array of TerminalWaitTime objects containing wait time information
 */
export const getTerminalWaitTimes = (): Promise<TerminalWaitTime[]> =>
  fetchWsfArray<TerminalWaitTime>("terminals", "/terminalwaittimes");

/**
 * API function for fetching terminal wait times by route from WSF Terminals API
 *
 * Retrieves current wait time information for terminals on a specific route,
 * including estimated wait times, queue lengths, and congestion data. This
 * endpoint filters the resultset to terminals associated with the specified
 * route, providing real-time information about terminal congestion and wait
 * times for that route.
 *
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to an array of TerminalWaitTime objects containing wait time information for terminals on the specified route
 */
export const getTerminalWaitTimesByRoute = (
  routeId: number
): Promise<TerminalWaitTime[]> =>
  fetchWsfArray<TerminalWaitTime>("terminals", `/terminalwaittimes/${routeId}`);

/**
 * API function for fetching terminal wait times by terminal from WSF Terminals API
 *
 * Retrieves current wait time information for a specific terminal identified
 * by terminal ID, including estimated wait times, queue lengths, and congestion
 * data. This endpoint filters the resultset to a single terminal, providing
 * real-time information about terminal congestion and wait times for that
 * specific terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to an array of TerminalWaitTime objects containing wait time information for the specified terminal
 */
export const getTerminalWaitTimesByTerminal = (
  terminalId: number
): Promise<TerminalWaitTime[]> =>
  fetchWsfArray<TerminalWaitTime>(
    "terminals",
    `/terminalwaittimes/${terminalId}`
  );

/**
 * API function for fetching terminal wait times by route and terminal from WSF Terminals API
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
 * @returns Promise resolving to an array of TerminalWaitTime objects containing wait time information for the specified terminal on the specified route
 */
export const getTerminalWaitTimesByRouteAndTerminal = (params: {
  routeId: number;
  terminalId: number;
}): Promise<TerminalWaitTime[]> =>
  fetchWsfArray<TerminalWaitTime>(
    "terminals",
    `/terminalwaittimes/${params.routeId}/${params.terminalId}`
  );
