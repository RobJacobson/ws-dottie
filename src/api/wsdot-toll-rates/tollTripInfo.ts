import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
//
// getTollTripInfo
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson";

export const getTollTripInfo = async (
  params: GetTollTripInfoParams = {}
): Promise<TollTripInfos> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripInfoParamsSchema,
      output: tollTripInfoArraySchema,
    },
    params
  );
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

export type TollTripInfos = z.infer<typeof tollTripInfoArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const tollTripInfoOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
    queryFn: () => getTollTripInfo({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
