/**
 * @fileoverview Output schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the response structures for WSF Fares API FareLineItems endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { terminalComboVerboseResponseSchema } from "../terminalCombo/terminalCombo.output";

/**
 * Line item response schema used by multiple endpoints
 *
 * This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemResponseSchema = z.object({
  /** Unique identifier for a line item. */
  FareLineItemID: z.number().describe("Unique identifier for a line item."),
  /** A description of the fare (eg. "Adult (age 19 - 64)"). */
  FareLineItem: z
    .string()
    .nullable()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  /** A logical grouping that the fare belongs to (eg. "Passenger"). */
  Category: z
    .string()
    .nullable()
    .describe('A logical grouping that the fare belongs to (eg. "Passenger").'),
  /**
   * A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal.
   */
  DirectionIndependent: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal."
    ),
  /** The cost of the fare in dollars. */
  Amount: z.number().describe("The cost of the fare in dollars."),
});

export type LineItemResponse = z.infer<typeof lineItemResponseSchema>;

/**
 * Line item cross-reference schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemXrefSchema = z
  .object({
    /** An array index from TerminalComboVerbose. */
    TerminalComboIndex: z
      .number()
      .describe("An array index from TerminalComboVerbose."),
    /** An array index from LineItems. */
    LineItemIndex: z.number().describe("An array index from LineItems."),
    /** An array index from RoundTripLineItems. */
    RoundTripLineItemIndex: z
      .number()
      .describe("An array index from RoundTripLineItems."),
  })
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;

/**
 * Line item verbose response schema for GetFareLineItemsVerboseDetail endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const lineItemVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseResponseSchema)
      .optional()
      .describe("Array of terminal combination verbose responses."),
    LineItemLookup: z
      .array(lineItemXrefSchema)
      .optional()
      .describe("Array of line item cross-reference responses."),
    LineItems: z
      .array(z.array(lineItemResponseSchema))
      .optional()
      .describe("All one-way fare line items associated with the trip date."),
    RoundTripLineItems: z
      .array(z.array(lineItemResponseSchema))
      .optional()
      .describe("All round trip line items associated with the trip date."),
  })
  .describe(
    "This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type LineItemVerboseResponse = z.infer<
  typeof lineItemVerboseResponseSchema
>;
