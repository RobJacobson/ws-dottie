/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for TerminalSailingSpace input parameters
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 *
 * **⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.
 */
export const terminalSailingSpaceSchema = z
  .object({})
  .describe(
    "Retrieves real-time terminal condition data including drive-up and reservation spaces available for upcoming departures, vessel information, and cancellation status. Data changes frequently (potentially every 5 seconds). Returns all terminals or specific terminal if TerminalID is provided. Use for real-time space availability display. Do not cache results for extended periods."
  );

export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceSchema
>;

/**
 * Schema for TerminalSailingSpaceById input parameters
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 *
 * **⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.
 */
export const terminalSailingSpaceByIdSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalBasics to retrieve valid terminal IDs. Used to identify specific terminal for sailing space lookup."
      ),
  })
  .describe(
    "Retrieves real-time terminal condition data for specified terminal including drive-up and reservation spaces available for upcoming departures, vessel information, and cancellation status. Data changes frequently (potentially every 5 seconds). Use GetTerminalBasics to find valid terminal IDs. Use for terminal-specific real-time space availability display. Do not cache results for extended periods."
  );

export type TerminalSailingSpaceByIdInput = z.infer<
  typeof terminalSailingSpaceByIdSchema
>;
