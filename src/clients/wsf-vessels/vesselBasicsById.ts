import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { vesselBasicsSchema, type VesselBasics } from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselBasicsByIdParamsSchema
// GetVesselBasicsByIdParams
// ============================================================================

export const getVesselBasicsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselBasicsSchema (imported from vesselBasics.zod)
// VesselBasics (imported from vesselBasics.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getVesselBasicsById (singular item)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselbasics/{vesselId}";

export const getVesselBasicsById = zodFetch<
  GetVesselBasicsByIdParams,
  VesselBasics
>(ENDPOINT_BY_ID, getVesselBasicsByIdParamsSchema, vesselBasicsSchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselBasicsByIdOptions = createQueryOptions({
  apiFunction: getVesselBasicsById,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasicsById"],
  cacheStrategy: "DAILY_STATIC",
});
