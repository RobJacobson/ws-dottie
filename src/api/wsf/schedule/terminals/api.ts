// Schedule terminals API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { TerminalBasics as ScheduleTerminal } from "../../terminals/types";

/**
 * API function for fetching all terminals from WSF Schedule API
 *
 * Retrieves all valid departing terminals for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal information
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminals = (tripDate: Date): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminals/{tripDate}", { tripDate })
  );

/**
 * API function for fetching terminals by route from WSF Schedule API
 *
 * Retrieves all terminal combinations for a specific route.
 *
 * @param routeId - The route ID to get terminals for
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalsByRoute = (
  routeId: number
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalsandmatesbyroute/{routeId}", { routeId })
  );

/**
 * API function for fetching terminals and mates from WSF Schedule API
 *
 * Retrieves all terminal combinations (departing and arriving) for a specific trip date.
 *
 * @param tripDate - The date for which to get terminal combinations
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalsAndMates = (
  tripDate: Date
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalsandmates/{tripDate}", { tripDate })
  );

/**
 * API function for fetching terminal mates from WSF Schedule API
 *
 * Retrieves all arriving terminals for a specific departing terminal on a given date.
 *
 * @param tripDate - The date for which to get terminal mates
 * @param terminalId - The departing terminal ID
 * @returns Promise resolving to an array of ScheduleTerminal objects
 */
export const getTerminalMates = (
  tripDate: Date,
  terminalId: number
): Promise<ScheduleTerminal[]> =>
  fetchWsfArray<ScheduleTerminal>(
    "schedule",
    buildWsfUrl("/terminalmates/{tripDate}/{terminalId}", {
      tripDate,
      terminalId,
    })
  );
