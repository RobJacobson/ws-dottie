import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";
import { vesselClassSchema } from "./vesselBasics";

// ============================================================================
// API Functions
//
// getVesselAccommodationsById (singular item)
// getVesselAccommodations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    },
    params
  );
};

export const getVesselAccommodations = async (): Promise<
  VesselAccommodation[]
> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselAccommodationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsParamsSchema
// GetVesselAccommodationsParams
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationSchema
// vesselAccommodationArraySchema
// VesselAccommodation
// ============================================================================

export const vesselAccommodationSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  CarDeckRestroom: z.boolean(),
  CarDeckShelter: z.boolean(),
  Elevator: z.boolean(),
  ADAAccessible: z.boolean(),
  MainCabinGalley: z.boolean(),
  MainCabinRestroom: z.boolean(),
  PublicWifi: z.boolean(),
  ADAInfo: z.string(),
  AdditionalInfo: zNullableString(),
});

export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

export const vesselAccommodationArraySchema = z.array(
  vesselAccommodationSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useVesselAccommodationsById (singular item)
// useVesselAccommodations (array)
// ============================================================================

export const useVesselAccommodationsById = (
  params: GetVesselAccommodationsByIdParams,
  options?: TanStackOptions<VesselAccommodation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations", JSON.stringify(params)],
    queryFn: () => getVesselAccommodationsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useVesselAccommodations = (
  options?: TanStackOptions<VesselAccommodation[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
