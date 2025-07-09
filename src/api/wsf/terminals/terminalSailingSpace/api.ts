// Terminal sailing space API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";

import type { TerminalSailingSpace } from "../types";

// Main API functions
/**
 * API function for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information
 */
export const getTerminalSailingSpace = (): Promise<TerminalSailingSpace[]> =>
  fetchWsfArray<TerminalSailingSpace>("terminals", "/terminalsailingspace");

/**
 * API function for fetching terminal sailing space data for a specific terminal from WSF Terminals API
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
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information for the specified terminal
 */
export const getTerminalSailingSpaceByTerminalId = (
  terminalId: number
): Promise<TerminalSailingSpace[]> =>
  fetchWsfArray<TerminalSailingSpace>(
    "terminals",
    buildWsfUrl("/terminalsailingspace/{terminalId}", { terminalId })
  );

/**
 * API function for fetching terminal sailing space data by route from WSF Terminals API
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
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information for terminals on the specified route
 */
export const getTerminalSailingSpaceByRoute = (
  routeId: number
): Promise<TerminalSailingSpace[]> =>
  fetchWsfArray<TerminalSailingSpace>(
    "terminals",
    buildWsfUrl("/terminalsailingspace/route/{routeId}", { routeId })
  );

/**
 * API function for fetching terminal sailing space data by terminal and route from WSF Terminals API
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
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information for the specified terminal on the specified route
 */
export const getTerminalSailingSpaceByTerminalAndRoute = (params: {
  terminalId: number;
  routeId: number;
}): Promise<TerminalSailingSpace[]> =>
  fetchWsfArray<TerminalSailingSpace>(
    "terminals",
    buildWsfUrl(
      "/terminalsailingspace/terminal/{terminalId}/route/{routeId}",
      params
    )
  );
