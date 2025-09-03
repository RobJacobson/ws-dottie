import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";
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

export const fareLineItemsVerboseOptions = (
  params: GetFareLineItemsVerboseParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "fareLineItems",
      "getFareLineItemsVerbose",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFareLineItemsVerbose(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
