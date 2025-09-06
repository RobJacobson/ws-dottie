import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselHistoryArraySchema,
  type VesselHistoryArray as VesselHistoryArrayType,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselHistoryParamsSchema
// GetVesselHistoryParams
// ============================================================================

export const getVesselHistoryParamsSchema = z.object({});

export type GetVesselHistoryParams = z.infer<
  typeof getVesselHistoryParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselHistoryArraySchema (imported from vesselHistory.zod)
// VesselHistoryArray (imported from vesselHistory.zod)
// ============================================================================

// VesselHistory and VesselHistoryArray types are exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselHistory (all vessels)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselhistory";

export const getVesselHistory = zodFetch<
  GetVesselHistoryParams,
  VesselHistoryArrayType
>(ENDPOINT_ALL, getVesselHistoryParamsSchema, vesselHistoryArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselHistoryOptions = createQueryOptions({
  apiFunction: getVesselHistory,
  queryKey: ["wsf", "vessels", "history", "getVesselHistory"],
  cacheStrategy: "DAILY_STATIC",
});
