import { z } from "zod";
import { fareLineItemBasicSchema } from "./fareLineItemBasic.zod";

/**
 * Schema for validating the response from the GET /farelineitemsbasic endpoint.
 * Returns an array of fare line item objects.
 */
export const fareLineItemsBasicSchema = z
  .array(fareLineItemBasicSchema)
  .describe(
    "Array of the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date."
  );

export type FareLineItemsBasic = z.infer<typeof fareLineItemsBasicSchema>;
