import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";
import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";
import { fareLineItemSchema } from "./fareLineItems";
import { terminalComboVerboseSchema } from "./terminalCombo";

// ============================================================================
// API Function
//
// getFareLineItemsVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

export const getFareLineItemsVerbose = async (
  params: GetFareLineItemsVerboseParams
): Promise<FareLineItemsVerboseResponse> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFareLineItemsVerboseParamsSchema,
      output: fareLineItemsVerboseResponseSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFareLineItemsVerboseParamsSchema
// GetFareLineItemsVerboseParams
// ============================================================================

export const getFareLineItemsVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// fareLineItemsVerboseResponseSchema
// FareLineItemsVerboseResponse
// ============================================================================

// Import the terminal combo verbose schema
export const terminalComboVerboseExtendedSchema = terminalComboVerboseSchema;

// Import the fare line item schema from getFareLineItems

export const lineItemLookupSchema = z.object({
  TerminalComboIndex: z.number().int().min(0),
  LineItemIndex: z.number().int().min(0),
  RoundTripLineItemIndex: z.number().int().min(0),
});

export const fareLineItemsVerboseResponseSchema = z.object({
  TerminalComboVerbose: z.array(terminalComboVerboseExtendedSchema),
  LineItemLookup: z.array(lineItemLookupSchema),
  LineItems: z.array(z.array(fareLineItemSchema)),
  RoundTripLineItems: z.array(z.array(fareLineItemSchema)),
});

export type TerminalComboVerbose = z.infer<
  typeof terminalComboVerboseExtendedSchema
>;

export type LineItemLookup = z.infer<typeof lineItemLookupSchema>;
export type FareLineItemsVerboseResponse = z.infer<
  typeof fareLineItemsVerboseResponseSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useFareLineItemsVerbose
// ============================================================================

export const useFareLineItemsVerbose = (
  params: {
    tripDate: Date;
  },
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "fareLineItemsVerbose", JSON.stringify(params)],
    queryFn: () =>
      getFareLineItemsVerbose({
        tripDate: params.tripDate,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
