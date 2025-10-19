/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalWaitTimes input parameters
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimesSchema = z
  .object({})
  .describe(
    "This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesSchema>;

/**
 * Schema for TerminalWaitTimesById input parameters
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimesByIdSchema = z
  .object({
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalWaitTimesByIdInput = z.infer<
  typeof terminalWaitTimesByIdSchema
>;
