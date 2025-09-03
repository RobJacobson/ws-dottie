import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zPositiveInteger } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export type VesselVerboses = z.infer<typeof vesselVerboseArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselVerboseByIdOptions = (params: GetVesselVerboseByIdParams) =>
  queryOptions({
    queryKey: ["wsf", "vessels", "verbose", "getVesselVerboseById", params],
    queryFn: () => getVesselVerboseById(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselVerboseOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "verbose", "getVesselVerbose"],
    queryFn: () => getVesselVerbose({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
