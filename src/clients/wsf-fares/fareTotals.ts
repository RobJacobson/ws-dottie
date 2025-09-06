import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  fareTotalSchema,
  fareTotalsSchema as fareTotalsArraySchema,
  type FareTotal,
  type FareTotals,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schema & Types
//
// getFareTotalsParamsSchema
// GetFareTotalsParams
// ============================================================================

export const getFareTotalsParamsSchema = z
  .object({
    tripDate: z.date(),
    departingFaresTerminalID: z.number().int().positive(),
    arrivingFaresTerminalID: z.number().int().positive(),
    roundTrip: z.boolean(),
    fareLineItemIDs: z
      .array(z.number().int().positive())
      .min(1, "At least one fare line item ID must be provided"),
    quantities: z
      .array(z.number().int().min(1))
      .min(1, "At least one quantity must be provided"),
  })
  .refine((data) => data.fareLineItemIDs.length === data.quantities.length, {
    message: "fareLineItemIDs and quantities arrays must have the same length",
    path: ["quantities"],
  });

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// fareTotalSchema (imported from fareTotals.zod)
// fareTotalsArraySchema (imported from fareTotals.zod)
// FareTotal (imported from fareTotals.zod)
// FareTotals (imported from fareTotals.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { fareTotalSchema, fareTotalsArraySchema };
export type { FareTotal, FareTotals };

// ============================================================================
// API Function
//
// getFareTotals
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingFaresTerminalID}/{arrivingFaresTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}";

export const getFareTotals = zodFetch<GetFareTotalsParams, FareTotals>(
  ENDPOINT,
  getFareTotalsParamsSchema,
  fareTotalsArraySchema
);

// ============================================================================
// TanStack Query Hook
//
// useFareTotals
// ============================================================================

export const fareTotalsOptions = createQueryOptions({
  apiFunction: getFareTotals,
  queryKey: ["wsf", "fares", "fareTotals", "getFareTotals"],
  cacheStrategy: "DAILY_STATIC",
});
