/**
 * @fileoverview Output schemas for WSF Fares API FareTotals endpoint
 *
 * These schemas define the response structures for WSF Fares API FareTotals endpoint.
 */

import { z } from "@/shared/zod";

export const fareTotalTypeSchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
  .describe(
    "Code indicating total type: 1 = Departing, 2 = Return, 3 = Either (direction independent), 4 = Grand Total."
  );

export type FareTotalType = z.infer<typeof fareTotalTypeSchema>;

export const fareTotalSchema = z
  .object({
    TotalType: fareTotalTypeSchema.describe(
      "Code indicating total type: 1 = Departing, 2 = Return, 3 = Either (direction independent), 4 = Grand Total."
    ),
    Description: z
      .string()
      .nullable()
      .describe(
        "Display name of the fare total (e.g., 'Anacortes to Friday Harbor', 'Grand Total'), or null if unavailable."
      ),
    BriefDescription: z
      .string()
      .nullable()
      .describe(
        "Short string representation of total type (e.g., 'Depart', 'Either', 'Total'), or null if unavailable."
      ),
    Amount: z
      .number()
      .describe("Total fare amount in dollars for this total type."),
  })
  .describe("Fare total breakdown with type, description, and amount.");

export type FareTotal = z.infer<typeof fareTotalSchema>;
