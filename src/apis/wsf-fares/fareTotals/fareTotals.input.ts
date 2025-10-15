/**
 * @fileoverview Input schemas for WSF Fares API FareTotals endpoint
 *
 * These schemas define the input parameters for WSF Fares API FareTotals endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for FareTotals endpoint
 *
 * This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareTotalsSchema = z
  .object({
    /** Trip date in YYYY-MM-DD format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("Trip date in YYYY-MM-DD format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal."),
    /**
     * Use 'true' to indicate round trip or 'false' for one-way journey.
     */
    RoundTrip: z
      .boolean()
      .describe(
        "Use 'true' to indicate round trip or 'false' for one-way journey."
      ),
    /**
     * Comma delimited array of line items you'd like to have totalled.
     */
    FareLineItemID: z
      .string()
      .describe(
        "Comma delimited array of line items you'd like to have totalled."
      ),
    /**
     * Comma delimited array of quantities. Values must be greater than or equal to zero.
     */
    Quantity: z
      .string()
      .describe(
        "Comma delimited array of quantities. Values must be greater than or equal to zero."
      ),
  })
  .describe(
    "This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type FareTotalsInput = z.infer<typeof fareTotalsSchema>;
