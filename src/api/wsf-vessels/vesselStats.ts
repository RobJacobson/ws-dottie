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

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
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
// getVesselStatsByIdParamsSchema
// GetVesselStatsByIdParams
// ============================================================================

export const getVesselStatsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

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

export const vesselStatsSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: vesselClassSchema.describe(""),
    VesselNameDesc: z.string().describe(""),
    VesselHistory: zNullableString().describe(""),
    Beam: z.string().describe(""),
    CityBuilt: z.string().describe(""),
    SpeedInKnots: z.number().describe(""),
    Draft: z.string().describe(""),
    EngineCount: z.number().describe(""),
    Horsepower: z.number().describe(""),
    Length: z.string().describe(""),
    MaxPassengerCount: z.number().describe(""),
    PassengerOnly: z.boolean().describe(""),
    FastFerry: z.boolean().describe(""),
    PropulsionInfo: z.string().describe(""),
    TallDeckClearance: z.number().describe(""),
    RegDeckSpace: z.number().describe(""),
    TallDeckSpace: z.number().describe(""),
    Tonnage: z.number().describe(""),
    Displacement: z.number().describe(""),
    YearBuilt: z.number().describe(""),
    YearRebuilt: zNullableNumber().describe(""),
    VesselDrawingImg: zNullableString().describe(""),
    SolasCertified: z.boolean().describe(""),
    MaxPassengerCountForInternational: zNullableNumber().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const vesselStatsArraySchema = z.array(vesselStatsSchema).describe("");

export type VesselStats = z.infer<typeof vesselStatsSchema>;

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

export const useVesselStats = (
  options?: TanStackOptions<VesselStats[]>
): UseQueryResult<VesselStats[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: getVesselStats,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
