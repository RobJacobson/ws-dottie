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
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal. Used as primary key for terminal identification in terminal mate pairing."
      ),
    DepartingDescription: z
      .string()
      .describe(
        "Human-readable name of departing terminal, as a terminal name. E.g., 'Anacortes' for terminal 1. Provides origin terminal identification for terminal mate display."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal, '15' for Orcas Island terminal. Used as primary key for terminal identification in terminal mate pairing."
      ),
    ArrivingDescription: z
      .string()
      .describe(
        "Human-readable name of arriving terminal, as a terminal name. E.g., 'Friday Harbor' for terminal 10, 'Lopez Island' for terminal 13, 'Orcas Island' for terminal 15. Provides destination terminal identification for terminal mate display."
      ),
  })
  .describe(
    "Represents terminal mate pairing including departing and arriving terminal IDs and names. E.g., Anacortes (ID 1) to Friday Harbor (ID 10). Used for identifying valid terminal combinations for schedule queries and route selection."
  );

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

export const terminalsListSchema = terminalListSchema;
export type TerminalsList = SharedTerminalList;
