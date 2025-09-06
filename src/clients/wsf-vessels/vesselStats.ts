import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselStatsArraySchema,
  type VesselStatsArray,
} from "@/schemas/wsf-vessels";
import { vesselClassSchema } from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselStatsParamsSchema
// GetVesselStatsParams
// ============================================================================

export const getVesselStatsParamsSchema = z.object({});

export type GetVesselStatsParams = z.infer<typeof getVesselStatsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// vesselStatsArraySchema (imported from vesselStats.zod)
// vesselClassSchema (imported from class.zod)
// VesselStatsArray (imported from vesselStats.zod)
// VesselClass (imported from class.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselStatsArraySchema, vesselClassSchema };
export type { VesselStatsArray };
// VesselClass type is exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselStats (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselstats";

export const getVesselStats = zodFetch<GetVesselStatsParams, VesselStatsArray>(
  ENDPOINT_ALL,
  getVesselStatsParamsSchema,
  vesselStatsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselStatsOptions = createQueryOptions({
  apiFunction: getVesselStats,
  queryKey: ["wsf", "vessels", "stats", "getVesselStats"],
  cacheStrategy: "DAILY_STATIC",
});
