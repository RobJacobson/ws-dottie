import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselAccommodationsSchema,
  vesselAccommodationsArraySchema,
  type VesselAccommodations,
  type VesselAccommodationsArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsParamsSchema
// GetVesselAccommodationsParams
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

export const getVesselAccommodationsByIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationsSchema (imported from vesselAccommodations.zod)
// vesselAccommodationsArraySchema (imported from vesselAccommodations.zod)
// VesselAccommodations (imported from vesselAccommodations.zod)
// VesselAccommodationsArray (imported from vesselAccommodations.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselAccommodationsSchema, vesselAccommodationsArraySchema };
export type { VesselAccommodations, VesselAccommodationsArray };


// ============================================================================
// API Functions
//
// getVesselAccommodationsById (singular item)
// getVesselAccommodations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

export const getVesselAccommodationsById = zodFetch<
  GetVesselAccommodationsByIdParams, VesselAccommodations
>(
  ENDPOINT_BY_ID,
  getVesselAccommodationsByIdParamsSchema,
  vesselAccommodationsSchema
);

export const getVesselAccommodations = zodFetch<
  GetVesselAccommodationsParams, VesselAccommodationsArray
>(
  ENDPOINT_ALL,
  getVesselAccommodationsParamsSchema,
  vesselAccommodationsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselAccommodationsByIdOptions = createQueryOptions({
  apiFunction: getVesselAccommodationsById,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodationsById"],
  cacheStrategy: "DAILY_STATIC",
});

export const vesselAccommodationsOptions = createQueryOptions({
  apiFunction: getVesselAccommodations,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodations"],
  cacheStrategy: "DAILY_STATIC",
});
