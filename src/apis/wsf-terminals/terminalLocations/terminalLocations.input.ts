/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalLocations input parameters
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationsSchema = z
  .object({})
  .describe(
    "This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalLocationsInput = z.infer<typeof terminalLocationsSchema>;

/**
 * Schema for TerminalLocationsById input parameters
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationsByIdSchema = z
  .object({
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalLocationsByIdInput = z.infer<
  typeof terminalLocationsByIdSchema
>;
