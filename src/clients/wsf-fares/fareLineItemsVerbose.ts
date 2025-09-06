import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  fareLineItemsVerboseSchema,
  type FareLineItemsVerbose,
} from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
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
// Output Schemas & Types
//
// fareLineItemsVerboseSchema (imported from fareLineItemsVerbose.zod)
// FareLineItemsVerbose (imported from fareLineItemsVerbose.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getFareLineItemsVerbose (verbose fare line items)
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

export const getFareLineItemsVerbose = zodFetch<
  GetFareLineItemsVerboseParams,
  FareLineItemsVerbose
>(ENDPOINT, getFareLineItemsVerboseParamsSchema, fareLineItemsVerboseSchema);

// ============================================================================
// TanStack Query Hooks
//
// useFareLineItemsVerbose
// ============================================================================

export const fareLineItemsVerboseOptions = createQueryOptions({
  apiFunction: getFareLineItemsVerbose,
  queryKey: ["wsf", "fares", "farelineitemsverbose", "getFareLineItemsVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
