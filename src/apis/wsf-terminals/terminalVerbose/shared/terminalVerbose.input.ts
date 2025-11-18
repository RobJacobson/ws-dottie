/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalVerbose input parameters
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /terminalbasics, /terminalbulletins, /terminallocations, /terminaltransports, /terminalwaittimes.
 */
export const terminalVerboseInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving comprehensive terminal information."
  );

export type TerminalVerboseInput = z.infer<typeof terminalVerboseInputSchema>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /terminalbasics, /terminalbulletins, /terminallocations, /terminaltransports, /terminalwaittimes.
 */
export const terminalVerboseByTerminalIdInputSchema = z
  .object({
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving comprehensive information for a specific terminal."
  );

export type TerminalVerboseByTerminalIdInput = z.infer<
  typeof terminalVerboseByTerminalIdInputSchema
>;
