import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { fareTotalSchema, type FareTotal } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFareTotalsParamsSchema
// GetFareTotalsParams
// ============================================================================

export const getFareTotalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
  fareLineItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// fareTotalSchema (imported from fareTotals.zod)
// FareTotal (imported from fareTotals.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFareTotals (fare totals calculation)
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}";

export const getFareTotals = zodFetch<GetFareTotalsParams, FareTotal>(
  ENDPOINT,
  getFareTotalsParamsSchema,
  fareTotalSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFareTotals
// ============================================================================

export const fareTotalsOptions = createQueryOptions({
  apiFunction: getFareTotals,
  queryKey: ["wsf", "fares", "faretotals", "getFareTotals"],
  cacheStrategy: "DAILY_STATIC",
});
