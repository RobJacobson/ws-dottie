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
// getVesselBasicsById (singular item)
// getVesselBasics (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselbasics/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselbasics";

export const getVesselBasicsById = async (
  params: GetVesselBasicsByIdParams
): Promise<VesselBasic> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselBasicsByIdParamsSchema,
      output: vesselBasicSchema,
    },
    params
  );
};

export const getVesselBasics = async (
  params: GetVesselBasicsParams = {}
): Promise<VesselBasics> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselBasicArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselBasicsParamsSchema
// GetVesselBasicsParams
// getVesselBasicsByIdParamsSchema
// GetVesselBasicsByIdParams
// ============================================================================

export const getVesselBasicsParamsSchema = z.object({});

export type GetVesselBasicsParams = z.infer<typeof getVesselBasicsParamsSchema>;

export const getVesselBasicsByIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselBasicSchema
// vesselBasicArraySchema
// VesselBasic
// VesselClass
// ============================================================================

export const vesselClassSchema = z.object({
  ClassID: z.number(),
  ClassSubjectID: z.number(),
  ClassName: z.string(),
  SortSeq: z.number(),
  DrawingImg: z.string(),
  SilhouetteImg: z.string(),
  PublicDisplayName: z.string(),
});

export const vesselBasicSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  Status: z.number(),
  OwnedByWSF: z.boolean(),
});

export type VesselBasic = z.infer<typeof vesselBasicSchema>;

export type VesselClass = z.infer<typeof vesselClassSchema>;

export const vesselBasicArraySchema = z.array(vesselBasicSchema);

export type VesselBasics = z.infer<typeof vesselBasicArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselBasicsByIdOptions = (params: GetVesselBasicsByIdParams) =>
  queryOptions({
    queryKey: ["wsf", "vessels", "basics", "getVesselBasicsById", params],
    queryFn: () => getVesselBasicsById(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselBasicsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "basics", "getVesselBasics"],
    queryFn: () => getVesselBasics({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
