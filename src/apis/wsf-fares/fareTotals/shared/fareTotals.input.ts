/**
 * @fileoverview Input schemas for WSF Fares API FareTotals endpoint
 *
 * These schemas define the input parameters for WSF Fares API FareTotals endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

export const fareTotalsByTripDateAndRouteInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
    RoundTrip: z
      .boolean()
      .describe("True for round trip totals, false for one-way totals."),
    FareLineItemID: z
      .string()
      .describe("Comma-separated list of fare line item IDs (e.g., '1,2,3')."),
    Quantity: z
      .string()
      .describe(
        "Comma-separated list of quantities matching FareLineItemID order (e.g., '2,1,0'). Values must be >= 0."
      ),
  })
  .describe(
    "Input parameters for calculating fare totals with selected line items and quantities."
  );

export type FareTotalsByTripDateAndRouteInput = z.infer<
  typeof fareTotalsByTripDateAndRouteInputSchema
>;
