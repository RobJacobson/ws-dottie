import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselAccommodationsArraySchema,
  type VesselAccommodationsArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsParamsSchema
// GetVesselAccommodationsParams
// ============================================================================

export const getVesselAccommodationsParamsSchema = z.object({});

export type GetVesselAccommodationsParams = z.infer<
  typeof getVesselAccommodationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationsArraySchema (imported from vesselAccommodations.zod)
// VesselAccommodationsArray (imported from vesselAccommodations.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselAccommodationsArraySchema };
export type { VesselAccommodationsArray };

// ============================================================================
// API Functions
//
// getVesselAccommodations (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

export const getVesselAccommodations = zodFetch<
  GetVesselAccommodationsParams,
  VesselAccommodationsArray
>(
  ENDPOINT_ALL,
  getVesselAccommodationsParamsSchema,
  vesselAccommodationsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselAccommodationsOptions = createQueryOptions({
  apiFunction: getVesselAccommodations,
  queryKey: ["wsf", "vessels", "accommodations", "getVesselAccommodations"],
  cacheStrategy: "DAILY_STATIC",
});
