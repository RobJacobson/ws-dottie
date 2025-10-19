/**
 * @fileoverview Input schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the input parameters for WSF Fares API FareLineItems endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for FareLineItemsBasic endpoint
 *
 * This operation retrieves the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsBasicSchema = z
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
    /**
     * Use 'true' to indicate round trip or 'false' for one-way journey.
     */
    RoundTrip: z
      .boolean()
      .describe(
        "Use 'true' to indicate round trip or 'false' for one-way journey."
      ),
  })
  .describe(
    "This operation retrieves the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareLineItemsBasicInput = z.infer<typeof fareLineItemsBasicSchema>;

/**
 * Input schema for FareLineItems endpoint
 *
 * This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsSchema = z
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
    /**
     * Use 'true' to indicate round trip or 'false' for one-way journey.
     */
    RoundTrip: z
      .boolean()
      .describe(
        "Use 'true' to indicate round trip or 'false' for one-way journey."
      ),
  })
  .describe(
    "This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareLineItemsInput = z.infer<typeof fareLineItemsSchema>;

/**
 * Input schema for FareLineItemsVerbose endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsVerboseSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseSchema
>;
