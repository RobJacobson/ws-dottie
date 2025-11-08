/**
 * @fileoverview Input schemas for WSF Fares API FareTotals endpoint
 *
 * These schemas define the input parameters for WSF Fares API FareTotals endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for FareTotals endpoint
 *
 * This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareTotalsByTripDateAndRouteInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare total calculation, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fare calculations by trip date."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to identify origin terminal for fare calculation."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalMates to retrieve valid arriving terminals. Used to identify destination terminal for fare calculation."
      ),
    RoundTrip: z
      .boolean()
      .describe(
        "Trip type indicator, as a boolean. E.g., true for round trip fare totals, false for one-way fare totals. Determines whether totals include return journey fares."
      ),
    FareLineItemID: z
      .string()
      .describe(
        "Comma-separated list of fare line item IDs to include in total calculation, as a comma-delimited string. E.g., '1,2,3' for Adult, Senior, and Youth fares. Use GetFareLineItems to find valid fare line item IDs. Each ID corresponds to quantity at same index in Quantity array."
      ),
    Quantity: z
      .string()
      .describe(
        "Comma-separated list of quantities for corresponding fare line items, as a comma-delimited string. E.g., '2,1,0' for 2 adults, 1 senior, 0 youth. Values must be >= 0. Each quantity corresponds to fare line item ID at same index in FareLineItemID array."
      ),
  })
  .describe(
    "Calculates fare totals for specified fare line items and quantities, terminal combination, and trip date, returning breakdown of departing, return, direction-independent, and grand totals. Use GetFareLineItems to find valid fare line item IDs. Use for fare calculation and total computation workflows."
  );

export type FareTotalsByTripDateAndRouteInput = z.infer<
  typeof fareTotalsByTripDateAndRouteInputSchema
>;
