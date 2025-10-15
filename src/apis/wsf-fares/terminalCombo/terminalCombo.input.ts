/**
 * @fileoverview Input schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the input parameters for WSF Fares API TerminalCombo endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for TerminalCombo endpoint
 *
 * This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalComboSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboInput = z.infer<typeof terminalComboSchema>;

/**
 * Input schema for TerminalComboVerbose endpoint
 *
 * This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalComboVerboseSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseSchema
>;
