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
    "Retrieves transportation and commuter information for terminals including parking details, vehicle-specific tips (motorcycle, truck, bike), airport information, transit links, and HOV/carpool information. Returns all terminals or specific terminal if TerminalID is provided. Use for terminal commuter information and transportation planning."
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
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for transportation information lookup."
      ),
  })
  .describe(
    "Retrieves transportation and commuter information for specified terminal including parking details, vehicle-specific tips (motorcycle, truck, bike), airport information, transit links, and HOV/carpool information. Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific commuter information and transportation planning."
  );

export type TerminalTransportsByTerminalIdInput = z.infer<
  typeof terminalTransportsByTerminalIdInputSchema
>;
