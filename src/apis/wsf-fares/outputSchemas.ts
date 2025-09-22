/**
 * @fileoverview Output schemas for WSF Fares API endpoints
 *
 * These schemas define the response structures for WSF Fares API endpoints.
 */

import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Cache flush date response schema for GetCacheFlushDate endpoint
 */
export const CacheFlushDateResponseSchema = zWsdotDate();

export type CacheFlushDateResponse = z.infer<
  typeof CacheFlushDateResponseSchema
>;

/**
 * Valid date range response schema for GetValidDateRange endpoint
 */
export const ValidDateRangeResponseSchema = z.object({
  DateFrom: zWsdotDate().describe(
    "Fares information is available from this date onward."
  ),
  DateThru: zWsdotDate().describe(
    "Fares information is not available after this date."
  ),
});

export type ValidDateRangeResponse = z.infer<
  typeof ValidDateRangeResponseSchema
>;

/**
 * Terminal response schema used by multiple endpoints
 */
export const TerminalResponseSchema = z.object({
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  Description: z.string().describe("The name of the terminal."),
});

export type TerminalResponse = z.infer<typeof TerminalResponseSchema>;

/**
 * Array of terminal responses schema
 */
export const ArrayOfTerminalResponseSchema = z.array(TerminalResponseSchema);

export type ArrayOfTerminalResponse = z.infer<
  typeof ArrayOfTerminalResponseSchema
>;

/**
 * Terminal combo response schema for GetTerminalComboDetail endpoint
 */
export const TerminalComboResponseSchema = z.object({
  DepartingDescription: z
    .string()
    .nullable()
    .describe("The name of the departing terminal."),
  ArrivingDescription: z
    .string()
    .nullable()
    .describe("The name of the arriving terminal."),
  CollectionDescription: z
    .string()
    .nullable()
    .describe(
      "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
    ),
});

export type TerminalComboResponse = z.infer<typeof TerminalComboResponseSchema>;

/**
 * Terminal combo verbose response schema for GetTerminalComboVerboseDetail endpoint
 */
export const TerminalComboVerboseResponseSchema = z.object({
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  DepartingDescription: z
    .string()
    .nullable()
    .describe("The name of the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  ArrivingDescription: z
    .string()
    .nullable()
    .describe("The name of the arriving terminal."),
  CollectionDescription: z
    .string()
    .nullable()
    .describe(
      "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
    ),
});

export type TerminalComboVerboseResponse = z.infer<
  typeof TerminalComboVerboseResponseSchema
>;

/**
 * Array of terminal combo verbose responses schema
 */
export const ArrayOfTerminalComboVerboseResponseSchema = z.array(
  TerminalComboVerboseResponseSchema
);

export type ArrayOfTerminalComboVerboseResponse = z.infer<
  typeof ArrayOfTerminalComboVerboseResponseSchema
>;

/**
 * Line item response schema used by multiple endpoints
 */
export const LineItemResponseSchema = z.object({
  FareLineItemID: z.number().describe("Unique identifier for a line item."),
  FareLineItem: z
    .string()
    .nullable()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  Category: z
    .string()
    .nullable()
    .describe('A logical grouping that the fare belongs to (eg. "Passenger").'),
  DirectionIndependent: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal."
    ),
  Amount: z.number().describe("The cost of the fare in dollars."),
});

export type LineItemResponse = z.infer<typeof LineItemResponseSchema>;

/**
 * Array of line item responses schema
 */
export const ArrayOfLineItemResponseSchema = z.array(LineItemResponseSchema);

export type ArrayOfLineItemResponse = z.infer<
  typeof ArrayOfLineItemResponseSchema
>;

/**
 * Array of arrays of line item responses schema
 */
export const ArrayOfArrayOfLineItemResponseSchema = z.array(
  ArrayOfLineItemResponseSchema
);

export type ArrayOfArrayOfLineItemResponse = z.infer<
  typeof ArrayOfArrayOfLineItemResponseSchema
>;

/**
 * Line item cross-reference schema for GetFareLineItemsVerboseDetail endpoint
 */
export const LineItemXrefSchema = z.object({
  TerminalComboIndex: z
    .number()
    .describe("An array index from TerminalComboVerbose."),
  LineItemIndex: z.number().describe("An array index from LineItems."),
  RoundTripLineItemIndex: z
    .number()
    .describe("An array index from RoundTripLineItems."),
});

export type LineItemXref = z.infer<typeof LineItemXrefSchema>;

/**
 * Array of line item cross-references schema
 */
export const ArrayOfLineItemXrefSchema = z.array(LineItemXrefSchema);

export type ArrayOfLineItemXref = z.infer<typeof ArrayOfLineItemXrefSchema>;

/**
 * Line item verbose response schema for GetFareLineItemsVerboseDetail endpoint
 */
export const LineItemVerboseResponseSchema = z.object({
  TerminalComboVerbose:
    ArrayOfTerminalComboVerboseResponseSchema.nullable().describe(
      "All valid terminal combinations associated with the trip date."
    ),
  LineItemLookup: ArrayOfLineItemXrefSchema.nullable().describe(
    "Associates a terminal combination with a one-way fare and a round trip fare for the given trip date."
  ),
  LineItems: ArrayOfArrayOfLineItemResponseSchema.nullable().describe(
    "All one-way fare line items associated with the trip date."
  ),
  RoundTripLineItems: ArrayOfArrayOfLineItemResponseSchema.nullable().describe(
    "All round trip line items associated with the trip date."
  ),
});

export type LineItemVerboseResponse = z.infer<
  typeof LineItemVerboseResponseSchema
>;

/**
 * Fare total type enum for GetFareTotals endpoint
 */
export const FareTotalTypeSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
  .describe(
    "Indicates a logical grouping for the total. (1 = Depart, 2 = Return, 3 = Either, 4 = Total)"
  );

export type FareTotalType = z.infer<typeof FareTotalTypeSchema>;

/**
 * Fare total response schema for GetFareTotals endpoint
 */
export const FareTotalResponseSchema = z.object({
  TotalType: FareTotalTypeSchema.describe(
    "Indicates a logical grouping for the total. (1 = Depart, 2 = Return, 3 = Either, 4 = Total)"
  ),
  Description: z.string().nullable().describe("A description of the amount."),
  BriefDescription: z
    .string()
    .nullable()
    .describe("A string representation of the FareTotalType."),
  Amount: z.number().describe("A total of the fares in dollars."),
});

export type FareTotalResponse = z.infer<typeof FareTotalResponseSchema>;

/**
 * Array of fare total responses schema
 */
export const ArrayOfFareTotalResponseSchema = z.array(FareTotalResponseSchema);

export type ArrayOfFareTotalResponse = z.infer<
  typeof ArrayOfFareTotalResponseSchema
>;
