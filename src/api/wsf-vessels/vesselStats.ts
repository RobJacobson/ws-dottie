import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import { createVesselIdDescription } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";
import { vesselClassSchema } from "./vesselBasics";

// ============================================================================
// API Functions
//
// getVesselStatsById (singular item)
// getVesselStats (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselstats/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselstats";

export const getVesselStatsById = async (
  params: GetVesselStatsByIdParams
): Promise<VesselStats> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselStatsByIdParamsSchema,
      output: vesselStatsSchema,
    },
    params
  );
};

export const getVesselStats = async (): Promise<VesselStats[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselStatsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselStatsParamsSchema
// GetVesselStatsParams
// getVesselStatsByIdParamsSchema
// GetVesselStatsByIdParams
// ============================================================================

export const getVesselStatsParamsSchema = z.object({});

export type GetVesselStatsParams = z.infer<typeof getVesselStatsParamsSchema>;

export const getVesselStatsByIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselStatsSchema
// vesselStatsArraySchema
// VesselStats
// ============================================================================

export const vesselStatsSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  VesselNameDesc: z.string(),
  VesselHistory: zNullableString(),
  Beam: z.string(),
  CityBuilt: z.string(),
  SpeedInKnots: z.number(),
  Draft: z.string(),
  EngineCount: z.number(),
  Horsepower: z.number(),
  Length: z.string(),
  MaxPassengerCount: z.number(),
  PassengerOnly: z.boolean(),
  FastFerry: z.boolean(),
  PropulsionInfo: z.string(),
  TallDeckClearance: z.number(),
  RegDeckSpace: z.number(),
  TallDeckSpace: z.number(),
  Tonnage: z.number(),
  Displacement: z.number(),
  YearBuilt: z.number(),
  YearRebuilt: zNullableNumber(),
  VesselDrawingImg: zNullableString(),
  SolasCertified: z.boolean(),
  MaxPassengerCountForInternational: zNullableNumber(),
});

export type VesselStats = z.infer<typeof vesselStatsSchema>;

export const vesselStatsArraySchema = z.array(vesselStatsSchema);

// ============================================================================
// TanStack Query Hooks
//
// useVesselStatsById (singular item)
// useVesselStats (array)
// ============================================================================

export const useVesselStatsById = (
  params: GetVesselStatsByIdParams,
  options?: TanStackOptions<VesselStats>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats", JSON.stringify(params)],
    queryFn: () => getVesselStatsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useVesselStats = (options?: TanStackOptions<VesselStats[]>) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: getVesselStats,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
