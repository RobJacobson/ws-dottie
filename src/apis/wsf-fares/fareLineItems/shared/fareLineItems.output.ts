/**
 * @fileoverview Output schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the response structures for WSF Fares API FareLineItems endpoints.
 */

import { z } from "@/shared/zod";
import { terminalComboFaresVerboseSchema } from "../../terminalCombo/shared/terminalCombo.output";

export const lineItemSchema = z
  .object({
    FareLineItemID: z.number().describe("Numeric ID of the fare line item."),
    FareLineItem: z
      .string()
      .nullable()
      .describe("Display name of the fare line item, or null if unavailable."),
    Category: z
      .string()
      .nullable()
      .describe(
        "Category grouping for the fare (e.g., 'Passenger', 'Vehicle'), or null if unavailable."
      ),
    DirectionIndependent: z
      .boolean()
      .describe(
        "True if fare amount is the same regardless of departure direction, false if it varies by terminal."
      ),
    Amount: z.number().describe("Fare cost in dollars."),
  })
  .describe(
    "Fare line item with identifier, description, category, direction independence, and cost."
  );

export type LineItem = z.infer<typeof lineItemSchema>;

export const lineItemXrefSchema = z
  .object({
    TerminalComboIndex: z
      .number()
      .describe(
        "Array index of terminal combination in TerminalComboVerbose array."
      ),
    LineItemIndex: z
      .number()
      .describe("Array index of one-way fare line items in LineItems array."),
    RoundTripLineItemIndex: z
      .number()
      .describe(
        "Array index of round trip fare line items in RoundTripLineItems array."
      ),
  })
  .describe(
    "Cross-reference mapping between terminal combinations and fare line item arrays."
  );

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;

export const lineItemVerboseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboFaresVerboseSchema)
      .optional()
      .describe("Array of terminal combination information for the trip date."),
    LineItemLookup: z
      .array(lineItemXrefSchema)
      .optional()
      .describe(
        "Array of cross-reference mappings between terminal combinations and fare line items."
      ),
    LineItems: z
      .array(z.array(lineItemSchema))
      .optional()
      .describe(
        "Array of one-way fare line item arrays, one per terminal combination."
      ),
    RoundTripLineItems: z
      .array(z.array(lineItemSchema))
      .optional()
      .describe(
        "Array of round trip fare line item arrays, one per terminal combination."
      ),
  })
  .describe(
    "Comprehensive fare line item data for all terminal combinations on a trip date."
  );

export type LineItemVerbose = z.infer<typeof lineItemVerboseSchema>;
