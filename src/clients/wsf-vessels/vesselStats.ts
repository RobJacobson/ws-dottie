import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselStatsSchema,
  vesselStatsArraySchema,
  type VesselStats,
  type VesselStatsArray,
} from "@/schemas/wsf-vessels";
import { vesselClassSchema, type VesselClass } from "@/schemas/wsf-vessels";

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
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselStatsSchema (imported from vesselStats.zod)
// vesselStatsArraySchema (imported from vesselStats.zod)
// vesselClassSchema (imported from class.zod)
// VesselStats (imported from vesselStats.zod)
// VesselClass (imported from class.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselStatsSchema, vesselStatsArraySchema, vesselClassSchema };
export type { VesselStats, VesselStatsArray };
// VesselClass type is exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselStatsById (singular item)
// getVesselStats (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselstats/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselstats";

export const getVesselStatsById = zodFetch<
  GetVesselStatsByIdParams,
  VesselStats
>(ENDPOINT_BY_ID, getVesselStatsByIdParamsSchema, vesselStatsSchema);

export const getVesselStats = zodFetch<GetVesselStatsParams, VesselStatsArray>(
  ENDPOINT_ALL,
  getVesselStatsParamsSchema,
  vesselStatsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselStatsByIdOptions = createQueryOptions({
  apiFunction: getVesselStatsById,
  queryKey: ["wsf", "vessels", "stats", "getVesselStatsById"],
  cacheStrategy: "DAILY_STATIC",
});

export const vesselStatsOptions = createQueryOptions({
  apiFunction: getVesselStats,
  queryKey: ["wsf", "vessels", "stats", "getVesselStats"],
  cacheStrategy: "DAILY_STATIC",
});
