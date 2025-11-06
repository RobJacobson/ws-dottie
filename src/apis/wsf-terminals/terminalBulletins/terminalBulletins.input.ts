/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for TerminalBulletins input parameters
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBulletinsInputSchema = z
  .object({})
  .describe(
    "Retrieves alerts and bulletins associated with terminals including bulletin titles, content, update dates, and sort order. Each terminal may have zero or more bulletins. Returns all terminals with their bulletins or specific terminal if TerminalID is provided. Use for terminal alert and bulletin display."
  );

export type TerminalBulletinsInput = z.infer<
  typeof terminalBulletinsInputSchema
>;

/**
 * Schema for TerminalBulletinsById input parameters
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBulletinsByIdInputSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for bulletin lookup."
      ),
  })
  .describe(
    "Retrieves alerts and bulletins for specified terminal including bulletin titles, content, update dates, and sort order. Each terminal may have zero or more bulletins. Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific alert and bulletin display."
  );

export type TerminalBulletinsByIdInput = z.infer<
  typeof terminalBulletinsByIdInputSchema
>;
