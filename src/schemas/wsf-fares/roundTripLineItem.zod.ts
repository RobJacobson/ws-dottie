import { z } from "zod";

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
    .nullable()
    .describe('A description of the fare (eg. "Adult (age 19 - 64)").'),
  /** A logical grouping that the fare belongs to (eg. "Passenger"). */
  Category: z
    .string()
    .nullable()
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

export type RoundTripLineItem = z.infer<typeof roundTripLineItemSchema>;
