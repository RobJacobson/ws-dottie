/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalBasics input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicsInputSchema = z
  .object({})
  .describe("Input parameters for retrieving basic terminal information.");

export type TerminalBasicsInput = z.infer<typeof terminalBasicsInputSchema>;

/**
 * Schema for TerminalBasicsById input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicsByIdInputSchema = z
  .object({
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving basic information for a specific terminal."
  );

export type TerminalBasicsByIdInput = z.infer<
  typeof terminalBasicsByIdInputSchema
>;
