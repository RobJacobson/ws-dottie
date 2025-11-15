/**
 * @fileoverview WSF Schedule API Output Schemas for Terminals
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API terminal operations.
 */

import type {
  Terminal as SharedTerminal,
  TerminalList as SharedTerminalList,
} from "@/apis/shared/terminals.output";
import {
  terminalSchema as sharedTerminalSchema,
  terminalListSchema,
} from "@/apis/shared/terminals.output";
import { z } from "@/shared/zod";

export const terminalSchema = sharedTerminalSchema;

export type Terminal = SharedTerminal;

/**
 * Schema for TerminalMate - represents terminal mate information
 */
export const terminalMateSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    DepartingDescription: z
      .string()
      .describe("Display name of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
    ArrivingDescription: z
      .string()
      .describe("Display name of the arriving terminal."),
  })
  .describe(
    "Terminal pair representing a valid departure and arrival terminal combination for schedule queries."
  );

export type TerminalMate = z.infer<typeof terminalMateSchema>;

/**
 * Terminal Mates List Schema - represents an list of terminal mates
 */
export const terminalMatesListSchema = z
  .array(terminalMateSchema)
  .describe("Array of terminal pair records.");

export type TerminalMateList = z.infer<typeof terminalMatesListSchema>;

export const terminalsListSchema = terminalListSchema;
export type TerminalsList = SharedTerminalList;
