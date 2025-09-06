import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselBasicsArraySchema,
  type VesselBasicsArray,
} from "@/schemas/wsf-vessels";
import { vesselClassSchema } from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselBasicsParamsSchema
// GetVesselBasicsParams
// ============================================================================

export const getVesselBasicsParamsSchema = z.object({});

export type GetVesselBasicsParams = z.infer<typeof getVesselBasicsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// vesselBasicsArraySchema (imported from vesselBasics.zod)
// VesselBasicsArray (imported from vesselBasics.zod)
// vesselClassSchema (imported from class.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselBasicsArraySchema, vesselClassSchema };
export type { VesselBasicsArray };

// VesselClass type is exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselBasics (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselbasics";

export const getVesselBasics = zodFetch<
  GetVesselBasicsParams,
  VesselBasicsArray
>(ENDPOINT_ALL, getVesselBasicsParamsSchema, vesselBasicsArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselBasicsOptions = createQueryOptions({
  apiFunction: getVesselBasics,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasics"],
  cacheStrategy: "DAILY_STATIC",
});
