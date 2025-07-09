// Terminal Basics API functions

import { fetchWsfArray } from "@/shared/fetching/fetch";

import type { TerminalBasics } from "../types";

/**
 * API function for fetching all terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information pertaining to terminals.
 * This includes location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @returns Promise resolving to an array of TerminalBasics objects containing basic terminal information
 */
export const getTerminalBasics = (): Promise<TerminalBasics[]> =>
  fetchWsfArray<TerminalBasics>("terminals", "/terminalbasics");

/**
 * API function for fetching specific terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns Promise resolving to an array of TerminalBasics objects containing basic information for the specified terminal
 */
export const getTerminalBasicsByTerminalId = (
  terminalId: number
): Promise<TerminalBasics[]> =>
  fetchWsfArray<TerminalBasics>("terminals", `/terminalbasics/${terminalId}`);
