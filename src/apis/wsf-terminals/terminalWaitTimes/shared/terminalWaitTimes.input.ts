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
  .describe("Input parameters for retrieving terminal wait time information.");

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
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving wait time information for a specific terminal."
  );

export type TerminalWaitTimesByIdInput = z.infer<
  typeof terminalWaitTimesByIdInputSchema
>;
