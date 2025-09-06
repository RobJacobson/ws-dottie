import { z } from "zod";
import { terminalComboVerboseItemSchema } from "./terminalComboVerbose.zod";

// Note: terminalComboVerboseItemSchema is imported from terminalComboVerbose.zod.ts
// to avoid duplication since both schemas are functionally identical

/**
 * Schema for validating a single line item cross-reference from the GET /farelineitemsverbose endpoint.
 */
export const lineItemXrefSchema = z.object({
  /** An array index from TerminalComboVerbose. */
  TerminalComboIndex: z
    .number()
    .int()
    .nonnegative()
    .describe("An array index from TerminalComboVerbose."),
  /** An array index from LineItems. */
  LineItemIndex: z
    .number()
    .int()
    .nonnegative()
    .describe("An array index from LineItems."),
  /** An array index from RoundTripLineItems. */
  RoundTripLineItemIndex: z
    .number()
    .int()
    .nonnegative()
    .describe("An array index from RoundTripLineItems."),
});

/**
 * Schema for validating a single line item from the GET /farelineitemsverbose endpoint.
 */
export const lineItemSchema = z.object({
  /** Unique identifier for a line item. */
  FareLineItemID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a line item."),
  /** A description of the fare (eg. "Adult (age 19 - 64)"). */
  FareLineItem: z
    .string()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  /** A logical grouping that the fare belongs to (eg. "Passenger"). */
  Category: z
    .string()
    .describe('A logical grouping that the fare belongs to (eg. "Passenger").'),
  /** A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. */
  DirectionIndependent: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal."
    ),
  /** The cost of the fare in dollars. */
  Amount: z.number().describe("The cost of the fare in dollars."),
});

/**
 * Schema for validating a single round trip line item from the GET /farelineitemsverbose endpoint.
 */
export const roundTripLineItemSchema = z.object({
  /** Unique identifier for a line item. */
  FareLineItemID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a line item."),
  /** A description of the fare (eg. "Adult (age 19 - 64)"). */
  FareLineItem: z
    .string()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  /** A logical grouping that the fare belongs to (eg. "Passenger"). */
  Category: z
    .string()
    .describe('A logical grouping that the fare belongs to (eg. "Passenger").'),
  /** A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. */
  DirectionIndependent: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal."
    ),
  /** The cost of the fare in dollars. */
  Amount: z.number().describe("The cost of the fare in dollars."),
});

/**
 * Schema for validating the response from the GET /farelineitemsverbose endpoint.
 *
 * This operation retrieves round trip and one-way fares for all valid departing and
 * arriving terminal combinations on a given trip date. A valid trip date may be
 * determined using /validdaterange. Please format the trip date input as 'YYYY-MM-DD'
 * (eg. '2014-04-01' for a trip date occurring on April 1, 2014). A valid API Access
 * Code from the WSDOT Traveler API must also be passed as part of the URL string.
 */
export const fareLineItemsVerboseSchema = z.object({
  /** All valid terminal combinations associated with the trip date. */
  TerminalComboVerbose: z
    .array(terminalComboVerboseItemSchema)
    .describe("All valid terminal combinations associated with the trip date."),
  /** Associates a terminal combination with a one-way fare and a round trip fare for the given trip date. */
  LineItemXref: z
    .array(lineItemXrefSchema)
    .describe(
      "Associates a terminal combination with a one-way fare and a round trip fare for the given trip date."
    ),
  /** All one-way fare line items associated with the trip date. */
  LineItems: z
    .array(lineItemSchema)
    .describe("All one-way fare line items associated with the trip date."),
  /** All round trip line items associated with the trip date. */
  RoundTripLineItems: z
    .array(roundTripLineItemSchema)
    .describe("All round trip line items associated with the trip date."),
});

// Note: TerminalComboVerboseItem type is exported from terminalComboVerbose.zod.ts
export type LineItemXref = z.infer<typeof lineItemXrefSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
export type RoundTripLineItem = z.infer<typeof roundTripLineItemSchema>;
export type FareLineItemsVerbose = z.infer<typeof fareLineItemsVerboseSchema>;
