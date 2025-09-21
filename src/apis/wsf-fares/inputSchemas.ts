/**
 * @fileoverview Input schemas for WSF Fares API endpoints
 *
 * These schemas define the input parameters for WSF Fares API endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for GetCacheFlushDate endpoint
 * GET /cacheflushdate
 */
export const GetCacheFlushDateInputSchema = z.object({});

export type GetCacheFlushDateInput = z.infer<
  typeof GetCacheFlushDateInputSchema
>;

/**
 * Input schema for GetValidDateRange endpoint
 * GET /validdaterange?apiaccesscode={APIAccessCode}
 */
export const GetValidDateRangeInputSchema = z.object({});

export type GetValidDateRangeInput = z.infer<
  typeof GetValidDateRangeInputSchema
>;

/**
 * Input schema for GetAllTerminals endpoint
 * GET /terminals/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const GetAllTerminalsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type GetAllTerminalsInput = z.infer<typeof GetAllTerminalsInputSchema>;

/**
 * Input schema for GetTerminalMates endpoint
 * GET /terminalmates/{TripDate}/{TerminalID}?apiaccesscode={APIAccessCode}
 */
export const GetTerminalMatesInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
  TerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
});

export type GetTerminalMatesInput = z.infer<typeof GetTerminalMatesInputSchema>;

/**
 * Input schema for GetTerminalComboDetail endpoint
 * GET /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
 */
export const GetTerminalComboDetailInputSchema = z.object({
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

export type GetTerminalComboDetailInput = z.infer<
  typeof GetTerminalComboDetailInputSchema
>;

/**
 * Input schema for GetTerminalComboVerboseDetail endpoint
 * GET /terminalcomboverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const GetTerminalComboVerboseDetailInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type GetTerminalComboVerboseDetailInput = z.infer<
  typeof GetTerminalComboVerboseDetailInputSchema
>;

/**
 * Input schema for GetFareLineItemsBasic endpoint
 * GET /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const GetFareLineItemsBasicInputSchema = z.object({
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

export type GetFareLineItemsBasicInput = z.infer<
  typeof GetFareLineItemsBasicInputSchema
>;

/**
 * Input schema for GetFareLineItems endpoint
 * GET /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
 */
export const GetFareLineItemsInputSchema = z.object({
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

export type GetFareLineItemsInput = z.infer<typeof GetFareLineItemsInputSchema>;

/**
 * Input schema for GetFareLineItemsVerboseDetail endpoint
 * GET /farelineitemsverbose/{TripDate}?apiaccesscode={APIAccessCode}
 */
export const GetFareLineItemsVerboseDetailInputSchema = z.object({
  TripDate: z
    .string()
    .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
});

export type GetFareLineItemsVerboseDetailInput = z.infer<
  typeof GetFareLineItemsVerboseDetailInputSchema
>;

/**
 * Input schema for GetFareTotals endpoint
 * GET /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}?apiaccesscode={APIAccessCode}
 */
export const GetFareTotalsInputSchema = z.object({
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

export type GetFareTotalsInput = z.infer<typeof GetFareTotalsInputSchema>;
