import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselLocationsArraySchema,
  type VesselLocationsArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsParamsSchema
// GetVesselLocationsParams
// ============================================================================

export const getVesselLocationsParamsSchema = z.object({});

export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselLocationsArraySchema (imported from vesselLocations.zod)
// VesselLocationsArray (imported from vesselLocations.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselLocationsArraySchema };
export type { VesselLocationsArray };

// ============================================================================
// API Functions
//
// getVesselLocations (array)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

export const getVesselLocations = zodFetch<
  GetVesselLocationsParams,
  VesselLocationsArray
>(ENDPOINT_ALL, getVesselLocationsParamsSchema, vesselLocationsArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselLocationsOptions = createQueryOptions({
  apiFunction: getVesselLocations,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
  cacheStrategy: "REALTIME_UPDATES",
});
