/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalLocations input parameters
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationsInputSchema = z
  .object({})
  .describe(
    "Retrieves detailed location information for terminals including addresses, coordinates, map links, driving directions, and GIS zoom level locations. Returns all terminals or specific terminal if TerminalID is provided. Use for terminal location mapping and navigation."
  );

export type TerminalLocationsInput = z.infer<
  typeof terminalLocationsInputSchema
>;

/**
 * Schema for TerminalLocationsById input parameters
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationsByIdInputSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for location lookup."
      ),
  })
  .describe(
    "Retrieves detailed location information for specified terminal including address, coordinates, map link, driving directions, and GIS zoom level locations. Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific location mapping and navigation."
  );

export type TerminalLocationsByIdInput = z.infer<
  typeof terminalLocationsByIdInputSchema
>;
