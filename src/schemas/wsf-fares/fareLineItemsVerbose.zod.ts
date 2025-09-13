import { z } from "zod";
import { terminalComboVerboseItemSchema } from "./terminalComboVerboseItem.zod";
import { lineItemXrefSchema } from "./lineItemXref.zod";
import { lineItemSchema } from "./lineItem.zod";
import { roundTripLineItemSchema } from "./roundTripLineItem.zod";

// Note: terminalComboVerboseItemSchema is imported from terminalComboVerboseItem.zod.ts
// to avoid duplication since both schemas are functionally identical

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
  LineItemLookup: z
    .array(lineItemXrefSchema)
    .describe(
      "Associates a terminal combination with a one-way fare and a round trip fare for the given trip date."
    ),
  /** All one-way fare line items associated with the trip date. */
  LineItems: z
    .array(z.array(lineItemSchema))
    .describe(
      "All one-way fare line items associated with the trip date. Each terminal combination has its own array of fare items."
    ),
  /** All round trip line items associated with the trip date. */
  RoundTripLineItems: z
    .array(z.array(roundTripLineItemSchema))
    .describe(
      "All round trip line items associated with the trip date. Each terminal combination has its own array of fare items."
    ),
});

export type FareLineItemsVerbose = z.infer<typeof fareLineItemsVerboseSchema>;
