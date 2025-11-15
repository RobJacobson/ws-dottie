/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TerminalSailingSpace input parameters
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 *
 * **⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.
 */
export const terminalSailingSpaceInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving terminal sailing space availability."
  );

export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInputSchema
>;

/**
 * Schema for TerminalSailingSpaceById input parameters
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 *
 * **⚠️ Important:** This data changes very frequently (potentially every 5 seconds). Please do not cache results in your application for an extended period of time.
 */
export const terminalSailingSpaceByTerminalIdInputSchema = z
  .object({
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
  })
  .describe(
    "Input parameters for retrieving sailing space availability for a specific terminal."
  );

export type TerminalSailingSpaceByTerminalIdInput = z.infer<
  typeof terminalSailingSpaceByTerminalIdInputSchema
>;
