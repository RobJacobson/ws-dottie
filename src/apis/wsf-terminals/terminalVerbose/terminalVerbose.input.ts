/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalVerbose input parameters
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /terminalbasics, /terminalbulletins, /terminallocations, /terminaltransports, /terminalwaittimes.
 */
export const terminalVerboseSchema = z
  .object({})
  .describe(
    'This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don\'t mind receiving a larger payload of data. TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.'
  );

export type TerminalVerboseInput = z.infer<typeof terminalVerboseSchema>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /terminalbasics, /terminalbulletins, /terminallocations, /terminaltransports, /terminalwaittimes.
 */
export const terminalVerboseByIdSchema = z
  .object({
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    'This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don\'t mind receiving a larger payload of data. TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.'
  );

export type TerminalVerboseByIdInput = z.infer<
  typeof terminalVerboseByIdSchema
>;
