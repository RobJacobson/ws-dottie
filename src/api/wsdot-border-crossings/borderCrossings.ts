import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
//
// getBorderCrossings
// ============================================================================

const ENDPOINT =
  "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson";

export const getBorderCrossings = async (
  params: GetBorderCrossingsParams = {}
): Promise<BorderCrossings> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getBorderCrossingsParamsSchema,
      output: borderCrossingDataArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getBorderCrossingsParamsSchema
// GetBorderCrossingsParams
// ============================================================================

export const getBorderCrossingsParamsSchema = z.object({});

export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// borderCrossingLocationSchema
// borderCrossingDataSchema
// borderCrossingDataArraySchema
// BorderCrossingLocation
// BorderCrossingData
// BorderCrossings
// ============================================================================

export const borderCrossingLocationSchema = z
  .object({
    Description: z.string(),
    Direction: zNullableString(),
    Latitude: zLatitude(),
    Longitude: zLongitude(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .nullable();

export type BorderCrossingLocation = z.infer<
  typeof borderCrossingLocationSchema
>;

export const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: borderCrossingLocationSchema.nullable(),
  CrossingName: z.string().nullable(),
  Time: zWsdotDate(),
  WaitTime: z.number(),
});

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

export const borderCrossingDataArraySchema = z.array(borderCrossingDataSchema);

export type BorderCrossings = z.infer<typeof borderCrossingDataArraySchema>;

// ==========================================================================
// TanStack Query Options
//
// borderCrossingsOptions
// ==========================================================================

export const borderCrossingsOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "border-crossings", "getBorderCrossings"],
    queryFn: () => getBorderCrossings({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
