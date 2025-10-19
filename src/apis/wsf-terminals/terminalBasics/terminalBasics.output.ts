/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * TerminalBasicDetail schema
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicSchema = terminalBaseSchema.extend({
  /**
   * Indicates whether or not overhead passenger loading is available.
   */
  OverheadPassengerLoading: z
    .boolean()
    .describe(
      "Indicates whether or not overhead passenger loading is available."
    ),
  /**
   * Indicates whether or not the terminal has an elevator.
   */
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the terminal has an elevator."),
  /**
   * Indicates whether or not the terminal has a waiting room.
   */
  WaitingRoom: z
    .boolean()
    .describe("Indicates whether or not the terminal has a waiting room."),
  /**
   * Indicates whether or not the terminal offers food service.
   */
  FoodService: z
    .boolean()
    .describe("Indicates whether or not the terminal offers food service."),
  /**
   * Indicates whether or not the terminal has one or more restrooms.
   */
  Restroom: z
    .boolean()
    .describe(
      "Indicates whether or not the terminal has one or more restrooms."
    ),
});

export type TerminalBasic = z.infer<typeof terminalBasicSchema>;

/**
 * GetAllTerminalBasicDetails schema
 *
 * Returns all terminal basic details.
 */
export const getAllTerminalBasicSchema = z
  .array(terminalBasicSchema)
  .describe(
    "This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

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
