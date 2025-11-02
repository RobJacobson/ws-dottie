/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalBasics input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicsSchema = z
  .object({})
  .describe(
    "Retrieves basic terminal information including terminal IDs, names, abbreviations, amenities (overhead passenger loading, elevator, waiting room, food service, restrooms), and sort order. Returns all terminals or specific terminal if TerminalID is provided. Use for terminal discovery and basic terminal information display."
  );

export type TerminalBasicsInput = z.infer<typeof terminalBasicsSchema>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicsByIdSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for basic information lookup."
      ),
  })
  .describe(
    "Retrieves basic terminal information for specified terminal including terminal ID, name, abbreviation, amenities (overhead passenger loading, elevator, waiting room, food service, restrooms), and sort order. Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific basic information display."
  );

export type TerminalBasicsByIdInput = z.infer<typeof terminalBasicsByIdSchema>;
