// Terminal verbose hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { TerminalVerbose } from "../types";
import { getTerminalVerbose, getTerminalVerboseById } from "./api";

// Main hooks
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
export const useTerminalVerboseById = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "verbose", "byId", terminalId],
    queryFn: () => getTerminalVerboseById(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};
