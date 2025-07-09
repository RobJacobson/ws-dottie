// Terminal locations hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import type { TerminalLocation } from "../types";
import { getTerminalLocations, getTerminalLocationsByTerminalId } from "./api";

// Main hooks
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
