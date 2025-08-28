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

/**
 * VesselBasics type - represents an array of vessel basic objects
 */
export type VesselBasics = z.infer<typeof vesselBasicArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useVesselBasicsById (singular item)
// useVesselBasics (array)
// ============================================================================

export const useVesselBasicsById = (
  params: { vesselId: number },
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics", JSON.stringify(params)],
    queryFn: () => getVesselBasicsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useVesselBasics = (
  params: GetVesselBasicsParams = {},
  options?: UseQueryOptions<VesselBasics>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: () => getVesselBasics(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
