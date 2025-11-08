/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalWaitTimes input parameters
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimesInputSchema = z
  .object({})
  .describe(
    "Retrieves wait time conditions and tips for vehicles and walk-on passengers including wait time notes, IVR notes, route information, and update dates. Returns all terminals or specific terminal if TerminalID is provided. Use for terminal wait time information and passenger guidance."
  );

export type TerminalWaitTimesInput = z.infer<
  typeof terminalWaitTimesInputSchema
>;

/**
 * Schema for TerminalWaitTimesById input parameters
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimesByIdInputSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for wait time lookup."
      ),
  })
  .describe(
    "Retrieves wait time conditions and tips for specified terminal including wait time notes, IVR notes, route information, and update dates. Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific wait time information and passenger guidance."
  );

export type TerminalWaitTimesByIdInput = z.infer<
  typeof terminalWaitTimesByIdInputSchema
>;
