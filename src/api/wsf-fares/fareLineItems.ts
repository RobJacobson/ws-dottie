import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";

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
): Promise<FareLineItem[]> => {
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
): Promise<FareLineItem[]> => {
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

export const getFareLineItemsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
  })
  .describe("");

export const getFareLineItemsBasicParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
    roundTrip: z.boolean().describe(""),
  })
  .describe("");

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

export const fareLineItemSchema = z
  .object({
    LineItemID: z.number().int().positive().describe(""),
    LineItemDescription: z.string().describe(""),
    LineItemType: z.string().describe(""),
    LineItemAmount: z.number().positive().describe(""),
    LineItemSortOrder: z.number().int().min(0).describe(""),
    LineItemNotes: z.string().nullable().describe(""),
  })
  .describe("");

export const fareLineItemsArraySchema = z.array(fareLineItemSchema);
export const fareLineItemsBasicArraySchema = z.array(fareLineItemSchema);

export type FareLineItem = z.infer<typeof fareLineItemSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItems (all fare line items)
// useFareLineItemsBasic (most popular fare line items)
// ============================================================================

export const useFareLineItems = (
  params: GetFareLineItemsParams,
  options?: UseQueryOptions<FareLineItem[], Error>
): UseQueryResult<FareLineItem[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "lineItems",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItems(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useFareLineItemsBasic = (
  params: GetFareLineItemsBasicParams,
  options?: UseQueryOptions<FareLineItem[], Error>
): UseQueryResult<FareLineItem[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "lineItemsBasic",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItemsBasic(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
