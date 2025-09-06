import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  fareLineItemSchema,
  fareLineItemsSchema as fareLineItemsArraySchema,
  type FareLineItem,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// getFareLineItemsParamsSchema
// getFareLineItemsBasicParamsSchema
// GetFareLineItemsParams
// GetFareLineItemsBasicParams
// ============================================================================

export const getFareLineItemsParamsSchema = z.object({
  tripDate: z.date(),
  departingFaresTerminalID: z.number().int().positive(),
  arrivingFaresTerminalID: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export const getFareLineItemsBasicParamsSchema = z.object({
  tripDate: z.date(),
  departingFaresTerminalID: z.number().int().positive(),
  arrivingFaresTerminalID: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;

export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// fareLineItemSchema (imported from fareLineItems.zod)
// fareLineItemsArraySchema (imported from fareLineItems.zod)
// fareLineItemsBasicArraySchema (same as fareLineItemsArraySchema)
// FareLineItem (imported from fareLineItems.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { fareLineItemSchema, fareLineItemsArraySchema };
export const fareLineItemsBasicArraySchema = fareLineItemsArraySchema;
export type { FareLineItem };
export type FareLineItems = z.infer<typeof fareLineItemsArraySchema>;
export type FareLineItemsBasic = z.infer<typeof fareLineItemsBasicArraySchema>;

// ============================================================================
// API Functions
//
// getFareLineItems (all fare line items)
// getFareLineItemsBasic (most popular fare line items)
// ============================================================================

const ENDPOINT_ALL =
  "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingFaresTerminalID}/{arrivingFaresTerminalID}/{roundTrip}";
const ENDPOINT_BASIC =
  "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingFaresTerminalID}/{arrivingFaresTerminalID}/{roundTrip}";

export const getFareLineItems = zodFetch<
  GetFareLineItemsParams, FareLineItems
>(
  ENDPOINT_ALL,
  getFareLineItemsParamsSchema,
  fareLineItemsArraySchema
);

export const getFareLineItemsBasic = zodFetch<
  GetFareLineItemsBasicParams, FareLineItemsBasic
>(
  ENDPOINT_BASIC,
  getFareLineItemsBasicParamsSchema,
  fareLineItemsBasicArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItems (all fare line items)
// useFareLineItemsBasic (most popular fare line items)
// ============================================================================

export const fareLineItemsOptions = createQueryOptions({
  apiFunction: getFareLineItems,
  queryKey: ["wsf", "fares", "fareLineItems", "getFareLineItems"],
  cacheStrategy: "DAILY_STATIC",
});

export const fareLineItemsBasicOptions = createQueryOptions({
  apiFunction: getFareLineItemsBasic,
  queryKey: ["wsf", "fares", "fareLineItems", "getFareLineItemsBasic"],
  cacheStrategy: "DAILY_STATIC",
});
