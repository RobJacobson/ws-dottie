import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { vesselStatsSchema, type VesselStats } from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselStatsByIdParamsSchema
// GetVesselStatsByIdParams
// ============================================================================

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
// VesselStats (imported from vesselStats.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselStatsById (singular item)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselstats/{vesselId}";

export const getVesselStatsById = zodFetch<
  GetVesselStatsByIdParams,
  VesselStats
>(ENDPOINT_BY_ID, getVesselStatsByIdParamsSchema, vesselStatsSchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselStatsByIdOptions = createQueryOptions({
  apiFunction: getVesselStatsById,
  queryKey: ["wsf", "vessels", "stats", "getVesselStatsById"],
  cacheStrategy: "DAILY_STATIC",
});
