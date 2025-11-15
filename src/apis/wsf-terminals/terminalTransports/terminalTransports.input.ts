/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalTransports input parameters
 *
 * This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalTransportsInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving terminal transportation information."
  );

export type TerminalTransportsInput = z.infer<
  typeof terminalTransportsInputSchema
>;

/**
 * Schema for TerminalTransportsById input parameters
 *
 * This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalTransportsByTerminalIdInputSchema = z
  .object({
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving transportation information for a specific terminal."
  );

export type TerminalTransportsByTerminalIdInput = z.infer<
  typeof terminalTransportsByTerminalIdInputSchema
>;
