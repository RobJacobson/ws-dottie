import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselBasicsSchema,
  vesselBasicsArraySchema,
  type VesselBasics,
  type VesselBasicsArray,
} from "@/schemas/wsf-vessels";
import { vesselClassSchema } from "@/schemas/wsf-vessels";

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
// vesselBasicsArraySchema (imported from vesselBasics.zod)
// VesselBasics (imported from vesselBasics.zod)
// VesselBasicsArray (imported from vesselBasics.zod)
// vesselClassSchema (imported from class.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselBasicsSchema, vesselBasicsArraySchema, vesselClassSchema };
export type { VesselBasics, VesselBasicsArray };

// VesselClass type is exported from centralized schemas

// ============================================================================
// API Functions
//
// getVesselBasicsById (singular item)
// getVesselBasics (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselbasics/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselbasics";

export const getVesselBasicsById = zodFetch<
  GetVesselBasicsByIdParams,
  VesselBasics
>(ENDPOINT_BY_ID, getVesselBasicsByIdParamsSchema, vesselBasicsSchema);

export const getVesselBasics = zodFetch<
  GetVesselBasicsParams,
  VesselBasicsArray
>(ENDPOINT_ALL, getVesselBasicsParamsSchema, vesselBasicsArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselBasicsByIdOptions = createQueryOptions({
  apiFunction: getVesselBasicsById,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasicsById"],
  cacheStrategy: "DAILY_STATIC",
});

export const vesselBasicsOptions = createQueryOptions({
  apiFunction: getVesselBasics,
  queryKey: ["wsf", "vessels", "basics", "getVesselBasics"],
  cacheStrategy: "DAILY_STATIC",
});
