import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { fareLineItemSchema } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFareLineItemsParamsSchema
// GetFareLineItemsParams
// ============================================================================

export const getFareLineItemsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// fareLineItemSchema (imported from fareLineItems.zod)
// FareLineItem (imported from fareLineItems.zod)
// ============================================================================

export const fareLineItemsArraySchema = z.array(fareLineItemSchema);
export type FareLineItems = z.infer<typeof fareLineItemsArraySchema>;

// ============================================================================
// API Functions
//
// getFareLineItems (fare line items)
// ============================================================================

const ENDPOINT =
  "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}";

export const getFareLineItems = zodFetch<GetFareLineItemsParams, FareLineItems>(
  ENDPOINT,
  getFareLineItemsParamsSchema,
  fareLineItemsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItems
// ============================================================================

export const fareLineItemsOptions = createQueryOptions({
  apiFunction: getFareLineItems,
  queryKey: ["wsf", "fares", "farelineitems", "getFareLineItems"],
  cacheStrategy: "DAILY_STATIC",
});
