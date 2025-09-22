/**
 * @fileoverview Input schemas for WSF Fares API endpoints
 *
 * These schemas define the input parameters for WSF Fares API endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for CacheFlushDate endpoint
 * GET /cacheflushdate
 */
export const cacheFlushDateInputSchema = z.object({});

export type CacheFlushDateInput = z.infer<typeof cacheFlushDateInputSchema>;

/**
 * Input schema for ValidDateRange endpoint
 * GET /validdaterange?apiaccesscode={APIAccessCode}
 */
export const validDateRangeInputSchema = z.object({});

export type ValidDateRangeInput = z.infer<typeof validDateRangeInputSchema>;

/**
 * Input schema for Terminals endpoint
 * GET /terminals/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const terminalsInputSchema = z.object({
  /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type TerminalsInput = z.infer<typeof terminalsInputSchema>;

/**
 * Input schema for TerminalMates endpoint
 * GET /terminalmates/{TripDate}/{TerminalID}?apiaccesscode={APIAccessCode}
 */
export const terminalMatesInputSchema = z.object({
  /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  /** Unique identifier for the departing terminal. */
  TerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
});

export type TerminalMatesInput = z.infer<typeof terminalMatesInputSchema>;

/**
 * Input schema for TerminalCombo endpoint
 * GET /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
 */
export const terminalComboInputSchema = z.object({
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
});

export type TerminalComboInput = z.infer<typeof terminalComboInputSchema>;

/**
 * Input schema for TerminalComboVerbose endpoint
 * GET /terminalcomboverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const terminalComboVerboseInputSchema = z.object({
  /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type TerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInputSchema
>;

/**
 * Input schema for FareLineItemsBasic endpoint
 * GET /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const fareLineItemsBasicInputSchema = z.object({
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
});

export type FareLineItemsBasicInput = z.infer<
  typeof fareLineItemsBasicInputSchema
>;

/**
 * Input schema for FareLineItems endpoint
 * GET /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const fareLineItemsInputSchema = z.object({
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
});

export type FareLineItemsInput = z.infer<typeof fareLineItemsInputSchema>;

/**
 * Input schema for FareLineItemsVerbose endpoint
 * GET /farelineitemsverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const fareLineItemsVerboseInputSchema = z.object({
  /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseInputSchema
>;

/**
 * Input schema for FareTotals endpoint
 * GET /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}?apiaccesscode={APIAccessCode}
 */
export const fareTotalsInputSchema = z.object({
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
});

export type FareTotalsInput = z.infer<typeof fareTotalsInputSchema>;
