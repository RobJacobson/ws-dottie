import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const getVesselStats = async (
  params: GetVesselStatsParams = {}
): Promise<VesselStatsArray> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: vesselStatsArraySchema,
    },
    params
  );
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

export type VesselStatsArray = z.infer<typeof vesselStatsArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselStatsByIdOptions = (params: GetVesselStatsByIdParams) =>
  queryOptions({
    queryKey: ["wsf", "vessels", "stats", "getVesselStatsById", params],
    queryFn: () => getVesselStatsById(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselStatsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "stats", "getVesselStats"],
    queryFn: () => getVesselStats({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
