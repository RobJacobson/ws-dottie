import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getTollTripVersion
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson";

export const getTollTripVersion = async (
  params: GetTollTripVersionParams = {}
): Promise<TollTripVersion> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripVersionParamsSchema,
      output: tollTripVersionSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTollTripVersionParamsSchema
// GetTollTripVersionParams
// ============================================================================

export const getTollTripVersionParamsSchema = z.object({});

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripVersionSchema
// TollTripVersion
// ============================================================================

export const tollTripVersionSchema = z.object({
  Version: z.number(),
});

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripVersion
// ============================================================================

export const useTollTripVersion = createUseQueryWsdot({
  queryFn: getTollTripVersion,
  queryKeyPrefix: ["wsdot", "toll-rates", "getTollTripVersion"],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});
