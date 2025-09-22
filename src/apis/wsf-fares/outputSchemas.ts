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
export const cacheFlushDateResponseSchema = zWsdotDate();

export type CacheFlushDateResponse = z.infer<
  typeof cacheFlushDateResponseSchema
>;

/**
 * Valid date range response schema for GetValidDateRange endpoint
 */
export const validDateRangeResponseSchema = z.object({
  DateFrom: zWsdotDate().describe(
    "Fares information is available from this date onward."
  ),
  DateThru: zWsdotDate().describe(
    "Fares information is not available after this date."
  ),
});

export type ValidDateRangeResponse = z.infer<
  typeof validDateRangeResponseSchema
>;

/**
 * Base terminal schema for fares API
 */
export const terminalBaseSchema = z.object({
  TerminalID: z.number().describe("Unique identifier for a terminal."),
  Description: z.string().describe("The name of the terminal."),
});

export type TerminalBase = z.infer<typeof terminalBaseSchema>;

/**
 * Terminal response schema used by multiple endpoints
 */
export const terminalResponseSchema = terminalBaseSchema;

export type TerminalResponse = z.infer<typeof terminalResponseSchema>;

/**
 * List of terminal responses schema
 */
export const terminalResponsesListSchema = z.array(terminalResponseSchema);

export type TerminalResponseList = z.infer<
  typeof terminalResponsesListSchema
>;

/**
 * Terminal combo response schema for GetTerminalComboDetail endpoint
 */
export const terminalComboResponseSchema = z.object({
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

export type TerminalComboResponse = z.infer<typeof terminalComboResponseSchema>;

/**
 * Terminal combo verbose response schema for GetTerminalComboVerboseDetail endpoint
 */
export const terminalComboVerboseResponseSchema = z.object({
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
  typeof terminalComboVerboseResponseSchema
>;

/**
 * List of terminal combo verbose responses schema
 */
export const terminalComboVerboseResponsesListSchema = z.array(
  terminalComboVerboseResponseSchema
);

export type TerminalComboVerboseResponseList = z.infer<
  typeof terminalComboVerboseResponsesListSchema
>;

/**
 * Line item response schema used by multiple endpoints
 */
export const lineItemResponseSchema = z.object({
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

export type LineItemResponse = z.infer<typeof lineItemResponseSchema>;

/**
 * List of line item responses schema
 */
export const lineItemResponsesListSchema = z.array(lineItemResponseSchema);

export type LineItemResponseList = z.infer<
  typeof lineItemResponsesListSchema
>;

/**
 * List of lists of line item responses schema
 */
export const lineItemResponsesListListSchema = z.array(
  lineItemResponsesListSchema
);

export type LineItemResponseListList = z.infer<
  typeof lineItemResponsesListListSchema
>;

/**
 * Line item cross-reference schema for GetFareLineItemsVerboseDetail endpoint
 */
export const lineItemXrefSchema = z.object({
  TerminalComboIndex: z
    .number()
    .describe("An list index from TerminalComboVerbose."),
  LineItemIndex: z.number().describe("An list index from LineItems."),
  RoundTripLineItemIndex: z
    .number()
    .describe("An list index from RoundTripLineItems."),
});

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;

/**
 * List of line item cross-references schema
 */
export const lineItemXrefsListSchema = z.array(lineItemXrefSchema);

export type LineItemXrefList = z.infer<typeof lineItemXrefsListSchema>;

/**
 * Line item verbose response schema for GetFareLineItemsVerboseDetail endpoint
 */
export const lineItemVerboseResponseSchema = z.object({
  TerminalComboVerbose: terminalComboVerboseResponsesListSchema
    .nullable()
    .describe("All valid terminal combinations associated with the trip date."),
  LineItemLookup: lineItemXrefsListSchema
    .nullable()
    .describe(
      "Associates a terminal combination with a one-way fare and a round trip fare for the given trip date."
    ),
  LineItems: lineItemResponsesListListSchema
    .nullable()
    .describe("All one-way fare line items associated with the trip date."),
  RoundTripLineItems: lineItemResponsesListListSchema
    .nullable()
    .describe("All round trip line items associated with the trip date."),
});

export type LineItemVerboseResponse = z.infer<
  typeof lineItemVerboseResponseSchema
>;

/**
 * Fare total type enum for GetFareTotals endpoint
 */
export const fareTotalTypeSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
  .describe(
    "Indicates a logical grouping for the total. (1 = Depart, 2 = Return, 3 = Either, 4 = Total)"
  );

export type FareTotalType = z.infer<typeof fareTotalTypeSchema>;

/**
 * Fare total response schema for GetFareTotals endpoint
 */
export const fareTotalResponseSchema = z.object({
  TotalType: fareTotalTypeSchema.describe(
    "Indicates a logical grouping for the total. (1 = Depart, 2 = Return, 3 = Either, 4 = Total)"
  ),
  Description: z.string().nullable().describe("A description of the amount."),
  BriefDescription: z
    .string()
    .nullable()
    .describe("A string representation of the FareTotalType."),
  Amount: z.number().describe("A total of the fares in dollars."),
});

export type FareTotalResponse = z.infer<typeof fareTotalResponseSchema>;

/**
 * List of fare total responses schema
 */
export const fareTotalResponsesListSchema = z.array(fareTotalResponseSchema);

export type FareTotalResponseList = z.infer<
  typeof fareTotalResponsesListSchema
>;
