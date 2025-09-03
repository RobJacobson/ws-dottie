import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const fareLineItemsOptions = (params: GetFareLineItemsParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "fareLineItems",
      "getFareLineItems",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFareLineItems(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const fareLineItemsBasicOptions = (
  params: GetFareLineItemsBasicParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "fareLineItems",
      "getFareLineItemsBasic",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFareLineItemsBasic(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
