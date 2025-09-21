import { z } from "zod";

/**
 * Schema for validating a single fare line item from the GET /farelineitemsbasic endpoint.
 *
 * This operation retrieves the most popular fares for either round trip or one-way
 * departures available for a given departing terminal, arriving terminal and trip date.
 * For round trip input please use 'true' to indicate round trip or 'false' to indicate
 * a one-way journey. A valid departing terminal may be found by using /terminals while
 * a valid arriving terminal may be found by using /terminalmates. Similarly, a valid
 * trip date may be determined using /validdaterange. Please format the trip date input
 * as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must also be passed as part of
 * the URL string.
 */
export const fareLineItemBasicSchema = z.object({
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

export type FareLineItemBasic = z.infer<typeof fareLineItemBasicSchema>;

/**
 * Array of basic fare line items.
 */
export const fareLineItemsBasicSchema = z
  .array(fareLineItemBasicSchema)
  .describe(
    "Array of the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date."
  );

export type FareLineItemsBasic = z.infer<typeof fareLineItemsBasicSchema>;
