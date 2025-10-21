/**
 * @fileoverview Output schemas for WSF Fares API Terminals endpoints
 *
 * These schemas define the response structures for WSF Fares API Terminals endpoints.
 */

import { z } from "zod";

/**
 * Base terminal schema for fares API
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalBaseSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().describe("The name of the terminal."),
});

export type TerminalBase = z.infer<typeof terminalBaseSchema>;

/**
 * Terminal response schema used by multiple endpoints
 */
export const terminalResponseSchema = terminalBaseSchema;

export type TerminalResponse = z.infer<typeof terminalResponseSchema>;
