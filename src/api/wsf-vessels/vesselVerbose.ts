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

export const getVesselVerboseParamsSchema = z.object({}).describe("");

export type GetVesselVerboseParams = z.infer<
  typeof getVesselVerboseParamsSchema
>;

export const getVesselVerboseByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

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

export const vesselVerboseSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: z
      .object({
        ClassID: z.number().describe(""),
        ClassSubjectID: z.number().describe(""),
        ClassName: z.string().describe(""),
        SortSeq: z.number().describe(""),
        DrawingImg: z.string().describe(""),
        SilhouetteImg: z.string().describe(""),
        PublicDisplayName: z.string().describe(""),
      })
      .describe(""),
    Status: z.number().describe(""),
    OwnedByWSF: z.boolean().describe(""),
    YearBuilt: z.number().describe(""),
    Displacement: z.number().describe(""),
    Length: z.string().describe(""),
    Beam: z.string().describe(""),
    Draft: z.string().describe(""),
    SpeedInKnots: z.number().describe(""),
    EngineCount: z.number().describe(""),
    Horsepower: z.number().describe(""),
    MaxPassengerCount: z.number().describe(""),
    RegDeckSpace: z.number().describe(""),
    TallDeckSpace: z.number().describe(""),
    Tonnage: z.number().describe(""),
    PropulsionInfo: z.string().describe(""),
    ADAAccessible: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    CarDeckRestroom: z.boolean().describe(""),
    MainCabinGalley: z.boolean().describe(""),
    MainCabinRestroom: z.boolean().describe(""),
    PublicWifi: z.boolean().describe(""),
    ADAInfo: z.string().describe(""),
    VesselNameDesc: z.string().describe(""),
    VesselHistory: z.string().nullable().describe(""),
    CityBuilt: z.string().describe(""),
    YearRebuilt: z.number().nullable().describe(""),
    CarDeckShelter: z.boolean().describe(""),
    AdditionalInfo: z.string().nullable().describe(""),
  })

  .describe("");

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

export const vesselVerboseArraySchema = z
  .array(vesselVerboseSchema)
  .describe("");

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
