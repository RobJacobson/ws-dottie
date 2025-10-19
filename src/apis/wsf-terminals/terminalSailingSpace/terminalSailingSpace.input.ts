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
    "This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
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
    /** Unique identifier for a terminal. */
    TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type TerminalSailingSpaceByIdInput = z.infer<
  typeof terminalSailingSpaceByIdSchema
>;
