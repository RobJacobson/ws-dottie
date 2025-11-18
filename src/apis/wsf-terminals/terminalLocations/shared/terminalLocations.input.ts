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
  .describe("Input parameters for retrieving terminal location information.");

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
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving location information for a specific terminal."
  );

export type TerminalLocationsByIdInput = z.infer<
  typeof terminalLocationsByIdInputSchema
>;
