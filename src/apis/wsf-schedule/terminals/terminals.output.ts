/**
 * @fileoverview WSF Schedule API Output Schemas for Terminals
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API terminal operations.
 */

import { z } from "zod";

/**
 * Schema for Terminal - represents terminal information
 */
export const terminalSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().nullable().describe("The name of the terminal."),
});

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Schema for TerminalMate - represents terminal mate information
 */
export const terminalMateSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingDescription: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingDescription: z
    .string()
    .describe("The name of the arriving terminal."),
});

export type TerminalMate = z.infer<typeof terminalMateSchema>;

/**
 * Terminal Mates List Schema - represents an list of terminal mates
 */
export const terminalMatesListSchema = z
  .array(terminalMateSchema)
  .describe(
    "This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalMateList = z.infer<typeof terminalMatesListSchema>;
