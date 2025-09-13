import { z } from "zod";

/**
 * Schema for validating a single fare total from the GET /faretotals endpoint.
 *
 * This operation totals a set of fares & associated quantities for either a round trip
 * or one-way journey, given a departing terminal, arriving terminal and trip date.
 * Fare line item ID is a comma delimited array of line items you'd like to have totalled.
 * Use /farelineitems to find valid fare line item ID values. Quantity is also a comma
 * delimited array. Quantity values must be greater than or equal to zero. The same index
 * in the fare line item ID and quantity input arrays must associate a fare with a quantity.
 * For round trip input please use 'true' to indicate round trip or 'false' to indicate
 * a one-way journey. A valid departing terminal may be found by using /terminals while
 * a valid arriving terminal may be found by using /terminalmates. Similarly, a valid
 * trip date may be determined using /validdaterange. Please format the trip date input
 * as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must also be passed as part of
 * the URL string.
 */
export const fareTotalSchema = z.object({
  /** Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total. */
  TotalType: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
    .describe(
      "Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total."
    ),
  /** A description of the amount. */
  Description: z.string().nullable().describe("A description of the amount."),
  /** A string representation of the FareTotalType. */
  BriefDescription: z
    .string()
    .nullable()
    .describe("A string representation of the FareTotalType."),
  /** A total of the fares in dollars. */
  Amount: z.number().describe("A total of the fares in dollars."),
});

export type FareTotal = z.infer<typeof fareTotalSchema>;
