/**
 * @fileoverview Input schemas for WSF Fares API endpoints
 *
 * These schemas define the input parameters for WSF Fares API endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for CacheFlushDate endpoint
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = z
  .object({})
  .describe(
    "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
  );

export type FaresCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;

/**
 * Input schema for ValidDateRange endpoint
 *
 * This operation retrieves a date range for which fares data is currently published & available.
 */
export const validDateRangeSchema = z
  .object({})
  .describe(
    "This operation retrieves a date range for which fares data is currently published & available."
  );

export type ValidDateRangeInput = z.infer<typeof validDateRangeSchema>;

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

/**
 * Input schema for FareTotals endpoint
 *
 * This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareTotalsSchema = z
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
    /**
     * Comma delimited array of line items you'd like to have totalled.
     */
    FareLineItemID: z
      .string()
      .describe(
        "Comma delimited array of line items you'd like to have totalled."
      ),
    /**
     * Comma delimited array of quantities. Values must be greater than or equal to zero.
     */
    Quantity: z
      .string()
      .describe(
        "Comma delimited array of quantities. Values must be greater than or equal to zero."
      ),
  })
  .describe(
    "This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareTotalsInput = z.infer<typeof fareTotalsSchema>;
