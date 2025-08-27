import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripVersion
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson";

export const getTollTripVersion = async (): Promise<TollTripVersion> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripVersionParamsSchema,
    output: tollTripVersionSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripVersionParamsSchema
// GetTollTripVersionParams
// ============================================================================

export const getTollTripVersionParamsSchema = z.object({}).describe("");

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripVersionSchema
// TollTripVersion
// ============================================================================

export const tollTripVersionSchema = z
  .object({
    Version: z.number().describe(""),
  })
  
  .describe("");

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripVersion
// ============================================================================

export const useTollTripVersion = (
  options?: TanStackOptions<TollTripVersion>
): UseQueryResult<TollTripVersion, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripVersion"],
    queryFn: () => getTollTripVersion(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
