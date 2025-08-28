import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zPositiveInteger } from "@/shared/fetching/validation/schemas";

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

export const getVesselVerbose = async (): Promise<VesselVerbose[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselVerboseArraySchema,
  });
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

// ============================================================================
// TanStack Query Hooks
//
// useVesselVerboseById (singular item)
// useVesselVerbose (array)
// ============================================================================

export const useVesselVerboseById = (
  params: GetVesselVerboseByIdParams,
  options?: TanStackOptions<VesselVerbose>
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
  options?: TanStackOptions<VesselVerbose[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose"],
    queryFn: getVesselVerbose,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
