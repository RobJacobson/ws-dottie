import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { fareLineItemSchema } from "./fareLineItems";
import { terminalComboVerboseSchema } from "@/schemas/wsf-fares";

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

export const lineItemLookupSchema = z.object({
  FaresTerminalComboIndex: z.number().int().min(0),
  LineItemIndex: z.number().int().min(0),
  RoundTripLineItemIndex: z.number().int().min(0),
});

export const fareLineItemsVerboseResponseSchema = z.object({
  FaresTerminalComboVerbose: z.array(terminalComboVerboseSchema),
  LineItemLookup: z.array(lineItemLookupSchema),
  LineItems: z.array(z.array(fareLineItemSchema)),
  RoundTripLineItems: z.array(z.array(fareLineItemSchema)),
});

// ============================================================================
// API Function
//
// getFareLineItemsVerbose
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

export const getFareLineItemsVerbose = zodFetch<
  GetFareLineItemsVerboseParams,
  FareLineItemsVerboseResponse
>(
  ENDPOINT,
  getFareLineItemsVerboseParamsSchema,
  fareLineItemsVerboseResponseSchema
);

export type FaresTerminalComboVerbose = z.infer<
  typeof terminalComboVerboseSchema
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

export const fareLineItemsVerboseOptions = createQueryOptions({
  apiFunction: getFareLineItemsVerbose,
  queryKey: ["wsf", "fares", "fareLineItems", "getFareLineItemsVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
