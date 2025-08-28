import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripInfo
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

export const getTollTripInfo = async (): Promise<TollTripInfo[]> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripInfoParamsSchema,
    output: tollTripInfoArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripInfoParamsSchema
// GetTollTripInfoParams
// ============================================================================

export const getTollTripInfoParamsSchema = z.object({});

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// tollTripInfoSchema
// TollTripInfo
// ============================================================================

export const tollTripInfoSchema = z.object({
  EndLocationName: z.string().nullable(),
  EndMilepost: z.number(),
  Geometry: z.string(),
  ModifiedDate: zWsdotDate().nullable(),
  StartLocationName: z.string().nullable(),
  StartMilepost: z.number(),
  TravelDirection: z.string().nullable(),
  TripName: z.string().nullable(),
});

export const tollTripInfoArraySchema = z.array(tollTripInfoSchema);

export type TollTripInfo = z.infer<typeof tollTripInfoSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripInfo
// ============================================================================

export const useTollTripInfo = (
  params: GetTollTripInfoParams,
  options?: UseQueryOptions<TollTripInfo[], Error>
) => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
    queryFn: () => getTollTripInfo(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
