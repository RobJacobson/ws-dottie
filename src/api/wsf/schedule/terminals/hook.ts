// Schedule terminals hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { TerminalBasics as ScheduleTerminal } from "../../terminals/types";
import {
  getTerminalMates,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsByRoute,
} from "./api";

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
