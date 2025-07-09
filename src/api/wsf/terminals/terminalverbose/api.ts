// Terminal verbose API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";
import type { TerminalVerbose } from "../types";

// Main API functions
/**
 * API function for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive terminal information
 */
export const getTerminalVerbose = (): Promise<TerminalVerbose[]> =>
  fetchWsfArray<TerminalVerbose>("terminals", "/terminalverbose");

/**
 * API function for fetching terminal verbose data for a specific terminal from WSF Terminals API
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
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive information for the specified terminal
 */
export const getTerminalVerboseById = (
  terminalId: number
): Promise<TerminalVerbose[]> =>
  fetchWsfArray<TerminalVerbose>(
    "terminals",
    buildWsfUrl("/terminalverbose/{terminalId}", { terminalId })
  );
