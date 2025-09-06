import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  vesselLocationsSchema,
  vesselLocationsArraySchema,
  type VesselLocations,
  type VesselLocationsArray,
} from "@/schemas/wsf-vessels";

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z
    .number()
    .int()
    .positive()
    .describe(
      "Positive integer identifier for vessel. Must be greater than 0. Used to uniquely identify records in the API system."
    ),
});

export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

export const getVesselLocationsParamsSchema = z.object({});

export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselLocationsSchema (imported from vesselLocations.zod)
// vesselLocationsArraySchema (imported from vesselLocations.zod)
// VesselLocations (imported from vesselLocations.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { vesselLocationsSchema, vesselLocationsArraySchema };
export type { VesselLocations };

// ============================================================================
// API Functions
//
// getVesselLocationsByVesselId (singular item)
// getVesselLocations (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

export const getVesselLocationsByVesselId = zodFetch<
  GetVesselLocationsByVesselIdParams,
  VesselLocations
>(
  ENDPOINT_BY_ID,
  getVesselLocationsByVesselIdParamsSchema,
  vesselLocationsSchema
);

export const getVesselLocations = zodFetch<
  GetVesselLocationsParams,
  VesselLocationsArray
>(ENDPOINT_ALL, getVesselLocationsParamsSchema, vesselLocationsArraySchema);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselLocationsByVesselIdOptions = createQueryOptions({
  apiFunction: getVesselLocationsByVesselId,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocationsByVesselId"],
  cacheStrategy: "REALTIME_UPDATES",
});

export const vesselLocationsOptions = createQueryOptions({
  apiFunction: getVesselLocations,
  queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
  cacheStrategy: "REALTIME_UPDATES",
});
