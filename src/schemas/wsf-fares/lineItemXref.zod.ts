import { z } from "zod";

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

export type LineItemXref = z.infer<typeof lineItemXrefSchema>;
