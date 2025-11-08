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
    "Retrieves comprehensive terminal information combining data from terminalBasics, terminalBulletins, terminalLocations, terminalTransports, and terminalWaitTimes endpoints. Returns all terminals or specific terminal if TerminalID is provided. Use when you need to reduce API calls and don't mind larger payloads. Contains terminal identification, amenities, bulletins, locations, transportation info, sailing space, wait times, and additional terminal details."
  );

export type TerminalVerboseInput = z.infer<typeof terminalVerboseInputSchema>;

/**
 * Schema for TerminalVerboseById input parameters
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /terminalbasics, /terminalbulletins, /terminallocations, /terminaltransports, /terminalwaittimes.
 */
export const terminalVerboseByTerminalIdInputSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for comprehensive information lookup."
      ),
  })
  .describe(
    "Retrieves comprehensive terminal information for specified terminal combining data from terminalBasics, terminalBulletins, terminalLocations, terminalTransports, and terminalWaitTimes endpoints. Use GetTerminalBasics to find valid terminal IDs. Use when you need to reduce API calls and don't mind larger payloads. Contains terminal identification, amenities, bulletins, locations, transportation info, sailing space, wait times, and additional terminal details."
  );

export type TerminalVerboseByTerminalIdInput = z.infer<
  typeof terminalVerboseByTerminalIdInputSchema
>;
