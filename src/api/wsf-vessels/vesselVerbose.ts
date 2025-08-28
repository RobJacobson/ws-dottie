import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zPositiveInteger } from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getVesselVerboseById (singular item)
// getVesselVerbose (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselverbose";

export const getVesselVerboseById = async (
  params: GetVesselVerboseByIdParams
): Promise<VesselVerbose> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselVerboseByIdParamsSchema,
      output: vesselVerboseSchema,
    },
    params
  );
};

export const getVesselVerbose = async (
  params: GetVesselVerboseParams = {}
): Promise<VesselVerboses> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseParamsSchema
// GetVesselVerboseParams
// getVesselVerboseByIdParamsSchema
// GetVesselVerboseByIdParams
// ============================================================================

export const getVesselVerboseParamsSchema = z.object({});

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

export const getVesselVerboseByIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselVerboseSchema
// vesselVerboseArraySchema
// VesselVerbose
// ============================================================================

export const vesselVerboseSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: z.object({
    ClassID: z.number(),
    ClassSubjectID: z.number(),
    ClassName: z.string(),
    SortSeq: z.number(),
    DrawingImg: z.string(),
    SilhouetteImg: z.string(),
    PublicDisplayName: z.string(),
  }),
  Status: z.number(),
  OwnedByWSF: z.boolean(),
  YearBuilt: z.number(),
  Displacement: z.number(),
  Length: z.string(),
  Beam: z.string(),
  Draft: z.string(),
  SpeedInKnots: z.number(),
  EngineCount: z.number(),
  Horsepower: z.number(),
  MaxPassengerCount: z.number(),
  RegDeckSpace: z.number(),
  TallDeckSpace: z.number(),
  Tonnage: z.number(),
  PropulsionInfo: z.string(),
  ADAAccessible: z.boolean(),
  Elevator: z.boolean(),
  CarDeckRestroom: z.boolean(),
  MainCabinGalley: z.boolean(),
  MainCabinRestroom: z.boolean(),
  PublicWifi: z.boolean(),
  ADAInfo: z.string(),
  VesselNameDesc: z.string(),
  VesselHistory: z.string().nullable(),
  CityBuilt: z.string(),
  YearRebuilt: z.number().nullable(),
  CarDeckShelter: z.boolean(),
  AdditionalInfo: z.string().nullable(),
});

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

export const vesselVerboseArraySchema = z.array(vesselVerboseSchema);

/**
 * VesselVerboses type - represents an array of vessel verbose objects
 */
export type VesselVerboses = z.infer<typeof vesselVerboseArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselVerboseById (singular item)
// useVesselVerbose (array)
// ============================================================================

export const useVesselVerboseById = (
  params: GetVesselVerboseByIdParams,
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose", JSON.stringify(params)],
    queryFn: () => getVesselVerboseById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useVesselVerbose = (
  params: GetVesselVerboseParams = {},
  options?: UseQueryOptions<VesselVerboses>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose"],
    queryFn: () => getVesselVerbose(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
