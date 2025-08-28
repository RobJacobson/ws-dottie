import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getFareLineItems (all fare line items)
// getFareLineItemsBasic (most popular fare line items)
// ============================================================================

const ENDPOINT_ALL =
  "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}";
const ENDPOINT_BASIC =
  "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}";

export const getFareLineItems = async (
  params: GetFareLineItemsParams
): Promise<FareLineItems> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getFareLineItemsParamsSchema,
      output: fareLineItemsArraySchema,
    },
    params
  );
};

export const getFareLineItemsBasic = async (
  params: GetFareLineItemsBasicParams
): Promise<FareLineItemsBasic> => {
  return zodFetch(
    ENDPOINT_BASIC,
    {
      input: getFareLineItemsBasicParamsSchema,
      output: fareLineItemsBasicArraySchema,
    },
    params
  );
};

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
  departingTerminalID: z.number().int().positive(),
  arrivingTerminalID: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export const getFareLineItemsBasicParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalID: z.number().int().positive(),
  arrivingTerminalID: z.number().int().positive(),
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
// fareLineItemSchema
// fareLineItemsArraySchema
// fareLineItemsBasicArraySchema
// FareLineItem
// ============================================================================

export const fareLineItemSchema = z.object({
  FareLineItemID: z.number().int().positive(),
  FareLineItem: z.string(),
  Category: z.string(),
  DirectionIndependent: z.boolean(),
  Amount: z.number().min(0),
});

export const fareLineItemsArraySchema = z.array(fareLineItemSchema);

export const fareLineItemsBasicArraySchema = z.array(fareLineItemSchema);

export type FareLineItem = z.infer<typeof fareLineItemSchema>;

/**
 * FareLineItems type - represents an array of fare line item objects
 */
export type FareLineItems = z.infer<typeof fareLineItemsArraySchema>;

/**
 * FareLineItemsBasic type - represents an array of basic fare line item objects
 */
export type FareLineItemsBasic = z.infer<typeof fareLineItemsBasicArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItems (all fare line items)
// useFareLineItemsBasic (most popular fare line items)
// ============================================================================

export const useFareLineItems = createUseQueryWsf({
  queryFn: getFareLineItems,
  queryKeyPrefix: ["wsf", "fares", "fareLineItems", "getFareLineItems"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});

export const useFareLineItemsBasic = createUseQueryWsf({
  queryFn: getFareLineItemsBasic,
  queryKeyPrefix: ["wsf", "fares", "fareLineItems", "getFareLineItemsBasic"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});
