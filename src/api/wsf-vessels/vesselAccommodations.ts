import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

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

export const getVesselAccommodations = async (
  params: GetVesselAccommodationsParams = {}
): Promise<VesselAccommodations> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselAccommodationArraySchema,
    },
    params
  );
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

/**
 * VesselAccommodations type - represents an array of vessel accommodation objects
 */
export type VesselAccommodations = z.infer<
  typeof vesselAccommodationArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselAccommodationsById (singular item)
// useVesselAccommodations (array)
// ============================================================================

export const useVesselAccommodationsById = (
  params: GetVesselAccommodationsByIdParams,
  options?: UseQueryOptions
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
  params: GetVesselAccommodationsParams = {},
  options?: UseQueryOptions<VesselAccommodations>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: () => getVesselAccommodations(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
