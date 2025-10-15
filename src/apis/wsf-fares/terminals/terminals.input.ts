/**
 * @fileoverview Input schemas for WSF Fares API Terminals endpoints
 *
 * These schemas define the input parameters for WSF Fares API Terminals endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for Terminals endpoint
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalsSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalsInput = z.infer<typeof terminalsSchema>;

/**
 * Input schema for TerminalMates endpoint
 *
 * This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalMatesSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    TerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
  })
  .describe(
    "This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalMatesInput = z.infer<typeof terminalMatesSchema>;
