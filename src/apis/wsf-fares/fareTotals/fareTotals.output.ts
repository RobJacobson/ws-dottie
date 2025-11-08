/**
 * @fileoverview Output schemas for WSF Fares API FareTotals endpoint
 *
 * These schemas define the response structures for WSF Fares API FareTotals endpoint.
 */

import { z } from "@/shared/zod";

/**
 * Fare total type enum for GetFareTotals endpoint
 */
export const fareTotalTypeSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
  .describe(
    "Fare total type code indicating logical grouping for total amount, as a total type code. Valid values: 1 (Departing), 2 (Return), 3 (Either - direction independent), 4 (Grand Total). E.g., '1' for departing leg total, '4' for grand total. Used for fare total categorization and breakdown."
  );

export type FareTotalType = z.infer<typeof fareTotalTypeSchema>;

/**
 * Fare total response schema for GetFareTotals endpoint
 *
 * This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const fareTotalSchema = z
  .object({
    TotalType: fareTotalTypeSchema.describe(
      "Fare total type code indicating logical grouping for total amount, as a total type code. Valid values: 1 (Departing), 2 (Return), 3 (Either - direction independent), 4 (Grand Total). E.g., '1' for departing leg total, '4' for grand total. Used for fare total categorization."
    ),
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of fare total, as a total description. E.g., 'Anacortes to Friday Harbor' for departing total, 'Either' for direction-independent total, 'Grand Total' for grand total, null when description is unavailable. Provides context for total amount."
      ),
    BriefDescription: z
      .string()
      .nullable()
      .describe(
        "Short string representation of fare total type, as a brief description. E.g., 'Depart' for departing total (type 1), 'Either' for direction-independent total (type 3), 'Total' for grand total (type 4), null when brief description is unavailable. Used for compact total type display."
      ),
    Amount: z
      .number()
      .describe(
        "Total fare amount for this total type, as dollars. E.g., '61.25' for $61.25 departing total, '0' for $0 direction-independent total, '61.25' for $61.25 grand total. Used for fare total display and payment calculation."
      ),
  })
  .describe(
    "Represents fare total breakdown including total type, description, and amount. E.g., departing total (type 1) 'Anacortes to Friday Harbor' with amount $61.25, grand total (type 4) with amount $61.25. Used for fare calculation results, total breakdowns, and payment amount determination."
  );

export type FareTotal = z.infer<typeof fareTotalSchema>;
