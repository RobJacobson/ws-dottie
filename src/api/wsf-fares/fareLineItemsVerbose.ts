import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { fareLineItemSchema } from "./fareLineItems";
import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";
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

export const getFareLineItemsVerboseParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

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

export const lineItemLookupSchema = z
  .object({
    TerminalComboIndex: z.number().int().min(0).describe(""),
    LineItemIndex: z.number().int().min(0).describe(""),
    RoundTripLineItemIndex: z.number().int().min(0).describe(""),
  })
  
  .describe("");

export const fareLineItemsVerboseResponseSchema = z
  .object({
    TerminalComboVerbose: z
      .array(terminalComboVerboseExtendedSchema)
      .describe(""),
    LineItemLookup: z.array(lineItemLookupSchema).describe(""),
    LineItems: z.array(z.array(fareLineItemSchema)).describe(""),
    RoundTripLineItems: z.array(z.array(fareLineItemSchema)).describe(""),
  })
  
  .describe("");

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
  options?: Omit<
    UseQueryOptions<FareLineItemsVerboseResponse, Error>,
    "queryKey" | "queryFn"
  >
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
