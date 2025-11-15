/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalBulletins input parameters
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBulletinsInputSchema = z
  .object({})
  .describe("Input parameters for retrieving terminal bulletins and alerts.");

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
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving bulletins and alerts for a specific terminal."
  );

export type TerminalBulletinsByIdInput = z.infer<
  typeof terminalBulletinsByIdInputSchema
>;
