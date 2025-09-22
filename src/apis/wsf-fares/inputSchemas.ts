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
export const CacheFlushDateInputSchema = z.object({});

export type CacheFlushDateInput = z.infer<typeof CacheFlushDateInputSchema>;

/**
 * Input schema for ValidDateRange endpoint
 * GET /validdaterange?apiaccesscode={APIAccessCode}
 */
export const ValidDateRangeInputSchema = z.object({});

export type ValidDateRangeInput = z.infer<typeof ValidDateRangeInputSchema>;

/**
 * Input schema for Terminals endpoint
 * GET /terminals/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const TerminalsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type TerminalsInput = z.infer<typeof TerminalsInputSchema>;

/**
 * Input schema for TerminalMates endpoint
 * GET /terminalmates/{TripDate}/{TerminalID}?apiaccesscode={APIAccessCode}
 */
export const TerminalMatesInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  TerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
});

export type TerminalMatesInput = z.infer<typeof TerminalMatesInputSchema>;

/**
 * Input schema for TerminalCombo endpoint
 * GET /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
 */
export const TerminalComboInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
});

export type TerminalComboInput = z.infer<typeof TerminalComboInputSchema>;

/**
 * Input schema for TerminalComboVerbose endpoint
 * GET /terminalcomboverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const TerminalComboVerboseInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type TerminalComboVerboseInput = z.infer<
  typeof TerminalComboVerboseInputSchema
>;

/**
 * Input schema for FareLineItemsBasic endpoint
 * GET /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const FareLineItemsBasicInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  RoundTrip: z
    .boolean()
    .describe(
      "Use 'true' to indicate round trip or 'false' for one-way journey."
    ),
});

export type FareLineItemsBasicInput = z.infer<
  typeof FareLineItemsBasicInputSchema
>;

/**
 * Input schema for FareLineItems endpoint
 * GET /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const FareLineItemsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  RoundTrip: z
    .boolean()
    .describe(
      "Use 'true' to indicate round trip or 'false' for one-way journey."
    ),
});

export type FareLineItemsInput = z.infer<typeof FareLineItemsInputSchema>;

/**
 * Input schema for FareLineItemsVerbose endpoint
 * GET /farelineitemsverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const FareLineItemsVerboseInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type FareLineItemsVerboseInput = z.infer<
  typeof FareLineItemsVerboseInputSchema
>;

/**
 * Input schema for FareTotals endpoint
 * GET /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}?apiaccesscode={APIAccessCode}
 */
export const FareTotalsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  RoundTrip: z
    .boolean()
    .describe(
      "Use 'true' to indicate round trip or 'false' for one-way journey."
    ),
  FareLineItemID: z
    .string()
    .describe(
      "Comma delimited array of line items you'd like to have totalled."
    ),
  Quantity: z
    .string()
    .describe(
      "Comma delimited array of quantities. Values must be greater than or equal to zero."
    ),
});

export type FareTotalsInput = z.infer<typeof FareTotalsInputSchema>;
