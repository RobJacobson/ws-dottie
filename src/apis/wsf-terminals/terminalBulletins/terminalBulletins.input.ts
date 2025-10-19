/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalBulletins input parameters
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBulletinsSchema = z
  .object({})
  .describe(
    "This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalBulletinsInput = z.infer<typeof terminalBulletinsSchema>;

/**
 * Schema for TerminalBulletinsById input parameters
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBulletinsByIdSchema = z
  .object({
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalBulletinsByIdInput = z.infer<
  typeof terminalBulletinsByIdSchema
>;
