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
    "This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalBasicsInput = z.infer<typeof terminalBasicsSchema>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicsByIdSchema = z
  .object({
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalBasicsByIdInput = z.infer<typeof terminalBasicsByIdSchema>;
