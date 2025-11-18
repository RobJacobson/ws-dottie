/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../../shared/terminalBaseSchema";

/**
 * TerminalBasicDetail schema
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicSchema = terminalBaseSchema
  .extend({
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "True if overhead passenger loading facility is available; otherwise false."
      ),
    Elevator: z
      .boolean()
      .describe("True if terminal has elevator access; otherwise false."),
    WaitingRoom: z
      .boolean()
      .describe("True if terminal has waiting room facility; otherwise false."),
    FoodService: z
      .boolean()
      .describe("True if terminal offers food service; otherwise false."),
    Restroom: z
      .boolean()
      .describe("True if terminal has restroom facilities; otherwise false."),
  })
  .describe(
    "Basic terminal information including identification, amenities, and regional assignments."
  );

export type TerminalBasic = z.infer<typeof terminalBasicSchema>;

/**
 * GetAllTerminalBasicDetails schema
 *
 * Returns all terminal basic details.
 */
export const getAllTerminalBasicSchema = z
  .array(terminalBasicSchema)
  .describe("Array of basic terminal information for all terminals.");

export type GetAllTerminalBasic = z.infer<typeof getAllTerminalBasicSchema>;

/**
 * GetSpecificTerminalBasicDetail schema
 *
 * Returns basic details for a specific terminal.
 */
export const getSpecificTerminalBasicSchema = terminalBasicSchema;

export type GetSpecificTerminalBasic = z.infer<
  typeof getSpecificTerminalBasicSchema
>;
