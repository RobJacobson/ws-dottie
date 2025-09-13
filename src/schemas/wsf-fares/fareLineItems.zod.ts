import { z } from "zod";
import { fareLineItemSchema } from "./fareLineItem.zod";

/**
 * Schema for validating the response from the GET /farelineitems endpoint.
 * Returns an array of fare line item objects.
 */
export const fareLineItemsSchema = z
  .array(fareLineItemSchema)
  .describe(
    "Array of fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date."
  );

export type FareLineItems = z.infer<typeof fareLineItemsSchema>;
